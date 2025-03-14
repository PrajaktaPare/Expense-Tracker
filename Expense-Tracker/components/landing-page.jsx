"use client"

import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
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
          <h1 className="text-white text-2xl font-bold ml-2">FinTrack</h1>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => {
              setShowLogin(true)
              setShowRegister(false)
            }}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowRegister(true)
              setShowLogin(false)
            }}
            className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Take Control of Your Finances</h2>
            <p className="text-xl mb-8 text-purple-100">
              Track expenses, visualize spending patterns, and achieve your financial goals with FinTrack.
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Smart Expense Tracking</h3>
                  <p className="text-purple-100">Categorize and track your expenses with beautiful visualizations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Budget Management</h3>
                  <p className="text-purple-100">Set budgets for different categories and track your progress</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Insightful Reports</h3>
                  <p className="text-purple-100">
                    Get detailed insights about your spending habits and savings opportunities
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowRegister(true)
                setShowLogin(false)
              }}
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started — It's Free
            </button>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full opacity-30 animate-blob"></div>
            <div className="absolute top-20 right-10 w-40 h-40 bg-purple-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-10 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-30 animate-blob animation-delay-4000"></div>
            <div className="bg-white p-6 rounded-2xl shadow-2xl relative z-10 transform rotate-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-4 rounded-xl mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">Monthly Overview</h3>
                  <span className="text-sm">June 2023</span>
                </div>
                <div className="text-3xl font-bold mb-2">$3,240.50</div>
                <div className="h-24 flex items-end space-x-2">
                  <div className="w-1/6 bg-white bg-opacity-20 rounded-t-md h-1/3"></div>
                  <div className="w-1/6 bg-white bg-opacity-20 rounded-t-md h-1/2"></div>
                  <div className="w-1/6 bg-white bg-opacity-20 rounded-t-md h-3/4"></div>
                  <div className="w-1/6 bg-white bg-opacity-20 rounded-t-md h-full"></div>
                  <div className="w-1/6 bg-white bg-opacity-20 rounded-t-md h-2/3"></div>
                  <div className="w-1/6 bg-white bg-opacity-20 rounded-t-md h-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-md mr-3">🏠</div>
                    <div>
                      <div className="font-medium">Housing</div>
                      <div className="text-xs text-gray-500">Monthly rent</div>
                    </div>
                  </div>
                  <div className="font-bold">$1,200</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-md mr-3">🛒</div>
                    <div>
                      <div className="font-medium">Groceries</div>
                      <div className="text-xs text-gray-500">Weekly shopping</div>
                    </div>
                  </div>
                  <div className="font-bold">$120</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-md mr-3">🍽️</div>
                    <div>
                      <div className="font-medium">Dining</div>
                      <div className="text-xs text-gray-500">Dinner with friends</div>
                    </div>
                  </div>
                  <div className="font-bold">$45</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Expense Tracking</h3>
            <p className="text-purple-100">Easily log your expenses and categorize them for better organization.</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Visual Reports</h3>
            <p className="text-purple-100">
              Get insights with beautiful charts and visualizations of your spending habits.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Budget Planning</h3>
            <p className="text-purple-100">Set monthly budgets for different categories and track your progress.</p>
          </div>
        </div>
      </div>

      {/* Modal for Login/Register */}
      {(showLogin || showRegister) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                setShowLogin(false)
                setShowRegister(false)
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
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

            {showLogin && (
              <LoginForm
                onSwitch={() => {
                  setShowLogin(false)
                  setShowRegister(true)
                }}
              />
            )}
            {showRegister && (
              <RegisterForm
                onSwitch={() => {
                  setShowRegister(false)
                  setShowLogin(true)
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

