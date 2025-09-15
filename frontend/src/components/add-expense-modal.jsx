"use client"

import { useState } from "react"
import { useAuth } from "../context/auth-context"

export default function AddExpenseModal({ onClose }) {
  const { user, addExpense } = useAuth()
  const [formData, setFormData] = useState({
    categoryId: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Validate form
      if (!formData.categoryId) {
        throw new Error("Please select a category")
      }

      if (!formData.amount || isNaN(formData.amount) || Number.parseFloat(formData.amount) <= 0) {
        throw new Error("Please enter a valid amount")
      }

      console.log("Form data being submitted:", formData)
      console.log("Available categories:", user.categories)

      // Verify the category exists
      const selectedCategory = user.categories.find((cat) => cat.id === formData.categoryId)
      if (!selectedCategory) {
        throw new Error("Selected category not found")
      }

      console.log("Selected category:", selectedCategory)

      // Add expense
      const result = await addExpense({
        categoryId: formData.categoryId,
        amount: Number.parseFloat(formData.amount),
        description: formData.description,
        date: formData.date,
      })

      console.log("Add expense result:", result)

      if (!result.success) {
        throw new Error(result.message || "Failed to add expense")
      }

      // Close modal on success
      onClose()
    } catch (error) {
      console.error("Form submission error:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Test backend connection
  const testConnection = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BASE_API_URL+"/api/health")
      const data = await response.json()
      console.log("Backend health check:", data)
      alert(`Backend Status: ${data.status}\nMongoDB: ${data.mongodb}`)
    } catch (error) {
      console.error("Backend connection test failed:", error)
      alert("Backend connection failed! Make sure your backend server is running on port 5000.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>

        {/* Test Connection Button */}
        <button
          onClick={testConnection}
          className="w-full mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-sm"
        >
          Test Backend Connection
        </button>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select a category</option>
              {user.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="What was this expense for?"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  )
}
 