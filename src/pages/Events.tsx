import React from 'react';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import { Calendar } from 'lucide-react';

function Events() {
  // Temporary mock data until API is fully set up
  const events = [
    {
      id: '1',
      title: 'Evening Paint & Wine',
      date: '2024-03-25',
      time: '19:00',
      location: 'Wellington Studio',
      price: 89,
      description: 'Join us for an enchanting evening of artistic exploration.',
      imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      spotsAvailable: 8,
      totalSpots: 12
    },
    {
      id: '2',
      title: 'Watercolor Workshop',
      date: '2024-04-01',
      time: '14:00',
      location: 'Wellington Studio',
      price: 95,
      description: 'Explore the delicate art of watercolor painting.',
      imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      spotsAvailable: 6,
      totalSpots: 10
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Upcoming Ateliers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our artistic gatherings where creativity flows as freely as the wine.
            Each session is limited to ensure an intimate experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>New events are added monthly</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Events;