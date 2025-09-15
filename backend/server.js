const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const budgetRoutes = require("./routes/budgetRoutes")

dotenv.config()
const app = express()

app.use(
  cors({
    origin: "*", // Vite default port
    credentials: true,
  }),
)
app.use(express.json())

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body:", req.body)
  }
  next()
})

// Add response logging middleware
app.use((req, res, next) => {
  const originalSend = res.send
  res.send = function (data) {
    console.log(`Response for ${req.method} ${req.path}:`, data)
    originalSend.call(this, data)
  }
  next()
})

// Check environment variables
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set in environment variables")
  console.log("Please set MONGODB_URI in your .env file")
  process.exit(1)
}

if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not set in environment variables")
  console.log("Please set JWT_SECRET in your .env file")
  process.exit(1)
}

console.log("🔗 Attempting to connect to MongoDB...")
console.log("Connection string:", process.env.MONGODB_URI.replace(/\/\/.*@/, "//***:***@")) // Hide credentials in logs

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully")
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message)
    console.log("\n🔧 MongoDB Setup Instructions:")
    console.log("1. Install MongoDB locally: https://www.mongodb.com/try/download/community")
    console.log("2. Or set up MongoDB Atlas: https://www.mongodb.com/atlas")
    console.log("3. Update MONGODB_URI in your .env file")
    console.log("\nFor local MongoDB, use: mongodb://localhost:27017/expense-tracker")
    console.log("For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/expense-tracker")
    process.exit(1)
  })

app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/budget", budgetRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    environment: process.env.NODE_ENV || "development",
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error)
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  })
})

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`)
//   console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
//   console.log(`🌐 Frontend should connect to: http://localhost:${PORT}`)
// })

const serverless = require("serverless-http")
    module.exports = app
    module.exports.handler = serverless(app)

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error("❌ Unhandled Promise Rejection:", err.message)
  process.exit(1)
})

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message)
  process.exit(1)
})
