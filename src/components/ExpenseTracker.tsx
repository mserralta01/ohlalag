import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, DollarSign, Calendar } from 'lucide-react';
import { Expense, ExpenseCategory } from '../types';

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Supplies',
  'Food & Beverages',
  'Venue',
  'Marketing',
  'Equipment',
  'Staff',
  'Other'
];

function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: 'Supplies' as ExpenseCategory,
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'cash'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expense: Expense = {
      id: Date.now().toString(),
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      date: newExpense.date,
      paymentMethod: newExpense.paymentMethod
    };
    setExpenses([...expenses, expense]);
    setNewExpense({
      category: 'Supplies',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'cash'
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensesByCategory = EXPENSE_CATEGORIES.map(category => ({
    category,
    amount: expenses
      .filter(e => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-serif mb-4">Expense Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Total Expenses</h3>
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as ExpenseCategory })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            >
              {EXPENSE_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Add Expense
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="py-2">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="py-2">{expense.category}</td>
                <td className="py-2">{expense.description}</td>
                <td className="py-2 text-right">${expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTracker;