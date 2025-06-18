const mongoose = require("mongoose")

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    type: {
      type: String,
      enum: ["savings", "expense_reduction", "budget_limit"],
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // null for general goals
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["active", "completed", "paused", "cancelled"],
      default: "active",
    },
    reminderFrequency: {
      type: String,
      enum: ["none", "daily", "weekly", "monthly"],
      default: "weekly",
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for progress percentage
goalSchema.virtual("progressPercentage").get(function () {
  if (this.targetAmount === 0) return 0
  return Math.min(100, (this.currentAmount / this.targetAmount) * 100)
})

// Virtual for remaining amount
goalSchema.virtual("remainingAmount").get(function () {
  return Math.max(0, this.targetAmount - this.currentAmount)
})

// Indexes
goalSchema.index({ userId: 1, status: 1 })
goalSchema.index({ userId: 1, targetDate: 1 })
goalSchema.index({ userId: 1, type: 1 })

module.exports = mongoose.model("Goal", goalSchema)
