import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[90vh] bg-cover bg-center" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
      backgroundBlendMode: 'overlay',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-light mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              L'Art de Vivre
            </motion.h1>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Where Wellington's creative spirits gather to paint, laugh, and savor the joie de vivre
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                to="/events" 
                className="inline-block px-12 py-4 bg-white text-black rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 text-lg"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Découvrez Nos Ateliers
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}