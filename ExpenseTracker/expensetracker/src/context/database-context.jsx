"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { initialData } from "../lib/initial-data"

const DatabaseContext = createContext(null)

export function DatabaseProvider({ children }) {
  const [database, setDatabase] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize database from localStorage or with default data
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("expenseTrackerDB")
      if (storedData) {
        setDatabase(JSON.parse(storedData))
      } else {
        setDatabase(initialData)
        localStorage.setItem("expenseTrackerDB", JSON.stringify(initialData))
      }
    } catch (error) {
      console.error("Error initializing database:", error)
      setDatabase(initialData)
    } finally {
      setLoading(false)
    }
  }, [])

  // Save database changes to localStorage
  useEffect(() => {
    if (database && !loading) {
      try {
        localStorage.setItem("expenseTrackerDB", JSON.stringify(database))
      } catch (error) {
        console.error("Error saving database:", error)
      }
    }
  }, [database, loading])

  // Database operations
  const getUser = (email) => {
    if (!database) return null
    return database.users.find((user) => user.email === email) || null
  }

  const createUser = (userData) => {
    if (!database) return false

    // Check if user already exists
    if (getUser(userData.email)) return false

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      expenses: [],
      categories: [...database.defaultCategories],
      budget: 5000,
    }

    setDatabase({
      ...database,
      users: [...database.users, newUser],
    })

    return newUser
  }

  const updateUser = (email, updates) => {
    if (!database) return false

    const userIndex = database.users.findIndex((user) => user.email === email)
    if (userIndex === -1) return false

    const updatedUsers = [...database.users]
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      ...updates,
    }

    setDatabase({
      ...database,
      users: updatedUsers,
    })

    return updatedUsers[userIndex]
  }

  const addExpense = (email, expense) => {
    if (!database) return false

    const userIndex = database.users.findIndex((user) => user.email === email)
    if (userIndex === -1) return false

    const user = database.users[userIndex]
    const newExpense = {
      id: Date.now().toString(),
      ...expense,
      createdAt: new Date().toISOString(),
    }

    const updatedUsers = [...database.users]
    updatedUsers[userIndex] = {
      ...user,
      expenses: [newExpense, ...user.expenses],
    }

    setDatabase({
      ...database,
      users: updatedUsers,
    })

    return newExpense
  }

  const deleteExpense = (email, expenseId) => {
    if (!database) return false

    const userIndex = database.users.findIndex((user) => user.email === email)
    if (userIndex === -1) return false

    const user = database.users[userIndex]
    const updatedExpenses = user.expenses.filter((exp) => exp.id !== expenseId)

    const updatedUsers = [...database.users]
    updatedUsers[userIndex] = {
      ...user,
      expenses: updatedExpenses,
    }

    setDatabase({
      ...database,
      users: updatedUsers,
    })

    return true
  }

  return (
    <DatabaseContext.Provider
      value={{
        loading,
        getUser,
        createUser,
        updateUser,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export function useDatabase() {
  const context = useContext(DatabaseContext)
  if (context === null) {
    throw new Error("useDatabase must be used within a DatabaseProvider")
  }
  return context
}

