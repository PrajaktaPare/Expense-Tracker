// frontend/src/components/ExpenseTracker.jsx
"use client"

import { useState, useEffect } from "react"
import DashboardView from "./dashboard-view.jsx" // Add .jsx
import ExpenseView from "./expense-view.jsx"   // Add .jsx
import BudgetView from "./budget-view.jsx"     // Add .jsx
import Navbar from "./navbar.jsx"             // Add .jsx
import { useAuth } from "../context/auth-context"
import axios from "axios"

export default function ExpenseTracker() {
  const { user, addExpense } = useAuth()
  const [expenseData, setExpenseData] = useState(null)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    if (user) {
      // Fetch expense data from backend
      const fetchData = async () => {
        try {
          const [expensesRes, budgetRes] = await Promise.all([
            axios.get('/api/expenses', {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
            axios.get('/api/budget', {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
          ]);

          const expenses = expensesRes.data;
          const { totalBudget, categoryBudgets } = budgetRes.data;

          const todayExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.date).toISOString().split('T')[0];
            return expDate === new Date().toISOString().split('T')[0];
          });

          const monthlyExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.date);
            const now = new Date();
            return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
          });

          const totalSpent = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
          const todaySpent = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

          const categories = categoryBudgets.map(cat => ({
            id: cat.id,
            name: cat.name,
            amount: expenses.filter(exp => exp.categoryId === cat.id).reduce((sum, exp) => sum + exp.amount, 0),
            icon: cat.icon,
            bgColor: `bg-${cat.color.toLowerCase().replace('#', '')}-100`,
            color: cat.color,
            transactions: expenses.filter(exp => exp.categoryId === cat.id).length,
          }));

          const topSpending = categories
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5)
            .map(cat => ({
              id: cat.id,
              name: cat.name,
              icon: cat.icon,
              bgColor: cat.bgColor,
              color: cat.color,
            }));

          const budgetCategories = categoryBudgets.map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            bgColor: `bg-${cat.color.toLowerCase().replace('#', '')}-100`,
            color: cat.color,
            budget: cat.budget,
            spent: expenses.filter(exp => exp.categoryId === cat.id).reduce((sum, exp) => sum + exp.amount, 0),
            perDay: cat.budget / 30,
          }));

          const monthlyData = Array.from({ length: 12 }, (_, i) => {
            const date = new Date();
            date.setMonth(i);
            return {
              name: date.toLocaleString('en-IN', { month: 'short' }),
              amount: expenses
                .filter(exp => new Date(exp.date).getMonth() === i)
                .reduce((sum, exp) => sum + exp.amount, 0),
            };
          });

          setExpenseData({
            totalSpent,
            todaySpent,
            monthlyBudget: totalBudget,
            categories,
            topSpending,
            budgetCategories,
            monthlyData,
          });
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };

      fetchData();
    }
  }, [user]);

  if (!expenseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
      <div className="sticky top-0 z-10">
        <div className="bg-purple-600 text-white p-4">
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
          <p className="text-sm opacity-90">Track your spending habits</p>
        </div>

        <div className="w-full bg-purple-500 rounded-none h-14">
          <div className="flex w-full h-full">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`text-white flex-1 h-full ${activeTab === "dashboard" ? "bg-purple-700" : ""}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("expenses")}
              className={`text-white flex-1 h-full ${activeTab === "expenses" ? "bg-purple-700" : ""}`}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab("budget")}
              className={`text-white flex-1 h-full ${activeTab === "budget" ? "bg-purple-700" : ""}`}
            >
              Budget
            </button>
          </div>
        </div>
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