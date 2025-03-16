export const initialData = {
    users: [
      {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        password: "password",
        avatar: "/placeholder.svg?height=200&width=200&text=D",
        createdAt: "2023-01-01T00:00:00.000Z",
        budget: 5000,
        expenses: [
          {
            id: "1",
            amount: 1200,
            categoryId: "housing",
            description: "Monthly rent",
            date: "2023-06-01T00:00:00.000Z",
            createdAt: "2023-06-01T00:00:00.000Z",
          },
          {
            id: "2",
            amount: 85,
            categoryId: "utilities",
            description: "Electricity bill",
            date: "2023-06-05T00:00:00.000Z",
            createdAt: "2023-06-05T00:00:00.000Z",
          },
          {
            id: "3",
            amount: 120,
            categoryId: "groceries",
            description: "Weekly grocery shopping",
            date: "2023-06-07T00:00:00.000Z",
            createdAt: "2023-06-07T00:00:00.000Z",
          },
          {
            id: "4",
            amount: 45,
            categoryId: "dining",
            description: "Dinner with friends",
            date: "2023-06-10T00:00:00.000Z",
            createdAt: "2023-06-10T00:00:00.000Z",
          },
          {
            id: "5",
            amount: 60,
            categoryId: "transportation",
            description: "Gas refill",
            date: "2023-06-12T00:00:00.000Z",
            createdAt: "2023-06-12T00:00:00.000Z",
          },
        ],
        categories: [
          {
            id: "housing",
            name: "Housing",
            color: "#3B82F6",
            icon: "🏠",
            budget: 1500,
          },
          {
            id: "transportation",
            name: "Transportation",
            color: "#EF4444",
            icon: "🚗",
            budget: 400,
          },
          {
            id: "groceries",
            name: "Groceries",
            color: "#10B981",
            icon: "🛒",
            budget: 600,
          },
          {
            id: "utilities",
            name: "Utilities",
            color: "#F59E0B",
            icon: "💡",
            budget: 300,
          },
          {
            id: "dining",
            name: "Dining Out",
            color: "#8B5CF6",
            icon: "🍽️",
            budget: 400,
          },
          {
            id: "entertainment",
            name: "Entertainment",
            color: "#EC4899",
            icon: "🎬",
            budget: 200,
          },
          {
            id: "shopping",
            name: "Shopping",
            color: "#6366F1",
            icon: "🛍️",
            budget: 300,
          },
          {
            id: "health",
            name: "Health",
            color: "#14B8A6",
            icon: "⚕️",
            budget: 200,
          },
        ],
      },
    ],
    defaultCategories: [
      {
        id: "housing",
        name: "Housing",
        color: "#3B82F6",
        icon: "🏠",
        budget: 1500,
      },
      {
        id: "transportation",
        name: "Transportation",
        color: "#EF4444",
        icon: "🚗",
        budget: 400,
      },
      {
        id: "groceries",
        name: "Groceries",
        color: "#10B981",
        icon: "🛒",
        budget: 600,
      },
      {
        id: "utilities",
        name: "Utilities",
        color: "#F59E0B",
        icon: "💡",
        budget: 300,
      },
      {
        id: "dining",
        name: "Dining Out",
        color: "#8B5CF6",
        icon: "🍽️",
        budget: 400,
      },
      {
        id: "entertainment",
        name: "Entertainment",
        color: "#EC4899",
        icon: "🎬",
        budget: 200,
      },
      {
        id: "shopping",
        name: "Shopping",
        color: "#6366F1",
        icon: "🛍️",
        budget: 300,
      },
      {
        id: "health",
        name: "Health",
        color: "#14B8A6",
        icon: "⚕️",
        budget: 200,
      },
    ],
  }
  
  