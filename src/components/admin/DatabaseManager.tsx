import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Trash2, Database, RefreshCw } from 'lucide-react';

interface DatabaseRecord {
  _id: string;
  [key: string]: any;
}

interface CollectionData {
  name: string;
  records: DatabaseRecord[];
}

function DatabaseManager() {
  const [collections, setCollections] = useState<CollectionData[]>([]);
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/database/collections');
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (collectionName: string, recordId: string) => {
    if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/database/${collectionName}/${recordId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the collection data
        fetchCollections();
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const toggleCollection = (name: string) => {
    setExpandedCollection(expandedCollection === name ? null : name);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Database Tables</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchCollections}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </motion.button>
      </div>

      <div className="space-y-4">
        {collections.map((collection) => (
          <div key={collection.name} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCollection(collection.name)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium">{collection.name}</span>
              {expandedCollection === collection.name ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence>
              {expandedCollection === collection.name && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 overflow-x-auto">
                    {collection.records.length > 0 ? (
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            {Object.keys(collection.records[0]).map((key) => (
                              <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                                {key}
                              </th>
                            ))}
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {collection.records.map((record) => (
                            <tr key={record._id} className="border-t">
                              {Object.entries(record).map(([key, value]) => (
                                <td key={key} className="px-4 py-2 text-sm">
                                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                </td>
                              ))}
                              <td className="px-4 py-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDelete(collection.name, record._id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No records found</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatabaseManager;