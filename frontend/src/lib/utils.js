export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount || 0)
}

export const formatDate = (date) => {
  if (!date) return "No date"
  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  } catch (error) {
    return "Invalid date"
  }
}

export const calculateTotalExpenses = (expenses) => {
  if (!expenses || !Array.isArray(expenses)) return 0
  return expenses.reduce((sum, exp) => sum + (exp?.amount || 0), 0)
}

export const calculateExpensesByCategory = (expenses, categories) => {
  if (!expenses || !Array.isArray(expenses) || !categories || !Array.isArray(categories)) {
    return {}
  }

  return categories.reduce((acc, cat) => {
    acc[cat.id] = expenses
      .filter((exp) => exp && exp.categoryId === cat.id)
      .reduce((sum, exp) => sum + (exp?.amount || 0), 0)
    return acc
  }, {})
}

export const getCurrentMonthExpenses = (expenses) => {
  if (!expenses || !Array.isArray(expenses)) return []

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return expenses.filter((exp) => {
    if (!exp || !exp.date) return false
    try {
      return new Date(exp.date) >= startOfMonth
    } catch (error) {
      return false
    }
  })
}

export const getTodayExpenses = (expenses) => {
  if (!expenses || !Array.isArray(expenses)) return []

  const today = new Date().toISOString().split("T")[0]

  return expenses.filter((exp) => {
    if (!exp || !exp.date) return false
    try {
      // Handle both ISO string dates and date objects
      const expenseDate =
        typeof exp.date === "string" ? exp.date.split("T")[0] : new Date(exp.date).toISOString().split("T")[0]
      return expenseDate === today
    } catch (error) {
      return false
    }
  })
}

export const getMonthlyData = (expenses) => {
  if (!expenses || !Array.isArray(expenses)) {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(i)
      return {
        name: date.toLocaleString("en-IN", { month: "short" }),
        amount: 0,
      }
    })
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(i)
    return {
      name: date.toLocaleString("en-IN", { month: "short" }),
      amount: 0,
    }
  })

  expenses.forEach((exp) => {
    if (exp && exp.date && exp.amount) {
      try {
        const month = new Date(exp.date).getMonth()
        if (month >= 0 && month < 12) {
          months[month].amount += exp.amount
        }
      } catch (error) {
        // Skip invalid dates
      }
    }
  })

  return months
}
