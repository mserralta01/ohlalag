import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Database } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const testDatabase = async () => {
    setDbStatus('testing');
    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();
      
      if (response.ok) {
        setDbStatus('success');
        setTimeout(() => setDbStatus('idle'), 3000);
      } else {
        throw new Error(data.message || 'Failed to connect to database');
      }
    } catch (error) {
      setDbStatus('error');
      setTimeout(() => setDbStatus('idle'), 3000);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-serif text-2xl text-rose-600 hover:text-rose-700 transition-colors">
              Designs by Oh-La-La
            </Link>
            <div className="hidden md:flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={testDatabase}
                disabled={dbStatus === 'testing'}
                className="flex items-center space-x-2 px-4 py-2 rounded-full transition-colors mr-8"
              >
                <Database className="w-4 h-4" />
                <span className={`
                  ${dbStatus === 'idle' && 'text-gray-600'}
                  ${dbStatus === 'testing' && 'text-blue-600'}
                  ${dbStatus === 'success' && 'text-green-600'}
                  ${dbStatus === 'error' && 'text-red-600'}
                `}>
                  {dbStatus === 'idle' && 'Test DB'}
                  {dbStatus === 'testing' && 'Testing...'}
                  {dbStatus === 'success' && 'Connection Successful'}
                  {dbStatus === 'error' && 'Connection Failed'}
                </span>
              </motion.button>
              <Link to="/" className="text-rose-600 hover:text-rose-700 transition-colors">
                Home
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-rose-600 hover:text-rose-700 transition-colors">
              Ateliers
            </Link>
            <Link to="/gallery" className="text-rose-600 hover:text-rose-700 transition-colors">
              Gallery
            </Link>
            <Link to="/dashboard" className="btn-primary">
              Account
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white/95 backdrop-blur-sm shadow-soft">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Ateliers
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={testDatabase}
              disabled={dbStatus === 'testing'}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl w-full text-left"
            >
              <Database className="w-4 h-4" />
              <span className={`
                ${dbStatus === 'idle' && 'text-gray-600'}
                ${dbStatus === 'testing' && 'text-blue-600'}
                ${dbStatus === 'success' && 'text-green-600'}
                ${dbStatus === 'error' && 'text-red-600'}
              `}>
                {dbStatus === 'idle' && 'Test DB'}
                {dbStatus === 'testing' && 'Testing...'}
                {dbStatus === 'success' && 'Connection Successful'}
                {dbStatus === 'error' && 'Connection Failed'}
              </span>
            </motion.button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;