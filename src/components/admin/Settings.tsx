import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Key } from 'lucide-react';
import DatabaseTest from './DatabaseTest';
import DatabaseManager from './DatabaseManager';

function Settings() {
  const [settings, setSettings] = useState({
    stripePublishableKey: '',
    stripeSecretKey: '',
    businessName: 'Oh-La-La Atelier',
    businessEmail: '',
    businessPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented with API integration
    console.log('Settings:', settings);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <DatabaseTest />
      
      <DatabaseManager />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2" />
            Stripe API Keys
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publishable Key
              </label>
              <input
                type="text"
                value={settings.stripePublishableKey}
                onChange={(e) => setSettings({ ...settings, stripePublishableKey: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="pk_test_..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secret Key
              </label>
              <input
                type="password"
                value={settings.stripeSecretKey}
                onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="sk_test_..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Your secret key will be encrypted before storing
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Business Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Email
              </label>
              <input
                type="email"
                value={settings.businessEmail}
                onChange={(e) => setSettings({ ...settings, businessEmail: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Phone
              </label>
              <input
                type="tel"
                value={settings.businessPhone}
                onChange={(e) => setSettings({ ...settings, businessPhone: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </motion.button>
      </form>
    </div>
  );
}

export default Settings;