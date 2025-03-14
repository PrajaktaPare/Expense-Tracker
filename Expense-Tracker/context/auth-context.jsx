"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { useDatabase } from "./database-context"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const db = useDatabase()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuth = localStorage.getItem("expenseTrackerAuth")
        if (storedAuth) {
          const { email } = JSON.parse(storedAuth)
          const userData = db.getUser(email)
          if (userData) {
            // Don't store password in state
            const { password, ...userWithoutPassword } = userData
            setUser(userWithoutPassword)
          } else {
            localStorage.removeItem("expenseTrackerAuth")
          }
        }
      } catch (error) {
        console.error("Auth error:", error)
        localStorage.removeItem("expenseTrackerAuth")
      } finally {
        setLoading(false)
      }
    }

    if (!db.loading) {
      checkAuth()
    }
  }, [db, db.loading])

  const login = (email, password) => {
    const userData = db.getUser(email)

    if (!userData || userData.password !== password) {
      return { success: false, message: "Invalid email or password" }
    }

    // Store auth in localStorage
    localStorage.setItem("expenseTrackerAuth", JSON.stringify({ email }))

    // Don't store password in state
    const { password: _, ...userWithoutPassword } = userData
    setUser(userWithoutPassword)

    return { success: true }
  }

  const register = (name, email, password) => {
    // Check if user already exists
    if (db.getUser(email)) {
      return { success: false, message: "Email already in use" }
    }

    // Create new user
    const newUser = db.createUser({
      name,
      email,
      password,
      avatar: `/placeholder.svg?height=200&width=200&text=${name.charAt(0)}`,
    })

    if (!newUser) {
      return { success: false, message: "Failed to create account" }
    }

    // Store auth in localStorage
    localStorage.setItem("expenseTrackerAuth", JSON.stringify({ email }))

    // Don't store password in state
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("expenseTrackerAuth")
  }

  const addExpense = (expense) => {
    if (!user) return { success: false, message: "Not authenticated" }

    const result = db.addExpense(user.email, expense)
    if (!result) {
      return { success: false, message: "Failed to add expense" }
    }

    // Update user state with the latest data
    const updatedUser = db.getUser(user.email)
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser
      setUser(userWithoutPassword)
    }

    return { success: true, data: result }
  }

  const deleteExpense = (expenseId) => {
    if (!user) return { success: false, message: "Not authenticated" }

    const result = db.deleteExpense(user.email, expenseId)
    if (!result) {
      return { success: false, message: "Failed to delete expense" }
    }

    // Update user state with the latest data
    const updatedUser = db.getUser(user.email)
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser
      setUser(userWithoutPassword)
    }

    return { success: true }
  }

  const updateCategory = (categoryId, updates) => {
    if (!user) return { success: false, message: "Not authenticated" }

    const result = db.updateCategory(user.email, categoryId, updates)
    if (!result) {
      return { success: false, message: "Failed to update category" }
    }

    // Update user state with the latest data
    const updatedUser = db.getUser(user.email)
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser
      setUser(userWithoutPassword)
    }

    return { success: true, data: result }
  }

  const updateBudget = (budget) => {
    if (!user) return { success: false, message: "Not authenticated" }

    const result = db.updateBudget(user.email, budget)
    if (!result) {
      return { success: false, message: "Failed to update budget" }
    }

    // Update user state with the latest data
    const updatedUser = db.getUser(user.email)
    if (updatedUser) {
      const { password, ...userWithoutPassword } = updatedUser
      setUser(userWithoutPassword)
    }

    return { success: true }
  }

  const updateProfile = (updates) => {
    if (!user) return { success: false, message: "Not authenticated" }

    const result = db.updateUser(user.email, updates)
    if (!result) {
      return { success: false, message: "Failed to update profile" }
    }

    // Update user state with the latest data
    const { password, ...userWithoutPassword } = result
    setUser(userWithoutPassword)

    return { success: true }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || db.loading,
        login,
        register,
        logout,
        addExpense,
        deleteExpense,
        updateCategory,
        updateBudget,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

