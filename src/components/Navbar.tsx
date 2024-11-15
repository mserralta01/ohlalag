import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Database, LogOut, User, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const { user, logout, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
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
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-rose-600 hover:text-rose-700 transition-colors">
              Ateliers
            </Link>
            <Link to="/gallery" className="text-rose-600 hover:text-rose-700 transition-colors">
              Gallery
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {isSuperAdmin && (
                  <>
                    <Link to="/admin/crm" className="flex items-center space-x-2 text-rose-600 hover:text-rose-700">
                      <Users className="w-4 h-4" />
                      <span>CRM</span>
                    </Link>
                    <Link to="/admin/ateliers" className="flex items-center space-x-2 text-rose-600 hover:text-rose-700">
                      <Calendar className="w-4 h-4" />
                      <span>Manage Ateliers</span>
                    </Link>
                  </>
                )}
                <Link to="/dashboard" className="flex items-center space-x-2 text-rose-600 hover:text-rose-700">
                  <User className="w-4 h-4" />
                  <span>{user.displayName || 'Account'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-rose-600 hover:text-rose-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
            )}
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
            {user ? (
              <>
                {isSuperAdmin && (
                  <>
                    <Link
                      to="/admin/crm"
                      className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      CRM
                    </Link>
                    <Link
                      to="/admin/ateliers"
                      className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage Ateliers
                    </Link>
                  </>
                )}
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;