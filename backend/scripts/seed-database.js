const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Category = require("../models/Category")
const Expense = require("../models/Expense")
const Budget = require("../models/Budget")

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/expense-tracker")
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

// Default categories for new users
const defaultCategories = [
  { name: "Housing", icon: "🏠", color: "#3B82F6", description: "Rent, mortgage, utilities" },
  { name: "Transportation", icon: "🚗", color: "#EF4444", description: "Car, fuel, public transport" },
  { name: "Groceries", icon: "🛒", color: "#10B981", description: "Food and household items" },
  { name: "Utilities", icon: "💡", color: "#F59E0B", description: "Electricity, water, internet" },
  { name: "Dining Out", icon: "🍽️", color: "#8B5CF6", description: "Restaurants and takeout" },
  { name: "Entertainment", icon: "🎬", color: "#EC4899", description: "Movies, games, subscriptions" },
  { name: "Shopping", icon: "🛍️", color: "#6366F1", description: "Clothes, electronics, misc" },
  { name: "Health", icon: "⚕️", color: "#14B8A6", description: "Medical, pharmacy, fitness" },
  { name: "Education", icon: "📚", color: "#F97316", description: "Books, courses, training" },
  { name: "Travel", icon: "✈️", color: "#84CC16", description: "Vacation, business trips" },
]

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data (optional - remove in production)
    console.log("🗑️ Clearing existing data...")
    await User.deleteMany({})
    await Category.deleteMany({})
    await Expense.deleteMany({})
    await Budget.deleteMany({})

    // Create demo user
    console.log("👤 Creating demo user...")
    const hashedPassword = await bcrypt.hash("password123", 10)

    // Prepare categories for backward compatibility
    const budgetAmounts = [15000, 5000, 8000, 3000, 4000, 2000, 3000, 2000, 1500, 2000]
    const backwardCompatCategories = defaultCategories.map((cat, index) => ({
      id: `cat_${index}`,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      budget: budgetAmounts[index] || 1000,
    }))

    const demoUser = new User({
      name: "Demo User",
      email: "demo@expensetracker.com",
      password: hashedPassword,
      monthlyBudget: 50000,
      budget: 50000, // For backward compatibility
      currency: "INR",
      categories: backwardCompatCategories, // For backward compatibility
      expenses: [], // For backward compatibility
      preferences: {
        theme: "light",
        notifications: {
          email: true,
          push: true,
          budgetAlerts: true,
        },
      },
    })

    await demoUser.save()
    console.log("✅ Demo user created:", demoUser.email)

    // Create categories for demo user
    console.log("📂 Creating categories...")
    const categories = []
    for (const catData of defaultCategories) {
      const category = new Category({
        userId: demoUser._id,
        ...catData,
        sortOrder: categories.length,
      })
      await category.save()
      categories.push(category)
    }
    console.log(`✅ ${categories.length} categories created`)

    // Create budgets for categories
    console.log("💰 Creating budgets...")
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    for (let i = 0; i < categories.length; i++) {
      const budget = new Budget({
        userId: demoUser._id,
        categoryId: categories[i]._id,
        amount: budgetAmounts[i],
        period: "monthly",
        startDate: startOfMonth,
        endDate: endOfMonth,
        alertThreshold: 80,
      })
      await budget.save()
    }
    console.log("✅ Budgets created")

    // Create sample expenses
    console.log("💸 Creating sample expenses...")
    const sampleExpenses = [
      { categoryIndex: 0, amount: 12000, description: "Monthly rent", daysAgo: 1 },
      { categoryIndex: 2, amount: 2500, description: "Weekly groceries", daysAgo: 2 },
      { categoryIndex: 1, amount: 800, description: "Fuel refill", daysAgo: 3 },
      { categoryIndex: 4, amount: 450, description: "Dinner at restaurant", daysAgo: 4 },
      { categoryIndex: 3, amount: 1200, description: "Electricity bill", daysAgo: 5 },
      { categoryIndex: 6, amount: 2200, description: "New headphones", daysAgo: 7 },
      { categoryIndex: 7, amount: 600, description: "Doctor consultation", daysAgo: 10 },
      { categoryIndex: 5, amount: 299, description: "Netflix subscription", daysAgo: 15 },
      { categoryIndex: 2, amount: 1800, description: "Grocery shopping", daysAgo: 16 },
      { categoryIndex: 1, amount: 150, description: "Bus fare", daysAgo: 18 },
    ]

    const createdExpenses = []
    for (const expenseData of sampleExpenses) {
      const expenseDate = new Date()
      expenseDate.setDate(expenseDate.getDate() - expenseData.daysAgo)

      const expense = new Expense({
        userId: demoUser._id,
        categoryId: categories[expenseData.categoryIndex]._id,
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseDate,
        paymentMethod: Math.random() > 0.5 ? "card" : "upi",
      })
      await expense.save()
      createdExpenses.push(expense)
    }

    // Update user with expense references for backward compatibility
    demoUser.expenses = createdExpenses.map((exp) => exp._id)
    await demoUser.save()

    console.log(`✅ ${sampleExpenses.length} sample expenses created`)

    console.log("🎉 Database seeding completed successfully!")
    console.log(`📧 Demo user email: ${demoUser.email}`)
    console.log("🔑 Demo user password: password123")

    // Close the connection
    await mongoose.connection.close()
    console.log("🔌 Database connection closed")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  require("dotenv").config()
  connectDB().then(() => {
    seedDatabase()
  })
}

module.exports = { seedDatabase, defaultCategories }
