import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EventManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    time: '',
    totalSpots: '',
    duration: '2 hours',
    images: [] as string[],
    includes: ['All art supplies', 'Wine and cheese selection', 'Professional guidance']
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented with API integration
    console.log('New event:', { ...newEvent, date: selectedDate });
    setIsCreating(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Events</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </motion.button>
      </div>

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-6 rounded-xl mb-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Create Event
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Event List */}
      <div className="space-y-4">
        {/* This will be replaced with actual events from the API */}
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Evening Paint & Wine</h3>
            <p className="text-sm text-gray-600">March 25, 2024 at 19:00</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventManager;