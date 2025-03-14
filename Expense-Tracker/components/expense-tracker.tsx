"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardView from "@/components/dashboard-view"
import ExpenseView from "@/components/expense-view"
import BudgetView from "@/components/budget-view"
import { type ExpenseData, initialExpenseData } from "@/lib/data"
import Navbar from "@/components/navbar"

export default function ExpenseTracker() {
  const [expenseData, setExpenseData] = useState<ExpenseData>(initialExpenseData)
  const [activeTab, setActiveTab] = useState("dashboard")

  const addExpense = (expense: {
    category: string
    amount: number
    date: Date
    description: string
  }) => {
    setExpenseData((prev) => {
      const newData = { ...prev }

      // Update category total
      newData.categories = newData.categories.map((cat) => {
        if (cat.name === expense.category) {
          return {
            ...cat,
            amount: cat.amount + expense.amount,
            transactions: cat.transactions + 1,
          }
        }
        return cat
      })

      // Update total spent
      newData.totalSpent += expense.amount

      // Update monthly data for chart
      const monthIndex = expense.date.getMonth()
      newData.monthlyData[monthIndex].amount += expense.amount

      return newData
    })
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
      <div className="sticky top-0 z-10">
        <div className="bg-purple-600 text-white p-4">
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
          <p className="text-sm opacity-90">Track your spending habits</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-purple-500 rounded-none h-14">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-purple-700 flex-1 h-full">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-white data-[state=active]:bg-purple-700 flex-1 h-full">
              Expenses
            </TabsTrigger>
            <TabsTrigger value="budget" className="text-white data-[state=active]:bg-purple-700 flex-1 h-full">
              Budget
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="pb-16">
        {activeTab === "dashboard" && <DashboardView data={expenseData} />}
        {activeTab === "expenses" && <ExpenseView data={expenseData} onAddExpense={addExpense} />}
        {activeTab === "budget" && <BudgetView data={expenseData} />}
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

