export interface Category {
  name: string
  amount: number
  budget: number
  transactions: number
  color: string
  icon: string
}

export interface MonthlyData {
  name: string
  amount: number
}

export interface ExpenseData {
  totalSpent: number
  todaySpent: number
  monthlyBudget: number
  categories: Category[]
  monthlyData: MonthlyData[]
}

export const initialExpenseData: ExpenseData = {
  totalSpent: 7456,
  todaySpent: 180.75,
  monthlyBudget: 10000,
  categories: [
    {
      name: "Salary",
      amount: 5000,
      budget: 5000,
      transactions: 1,
      color: "#4F46E5",
      icon: "💼",
    },
    {
      name: "Transportation",
      amount: 350,
      budget: 500,
      transactions: 12,
      color: "#EF4444",
      icon: "🚗",
    },
    {
      name: "Medicine",
      amount: 680,
      budget: 800,
      transactions: 3,
      color: "#F59E0B",
      icon: "💊",
    },
    {
      name: "Restaurant",
      amount: 680,
      budget: 600,
      transactions: 8,
      color: "#10B981",
      icon: "🍔",
    },
    {
      name: "Education",
      amount: 350,
      budget: 500,
      transactions: 2,
      color: "#8B5CF6",
      icon: "📚",
    },
    {
      name: "Cloth",
      amount: 680,
      budget: 700,
      transactions: 5,
      color: "#EC4899",
      icon: "👕",
    },
    {
      name: "Fuel",
      amount: 66,
      budget: 100,
      transactions: 2,
      color: "#F97316",
      icon: "⛽",
    },
  ],
  monthlyData: [
    { name: "Jan", amount: 4000 },
    { name: "Feb", amount: 3500 },
    { name: "Mar", amount: 4200 },
    { name: "Apr", amount: 3800 },
    { name: "May", amount: 4300 },
    { name: "Jun", amount: 4167 },
    { name: "Jul", amount: 0 },
    { name: "Aug", amount: 0 },
    { name: "Sep", amount: 0 },
    { name: "Oct", amount: 0 },
    { name: "Nov", amount: 0 },
    { name: "Dec", amount: 0 },
  ],
}

