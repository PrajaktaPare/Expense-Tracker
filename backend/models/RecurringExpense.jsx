const mongoose = require("mongoose")

const recurringExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null, // null means no end date
    },
    nextDueDate: {
      type: Date,
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    autoCreate: {
      type: Boolean,
      default: false, // Whether to automatically create expenses
    },
    reminderDays: {
      type: Number,
      default: 1, // Remind 1 day before
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "other"],
      default: "card",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for generated expenses
recurringExpenseSchema.virtual("generatedExpenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "recurringId",
})

// Indexes
recurringExpenseSchema.index({ userId: 1, isActive: 1 })
recurringExpenseSchema.index({ nextDueDate: 1, isActive: 1 })
recurringExpenseSchema.index({ userId: 1, categoryId: 1 })

module.exports = mongoose.model("RecurringExpense", recurringExpenseSchema)
