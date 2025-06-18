const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema(
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
      min: 0,
    },
    period: {
      type: String,
      enum: ["weekly", "monthly", "quarterly", "yearly"],
      default: "monthly",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    alertThreshold: {
      type: Number,
      min: 0,
      max: 100,
      default: 80, // Alert when 80% of budget is used
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for spent amount in current period
budgetSchema.virtual("spentAmount", {
  ref: "Expense",
  localField: "categoryId",
  foreignField: "categoryId",
  match: function () {
    return {
      userId: this.userId,
      date: {
        $gte: this.startDate,
        $lte: this.endDate,
      },
    }
  },
})

// Compound index for user, category, and period uniqueness
budgetSchema.index({ userId: 1, categoryId: 1, period: 1, startDate: 1 }, { unique: true })
budgetSchema.index({ userId: 1, isActive: 1 })
budgetSchema.index({ endDate: 1 })

module.exports = mongoose.model("Budget", budgetSchema)
