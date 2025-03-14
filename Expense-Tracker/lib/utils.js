// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format date
export function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

// Get month name
export function getMonthName(date) {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
}

// Calculate total expenses
export function calculateTotalExpenses(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

// Calculate expenses by category
export function calculateExpensesByCategory(expenses, categories) {
  const expensesByCategory = {}

  categories.forEach((category) => {
    expensesByCategory[category.id] = 0
  })

  expenses.forEach((expense) => {
    if (expensesByCategory[expense.categoryId] !== undefined) {
      expensesByCategory[expense.categoryId] += expense.amount
    }
  })

  return expensesByCategory
}

// Calculate expenses for current month
export function getCurrentMonthExpenses(expenses) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate >= startOfMonth && expenseDate <= now
  })
}

// Calculate expenses for today
export function getTodayExpenses(expenses) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    expenseDate.setHours(0, 0, 0, 0)
    return expenseDate.getTime() === today.getTime()
  })
}

// Group expenses by month
export function groupExpensesByMonth(expenses) {
  const grouped = {}

  expenses.forEach((expense) => {
    const date = new Date(expense.date)
    const monthYear = `${date.getFullYear()}-${date.getMonth()}`

    if (!grouped[monthYear]) {
      grouped[monthYear] = []
    }

    grouped[monthYear].push(expense)
  })

  return grouped
}

// Get monthly data for charts
export function getMonthlyData(expenses, months = 6) {
  const result = []
  const now = new Date()

  for (let i = 0; i < months; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = getMonthName(month).substring(0, 3)
    const monthExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === month.getMonth() && expenseDate.getFullYear() === month.getFullYear()
    })

    const total = calculateTotalExpenses(monthExpenses)

    result.unshift({
      name: monthName,
      amount: total,
    })
  }

  return result
}

