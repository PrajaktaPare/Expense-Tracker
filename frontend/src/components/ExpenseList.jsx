function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <div className="grid gap-4">
      {expenses.length === 0 ? (
        <p className="text-gray-600 text-center">No expenses found.</p>
      ) : (
        expenses.map(expense => (
          <div
            key={expense._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{expense.description}</h3>
              <p className="text-gray-600">${expense.amount.toFixed(2)}</p>
              <p className="text-gray-500">{expense.category}</p>
              <p className="text-gray-400 text-sm">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(expense)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(expense._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;