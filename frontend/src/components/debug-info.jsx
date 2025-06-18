"use client"

import { useAuth } from "../context/auth-context"

export default function DebugInfo() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-md max-h-64 overflow-auto">
      <h4 className="font-bold mb-2">Debug Info</h4>
      <div className="space-y-2">
        <div>
          <strong>User ID:</strong> {user._id}
        </div>
        <div>
          <strong>Categories ({user.categories?.length || 0}):</strong>
          <ul className="ml-2">
            {user.categories?.map((cat) => (
              <li key={cat.id}>
                {cat.icon} {cat.name} (ID: {cat.id})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Expenses ({user.expenses?.length || 0}):</strong>
          <ul className="ml-2">
            {user.expenses?.slice(0, 3).map((exp) => (
              <li key={exp._id || exp.id}>
                {exp.description} - ${exp.amount} (Cat: {exp.categoryId})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
