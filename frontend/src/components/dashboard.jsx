"use client"

import { useState } from "react"
import { useAuth } from "../context/auth-context"
import Sidebar from "./sidebar"
import Header from "./header"
import Overview from "./overview"
import Expenses from "./expenses"
import Budget from "./budget"
import Profile from "./profile"
import AddExpenseModal from "./add-expense-modal"
import DebugInfo from "./debug-info"

export default function Dashboard() {
  const { user } = useAuth()
  const [activeView, setActiveView] = useState("overview")
  const [showAddExpense, setShowAddExpense] = useState(false)

  if (!user) return null

  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <Overview />
      case "expenses":
        return <Expenses />
      case "budget":
        return <Budget />
      case "profile":
        return <Profile />
      default:
        return <Overview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header setShowAddExpense={setShowAddExpense} activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-1 p-6 overflow-y-auto">{renderView()}</main>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && <AddExpenseModal onClose={() => setShowAddExpense(false)} />}
      {process.env.NODE_ENV === "development" && <DebugInfo />}
    </div>
  )
}
