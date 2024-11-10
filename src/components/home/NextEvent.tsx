import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, GlassWater } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  price: number;
  spotsLeft: number;
}

interface Props {
  event: Event;
}

export default function NextEvent({ event }: Props) {
  return (
    <div className="bg-[#2c1810] text-white py-20">
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Next Atelier Session</h2>
          <p className="text-gray-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>A magical evening awaits</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white text-black p-8 rounded-[2rem] max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 -rotate-45 transform translate-x-20 -translate-y-20 bg-[#f8e3c5] opacity-20 rounded-full" />
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>{event.title}</h3>
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              ${event.price}
            </motion.span>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-3" />
              <span style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {format(new Date(event.date), 'MMMM d, yyyy')} at {event.time}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-3" />
              <span style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Only {event.spotsLeft} spots remaining!
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <GlassWater className="w-5 h-5 mr-3" />
              <span style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Wine and artisanal cheese included
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{event.description}</p>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to={`/events/${event.id}`}
              className="block w-full text-center bg-[#2c1810] text-white py-3 rounded-full hover:bg-[#3d1f13] transition-all"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Reserve Your Spot
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}