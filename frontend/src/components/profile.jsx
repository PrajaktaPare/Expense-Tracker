"use client"

import { useState } from "react"
import { useAuth } from "../context/auth-context"
import { formatCurrency, calculateTotalExpenses } from "../lib/utils"

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)

  // Generate avatar with user's initials
  const getAvatarUrl = (name) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=8B5CF6&color=fff&size=200`
  }

  const handleSave = () => {
    updateProfile({ name })
    setIsEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-4 md:mb-0 md:mr-6">
            <img
              src={getAvatarUrl(user.name) || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-gray-100"
              onError={(e) => {
                // Fallback to a simple colored div with initials
                e.target.style.display = "none"
                e.target.nextSibling.style.display = "flex"
              }}
            />
            <div
              className="w-24 h-24 rounded-full border-4 border-gray-100 bg-purple-600 text-white text-2xl font-bold flex items-center justify-center"
              style={{ display: "none" }}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-1"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-gray-800 font-medium mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total Expenses</div>
            <div className="text-xl font-bold text-gray-800">
              {formatCurrency(calculateTotalExpenses(user.expenses))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Monthly Budget</div>
            <div className="text-xl font-bold text-gray-800">{formatCurrency(user.budget)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total Transactions</div>
            <div className="text-xl font-bold text-gray-800">{user.expenses.length}</div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-gray-800 font-medium mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button className="flex items-center text-gray-700 hover:text-blue-600 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Help & Support
          </button>
          <button className="flex items-center text-gray-700 hover:text-blue-600 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </button>
          <button className="flex items-center text-gray-700 hover:text-blue-600 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Privacy & Security
          </button>
          <button onClick={logout} className="flex items-center text-red-600 hover:text-red-800 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
