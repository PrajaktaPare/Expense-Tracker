"use client"

import { useAuth } from "@/context/auth-context"
import LandingPage from "@/components/landing-page"
import Dashboard from "@/components/dashboard"

export default function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-blue-600">
        <div className="p-8 rounded-lg bg-white shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your finances...</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard /> : <LandingPage />
}

