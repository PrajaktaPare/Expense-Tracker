"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

// Set up axios defaults
axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      axios
        .get("/api/auth/me")
        .then((res) => {
          console.log("✅ Get user response:", res.data)
          if (res.data.success) {
            setUser(res.data.user)
          }
        })
        .catch((error) => {
          console.error("❌ Get user error:", error)
          localStorage.removeItem("token")
          delete axios.defaults.headers.common["Authorization"]
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      console.log("🔄 Attempting login with:", { email })
      const res = await axios.post("/api/auth/login", { email, password })
      console.log("📨 Login response:", res.data)

      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`

        // Fetch additional data to map categories properly
        try {
          const [categoriesRes, expensesRes] = await Promise.all([
            axios.get("/api/categories"),
            axios.get("/api/expenses"),
          ])

          // Map backend categories to frontend format
          const backendCategories = categoriesRes.data
          const mappedCategories = backendCategories.map((cat) => ({
            id: cat._id, // Use ObjectId as the ID
            name: cat.name,
            icon: cat.icon,
            color: cat.color,
            budget: cat.budget || 1000,
          }))

          // Update user with properly mapped data
          const updatedUser = {
            ...res.data.user,
            categories: mappedCategories,
            expenses: expensesRes.data,
          }

          setUser(updatedUser)
          console.log("✅ Login successful, user set:", updatedUser.name)
          return { success: true }
        } catch (dataError) {
          console.error("Error fetching additional data:", dataError)
          // Fallback to original user data
          setUser(res.data.user)
          return { success: true }
        }
      } else {
        console.log("❌ Login failed:", res.data.message)
        return { success: false, message: res.data.message }
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      const message = error.response?.data?.message || "Login failed. Please check your connection."
      return { success: false, message }
    }
  }

  const register = async (name, email, password) => {
    try {
      console.log("🔄 Attempting to register:", { name, email })
      const res = await axios.post("/api/auth/register", { name, email, password })
      console.log("📨 Register response:", res.data)

      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`

        // Fetch additional data to map categories properly
        try {
          const [categoriesRes, expensesRes] = await Promise.all([
            axios.get("/api/categories"),
            axios.get("/api/expenses"),
          ])

          // Map backend categories to frontend format
          const backendCategories = categoriesRes.data
          const mappedCategories = backendCategories.map((cat) => ({
            id: cat._id, // Use ObjectId as the ID
            name: cat.name,
            icon: cat.icon,
            color: cat.color,
            budget: cat.budget || 1000,
          }))

          // Update user with properly mapped data
          const updatedUser = {
            ...res.data.user,
            categories: mappedCategories,
            expenses: expensesRes.data,
          }

          setUser(updatedUser)
          console.log("✅ Registration successful, user set:", updatedUser.name)
          return { success: true }
        } catch (dataError) {
          console.error("Error fetching additional data:", dataError)
          // Fallback to original user data
          setUser(res.data.user)
          return { success: true }
        }
      } else {
        console.log("❌ Registration failed:", res.data.message)
        return { success: false, message: res.data.message }
      }
    } catch (error) {
      console.error("❌ Registration error:", error)
      const message = error.response?.data?.message || "Registration failed. Please check your connection."
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
  }

  const addExpense = async (expenseData) => {
    try {
      console.log("🔄 Adding expense:", expenseData)
      const res = await axios.post("/api/expenses", {
        categoryId: expenseData.categoryId, // This should now be an ObjectId
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date || new Date().toISOString(),
      })

      console.log("📨 Add expense response:", res.data)

      // Check if the response indicates success
      if (res.data.success || res.data._id) {
        const newExpenseData = res.data.success ? res.data.data : res.data

        // Update user state with new expense
        setUser((prev) => ({
          ...prev,
          expenses: [newExpenseData, ...prev.expenses],
        }))

        console.log("✅ Expense added successfully")
        return { success: true }
      } else {
        console.log("❌ Add expense failed:", res.data.message)
        return { success: false, message: res.data.message || "Failed to add expense" }
      }
    } catch (error) {
      console.error("❌ Add expense error:", error)
      const message = error.response?.data?.message || "Failed to add expense"
      return { success: false, message }
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`)

      // Update user state by removing the expense
      setUser((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((exp) => exp._id !== id),
      }))

      return { success: true }
    } catch (error) {
      console.error("❌ Delete expense error:", error)
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete expense",
      }
    }
  }

  const updateProfile = async (updates) => {
    try {
      const res = await axios.put("/api/auth/profile", updates)

      if (res.data.success) {
        setUser((prev) => ({ ...prev, ...updates }))
        return { success: true }
      }

      return { success: false, message: res.data.message }
    } catch (error) {
      console.error("❌ Update profile error:", error)
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      }
    }
  }

  const updateBudget = async (newBudget) => {
    try {
      const res = await axios.put("/api/budget", { totalBudget: newBudget })

      setUser((prev) => ({ ...prev, budget: res.data.totalBudget }))
      return { success: true }
    } catch (error) {
      console.error("❌ Update budget error:", error)
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update budget",
      }
    }
  }

  const updateCategory = async (categoryId, updates) => {
    try {
      const res = await axios.put("/api/budget", {
        categoryBudgets: [{ categoryId, ...updates }],
      })

      setUser((prev) => ({
        ...prev,
        categories: prev.categories.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat)),
      }))

      return { success: true }
    } catch (error) {
      console.error("❌ Update category error:", error)
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update category",
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        addExpense,
        deleteExpense,
        updateProfile,
        updateBudget,
        updateCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
