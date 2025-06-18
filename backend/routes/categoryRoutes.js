const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const User = require("../models/User")

router.get("/", auth, async (req, res) => {
  try {
    // First try to get categories from the Category collection
    const Category = require("../models/Category")
    let categories = await Category.find({ userId: req.userId }).sort({ sortOrder: 1, name: 1 })

    // If no categories found in Category collection, check user's categories field
    if (categories.length === 0) {
      const user = await User.findById(req.userId).select("categories")
      if (user && user.categories && user.categories.length > 0) {
        // Migrate old categories to new Category collection
        const categoryPromises = user.categories.map((cat, index) => {
          const category = new Category({
            userId: req.userId,
            name: cat.name,
            icon: cat.icon,
            color: cat.color,
            sortOrder: index,
          })
          return category.save()
        })

        categories = await Promise.all(categoryPromises)
        console.log(`✅ Migrated ${categories.length} categories for user ${req.userId}`)
      }
    }

    res.json(categories)
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({ message: error.message })
  }
})

router.post("/", auth, async (req, res) => {
  const { name, icon, color, budget } = req.body
  try {
    const user = await User.findById(req.userId)
    const newCategory = {
      id: new Date().getTime().toString(),
      name,
      icon,
      color,
      budget: budget || 0,
    }
    user.categories.push(newCategory)
    await user.save()
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
