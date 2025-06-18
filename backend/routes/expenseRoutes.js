const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Expense = require("../models/Expense")
const User = require("../models/User")

router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId })
    res.json(expenses)
  } catch (error) {
    console.error("Get expenses error:", error)
    res.status(500).json({ success: false, message: error.message })
  }
})

router.post("/", auth, async (req, res) => {
  const { categoryId, amount, description, date } = req.body
  try {
    console.log("Creating expense:", { categoryId, amount, description, date, userId: req.userId })

    const expense = new Expense({
      userId: req.userId,
      categoryId,
      amount,
      description,
      date: date || new Date(),
    })

    const savedExpense = await expense.save()
    console.log("Expense saved:", savedExpense)

    await User.findByIdAndUpdate(req.userId, { $push: { expenses: savedExpense._id } })

    // Return consistent response format
    res.status(201).json({
      success: true,
      data: savedExpense,
      message: "Expense added successfully",
    })
  } catch (error) {
    console.error("Add expense error:", error)
    res.status(400).json({
      success: false,
      message: error.message || "Failed to add expense",
    })
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" })
    }
    await User.findByIdAndUpdate(req.userId, { $pull: { expenses: req.params.id } })
    res.json({ success: true, message: "Expense deleted" })
  } catch (error) {
    console.error("Delete expense error:", error)
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router
