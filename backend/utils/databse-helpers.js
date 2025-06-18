const User = require("../models/User")
const Category = require("../models/Category")
const Expense = require("../models/Expense")
const Budget = require("../models/Budget")
const Goal = require("../models/Goal")
const RecurringExpense = require("../models/RecurringExpense")
const Notification = require("../models/Notification")

class DatabaseHelpers {
  // User helpers
  static async getUserWithDetails(userId) {
    return await User.findById(userId).populate("categories").populate("budgets").lean()
  }

  // Category helpers
  static async getUserCategories(userId) {
    return await Category.find({ userId, isActive: true }).sort({ sortOrder: 1, name: 1 }).lean()
  }

  static async createDefaultCategories(userId, categories) {
    const categoryDocs = categories.map((cat, index) => ({
      userId,
      ...cat,
      sortOrder: index,
    }))
    return await Category.insertMany(categoryDocs)
  }

  // Expense helpers
  static async getUserExpenses(userId, options = {}) {
    const { categoryId, startDate, endDate, limit = 50, skip = 0, sortBy = "date", sortOrder = -1 } = options

    const query = { userId }

    if (categoryId) query.categoryId = categoryId
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    return await Expense.find(query)
      .populate("categoryId", "name icon color")
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip(skip)
      .lean()
  }

  static async getExpensesByCategory(userId, startDate, endDate) {
    const pipeline = [
      {
        $match: {
          userId: userId,
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$categoryId",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          categoryId: "$_id",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
          categoryColor: "$category.color",
          totalAmount: 1,
          count: 1,
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]

    return await Expense.aggregate(pipeline)
  }

  // Budget helpers
  static async getUserBudgets(userId, period = "monthly") {
    const currentDate = new Date()
    return await Budget.find({
      userId,
      period,
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    })
      .populate("categoryId", "name icon color")
      .lean()
  }

  static async getBudgetWithSpending(userId, budgetId) {
    const budget = await Budget.findOne({ _id: budgetId, userId }).populate("categoryId").lean()

    if (!budget) return null

    const totalSpent = await Expense.aggregate([
      {
        $match: {
          userId: userId,
          categoryId: budget.categoryId._id,
          date: {
            $gte: budget.startDate,
            $lte: budget.endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ])

    budget.spentAmount = totalSpent[0]?.total || 0
    budget.remainingAmount = budget.amount - budget.spentAmount
    budget.percentageUsed = budget.amount > 0 ? (budget.spentAmount / budget.amount) * 100 : 0

    return budget
  }

  // Goal helpers
  static async getUserGoals(userId, status = "active") {
    return await Goal.find({ userId, status })
      .populate("categoryId", "name icon color")
      .sort({ priority: -1, targetDate: 1 })
      .lean()
  }

  // Notification helpers
  static async createNotification(userId, type, title, message, data = {}) {
    const notification = new Notification({
      userId,
      type,
      title,
      message,
      data,
    })
    return await notification.save()
  }

  static async getUserNotifications(userId, limit = 20) {
    return await Notification.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean()
  }

  // Analytics helpers
  static async getMonthlySpendingTrend(userId, months = 12) {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)

    const pipeline = [
      {
        $match: {
          userId: userId,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]

    return await Expense.aggregate(pipeline)
  }

  // Cleanup helpers
  static async cleanupExpiredNotifications() {
    const result = await Notification.deleteMany({
      expiresAt: { $lt: new Date() },
    })
    return result.deletedCount
  }

  static async archiveOldExpenses(userId, olderThanDays = 365) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

    // In a real application, you might move these to an archive collection
    // For now, we'll just add an archived flag
    const result = await Expense.updateMany(
      {
        userId,
        date: { $lt: cutoffDate },
        archived: { $ne: true },
      },
      {
        $set: { archived: true },
      },
    )

    return result.modifiedCount
  }
}

module.exports = DatabaseHelpers
