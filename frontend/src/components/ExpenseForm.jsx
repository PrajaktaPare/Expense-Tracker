import { useState, useEffect } from 'react';

function ExpenseForm({ onSubmit, onClose, initialData }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description || '',
        amount: initialData.amount || '',
        category: initialData.category || 'Food'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category
    };
    if (initialData) {
      onSubmit(initialData._id, expense);
    } else {
      onSubmit(expense);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;