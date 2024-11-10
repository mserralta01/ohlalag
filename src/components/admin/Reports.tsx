import React from 'react';
import { BarChart, DollarSign, Users, TrendingUp } from 'lucide-react';

function Reports() {
  // This will be replaced with actual data from the API
  const stats = {
    totalRevenue: 12450,
    totalAttendees: 145,
    averageEventSize: 12,
    upcomingEvents: 8
  };

  const recentTransactions = [
    {
      id: 1,
      date: '2024-03-20',
      customer: 'Sarah Johnson',
      event: 'Evening Paint & Wine',
      amount: 89
    },
    // More transactions...
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold">${stats.totalRevenue}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Attendees</h3>
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold">{stats.totalAttendees}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Avg Event Size</h3>
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold">{stats.averageEventSize}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
            <TrendingUp className="w-5 h-5 text-gray-600" />
          </div>
          <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Event</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="py-2">{transaction.customer}</td>
                  <td className="py-2">{transaction.event}</td>
                  <td className="py-2 text-right">${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;