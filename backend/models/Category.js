const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
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
      maxlength: 50,
    },
    icon: {
      type: String,
      required: true,
      maxlength: 10,
    },
    color: {
      type: String,
      required: true,
      match: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for category's expenses
categorySchema.virtual("expenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "categoryId",
})

// Compound index for user and category name uniqueness
categorySchema.index({ userId: 1, name: 1 }, { unique: true })
categorySchema.index({ userId: 1, isActive: 1 })
categorySchema.index({ userId: 1, sortOrder: 1 })

module.exports = mongoose.model("Category", categorySchema)
