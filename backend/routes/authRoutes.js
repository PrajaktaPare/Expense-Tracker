const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const auth = require("../middleware/auth")

// Register route
router.post("/register", async (req, res) => {
  try {
    console.log("📩 Registration attempt:", {
      name: req.body.name,
      email: req.body.email,
      hasPassword: !!req.body.password,
    })

    const { name, email, password } = req.body

    // Validation
    if (!name || !email || !password) {
      console.log("❌ Missing required fields")
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      console.log("⚠️ Email already exists:", email)
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Default categories
    const defaultCategories = [
      { id: "housing", name: "Housing", color: "#3B82F6", icon: "🏠", budget: 1500 },
      { id: "transportation", name: "Transportation", color: "#EF4444", icon: "🚗", budget: 400 },
      { id: "groceries", name: "Groceries", color: "#10B981", icon: "🛒", budget: 600 },
      { id: "utilities", name: "Utilities", color: "#F59E0B", icon: "💡", budget: 300 },
      { id: "dining", name: "Dining Out", color: "#8B5CF6", icon: "🍽️", budget: 400 },
      { id: "entertainment", name: "Entertainment", color: "#EC4899", icon: "🎬", budget: 200 },
      { id: "shopping", name: "Shopping", color: "#6366F1", icon: "🛍️", budget: 300 },
      { id: "health", name: "Health", color: "#14B8A6", icon: "⚕️", budget: 200 },
    ]

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      budget: 5000,
      categories: defaultCategories,
      expenses: [],
    })

    // Save user to database
    const savedUser = await newUser.save()
    console.log("✅ User created successfully:", savedUser.email)

    // Create categories in the Category collection
    const Category = require("../models/Category")
    const categoryPromises = defaultCategories.map((cat, index) => {
      const category = new Category({
        userId: savedUser._id,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
        sortOrder: index,
      })
      return category.save()
    })

    await Promise.all(categoryPromises)
    console.log("✅ Default categories created for user")

    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    // Return success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        budget: savedUser.budget,
        categories: savedUser.categories,
        expenses: [],
      },
    })
  } catch (error) {
    console.error("🔥 Registration error:", error)

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      })
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      })
    }

    res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    })
  }
})

// Login route
router.post("/login", async (req, res) => {
  try {
    console.log("📩 Login attempt:", { email: req.body.email })

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      })
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      console.log("❌ User not found:", email)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("❌ Invalid password for:", email)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    console.log("✅ User logged in successfully:", user.email)

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        budget: user.budget,
        categories: user.categories,
        expenses: user.expenses,
      },
    })
  } catch (error) {
    console.error("🔥 Login error:", error)
    res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    })
  }
})

// Get current user route
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("expenses")
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        budget: user.budget,
        categories: user.categories,
        expenses: user.expenses,
      },
    })
  } catch (error) {
    console.error("🔥 Get user error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get user data",
    })
  }
})

// Update profile route
router.put("/profile", auth, async (req, res) => {
  try {
    const { name } = req.body

    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      })
    }

    const user = await User.findByIdAndUpdate(req.userId, { name: name.trim() }, { new: true })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      name: user.name,
    })
  } catch (error) {
    console.error("🔥 Update profile error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    })
  }
})

module.exports = router
