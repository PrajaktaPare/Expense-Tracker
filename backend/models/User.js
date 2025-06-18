const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: null,
    },
    monthlyBudget: {
      type: Number,
      default: 5000,
      min: 0,
    },
    // Keep the old budget field for backward compatibility
    budget: {
      type: Number,
      default: 5000,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR", "GBP"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        budgetAlerts: { type: Boolean, default: true },
      },
      dateFormat: {
        type: String,
        enum: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
        default: "DD/MM/YYYY",
      },
    },
    // Keep old categories field for backward compatibility
    categories: [
      {
        id: String,
        name: String,
        icon: String,
        color: String,
        budget: Number,
      },
    ],
    // Keep old expenses field for backward compatibility
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for user's total expenses count only
userSchema.virtual("totalExpensesCount", {
  ref: "Expense",
  localField: "_id",
  foreignField: "userId",
  count: true,
})

// Index for faster queries
userSchema.index({ email: 1 })
userSchema.index({ isActive: 1 })

module.exports = mongoose.model("User", userSchema)
