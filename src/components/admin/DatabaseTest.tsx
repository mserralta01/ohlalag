import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle, XCircle, Loader } from 'lucide-react';

function DatabaseTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing connection...');

    try {
      const response = await fetch('/api/test-db');
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully connected to database!');
      } else {
        throw new Error(data.message || 'Failed to connect to database');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to connect to database');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <Database className="w-12 h-12 mx-auto mb-2 text-black" />
        <h2 className="text-xl font-semibold text-black">Database Connection Test</h2>
      </div>

      <div className="mb-6">
        {status !== 'idle' && (
          <div className={`p-4 rounded-lg ${
            status === 'testing' ? 'bg-blue-50 text-black' :
            status === 'success' ? 'bg-green-50 text-black' :
            'bg-red-50 text-black'
          }`}>
            <div className="flex items-center justify-center gap-2">
              {status === 'testing' && <Loader className="w-5 h-5 animate-spin text-black" />}
              {status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
              {status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
              <span className="text-black">{message}</span>
            </div>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={testConnection}
        disabled={status === 'testing'}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Test Connection
      </motion.button>
    </div>
  );
}

export default DatabaseTest;