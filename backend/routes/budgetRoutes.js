const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('budget categories');
    res.json({ totalBudget: user.budget, categoryBudgets: user.categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', auth, async (req, res) => {
  const { totalBudget, categoryBudgets } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (totalBudget !== undefined) {
      user.budget = totalBudget;
    }
    if (categoryBudgets) {
      user.categories = user.categories.map(cat => {
        const updated = categoryBudgets.find(cb => cb.categoryId === cat.id);
        return updated ? { ...cat, budget: updated.budget } : cat;
      });
    }
    await user.save();
    res.json({ totalBudget: user.budget, categoryBudgets: user.categories });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;