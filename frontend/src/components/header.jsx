"use client"

import { useState } from "react"
import { useAuth } from "../context/auth-context"
import { formatCurrency } from "../lib/utils"
import { calculateTotalExpenses, getCurrentMonthExpenses } from "../lib/utils"

export default function Header({ setShowAddExpense, activeView, setActiveView }) {
  const { user, logout } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const currentMonthExpenses = getCurrentMonthExpenses(user.expenses)
  const totalSpent = calculateTotalExpenses(currentMonthExpenses)

  // Generate avatar with user's initials
  const getAvatarUrl = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=8B5CF6&color=fff&size=128`
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo - Mobile Only */}
        <div className="md:hidden flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-purple-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-lg font-bold ml-1 text-gray-800">FinTrack</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search expenses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Add Expense Button */}
          <button
            onClick={() => setShowAddExpense(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-800 transition-colors shadow-sm hidden md:block"
          >
            Add Expense
          </button>

          {/* Mobile Add Button */}
          <button
            onClick={() => setShowAddExpense(true)}
            className="md:hidden bg-purple-600 text-white p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Current Month Spending */}
          <div className="hidden md:block">
            <div className="text-xs text-gray-500">This Month</div>
            <div className="font-bold text-gray-800">{formatCurrency(totalSpent)}</div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <img
                src={getAvatarUrl(user.name) || "/placeholder.svg"}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-purple-200"
                onError={(e) => {
                  // Fallback to a simple colored div with initials
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "flex"
                }}
              />
              <div
                className="w-8 h-8 rounded-full border border-purple-200 bg-purple-600 text-white text-sm font-medium flex items-center justify-center"
                style={{ display: "none" }}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveView("overview")
                setShowMobileMenu(false)
              }}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm ${
                activeView === "overview" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              Overview
            </button>
            <button
              onClick={() => {
                setActiveView("expenses")
                setShowMobileMenu(false)
              }}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm ${
                activeView === "expenses" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Expenses
            </button>
            <button
              onClick={() => {
                setActiveView("budget")
                setShowMobileMenu(false)
              }}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm ${
                activeView === "budget" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Budget
            </button>
            <button
              onClick={() => {
                setActiveView("profile")
                setShowMobileMenu(false)
              }}
              className={`flex items-center w-full px-4 py-2 rounded-lg text-sm ${
                activeView === "profile" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile
            </button>
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
