const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema(
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
      index: true,
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
    date: {
      type: Date,
      required: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank_transfer", "other"],
      default: "cash",
    },
    location: {
      name: String,
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    receipt: {
      url: String,
      filename: String,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: 30,
      },
    ],
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecurringExpense",
      default: null,
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

// Virtual for formatted amount
expenseSchema.virtual("formattedAmount").get(function () {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(this.amount)
})

// Indexes for efficient queries
expenseSchema.index({ userId: 1, date: -1 })
expenseSchema.index({ userId: 1, categoryId: 1, date: -1 })
expenseSchema.index({ userId: 1, createdAt: -1 })
expenseSchema.index({ date: 1 })
expenseSchema.index({ amount: 1 })

module.exports = mongoose.model("Expense", expenseSchema)
