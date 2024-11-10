import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram } from 'lucide-react';

export default function MeetAndrea() {
  return (
    <div className="py-12 px-4 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="md:w-1/3"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Andrea"
              className="w-full h-[300px] object-cover rounded-[2rem] shadow-lg"
            />
          </motion.div>
          <div className="md:w-2/3 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-serif mb-4"
            >
              Meet Andrea
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mb-4"
            >
              Hi! I'm Andrea, your creative companion in Wellington. With Oh-La-La, 
              I've created a space where art becomes accessible and joy is part of 
              the process. Every session is an opportunity to explore your creativity 
              in a relaxed, supportive environment.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center md:justify-start space-x-4"
            >
              <motion.p 
                whileHover={{ scale: 1.05 }}
                className="flex items-center text-gray-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                (305) 987-5311
              </motion.p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Follow us
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}