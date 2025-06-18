const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "budget_alert",
        "goal_reminder",
        "recurring_expense_due",
        "monthly_summary",
        "expense_limit_reached",
        "goal_achieved",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    data: {
      type: mongoose.Schema.Types.Mixed, // Additional data related to notification
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    expiresAt: {
      type: Date,
      default: null, // null means no expiration
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 })
notificationSchema.index({ userId: 1, type: 1 })
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }) // TTL index

module.exports = mongoose.model("Notification", notificationSchema)
