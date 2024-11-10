import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <div className="bg-black text-white py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-6">
          Ready to unleash your creativity?
        </h2>
        <p className="text-xl mb-8">
          Join us for an evening of artistic exploration, laughter, and new friendships.
          Your creative journey begins here!
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/events"
            className="inline-block px-8 py-3 bg-white text-black rounded-full hover:bg-opacity-90 transition-all"
          >
            Browse Upcoming Sessions
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}