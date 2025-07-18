export const initialExpenseData = {
  totalSpent: 3240.50,
  todaySpent: 165,
  monthlyBudget: 5000,
  categories: [
    { id: '1', name: 'Housing', amount: 1200, icon: '🏠', bgColor: 'bg-red-100', color: '#EF4444', transactions: 1 },
    { id: '2', name: 'Groceries', amount: 120, icon: '🛒', bgColor: 'bg-green-100', color: '#10B981', transactions: 3 },
    { id: '3', name: 'Dining', amount: 45, icon: '🍽️', bgColor: 'bg-blue-100', color: '#3B82F6', transactions: 2 },
  ],
  topSpending: [
    { id: '1', name: 'Food', icon: '🍽️', bgColor: 'bg-blue-100', color: '#3B82F6' },
    { id: '2', name: 'Travel', icon: '✈️', bgColor: 'bg-green-100', color: '#10B981' },
    { id: '3', name: 'Shopping', icon: '🛍️', bgColor: 'bg-red-100', color: '#EF4444' },
    { id: '4', name: 'Bills', icon: '💡', bgColor: 'bg-yellow-100', color: '#F59E0B' },
    { id: '5', name: 'Others', icon: '📦', bgColor: 'bg-purple-100', color: '#8B5CF6' },
  ],
  budgetCategories: [
    {
      id: '1',
      name: 'Food & Drinks',
      icon: '🍽️',
      bgColor: 'bg-blue-100',
      color: '#3B82F6',
      budget: 1500,
      spent: 350,
      perDay: 50,
    },
    {
      id: '2',
      name: 'Transport',
      icon: '🚗',
      bgColor: 'bg-green-100',
      color: '#10B981',
      budget: 800,
      spent: 200,
      perDay: 25,
    },
  ],
  monthlyData: [
    { name: 'Jan', amount: 2000 },
    { name: 'Feb', amount: 1800 },
    { name: 'Mar', amount: 2200 },
    { name: 'Apr', amount: 1900 },
    { name: 'May', amount: 2500 },
    { name: 'Jun', amount: 3240.50 },
    { name: 'Jul', amount: 0 },
    { name: 'Aug', amount: 0 },
    { name: 'Sep', amount: 0 },
    { name: 'Oct', amount: 0 },
    { name: 'Nov', amount: 0 },
    { name: 'Dec', amount: 0 },
  ],
};