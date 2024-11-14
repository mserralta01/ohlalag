import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, DollarSign, Users, Image as ImageIcon } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import AtelierForm from '../components/admin/AtelierForm';

interface Atelier {
  id: string;
  title: string;
  date: string;
  time: string;
  price: number;
  description: string;
  imageUrl: string;
  spotsAvailable: number;
  totalSpots: number;
  location: string;
}

function AdminAteliers() {
  const { isSuperAdmin } = useAuth(true, true);
  const [ateliers, setAteliers] = useState<Atelier[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAteliers();
  }, []);

  const fetchAteliers = async () => {
    try {
      const ateliersRef = collection(db, 'ateliers');
      const snapshot = await getDocs(ateliersRef);
      const atelierData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Atelier[];
      
      setAteliers(atelierData);
    } catch (err) {
      setError('Failed to fetch ateliers');
      console.error('Error fetching ateliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Omit<Atelier, 'id'>) => {
    try {
      const ateliersRef = collection(db, 'ateliers');
      await addDoc(ateliersRef, data);
      setIsCreating(false);
      fetchAteliers();
    } catch (err) {
      setError('Failed to create atelier');
      console.error('Error creating atelier:', err);
    }
  };

  const handleUpdate = async (id: string, data: Partial<Atelier>) => {
    try {
      const atelierRef = doc(db, 'ateliers', id);
      await updateDoc(atelierRef, data);
      setIsEditing(null);
      fetchAteliers();
    } catch (err) {
      setError('Failed to update atelier');
      console.error('Error updating atelier:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this atelier?')) return;

    try {
      const atelierRef = doc(db, 'ateliers', id);
      await deleteDoc(atelierRef);
      fetchAteliers();
    } catch (err) {
      setError('Failed to delete atelier');
      console.error('Error deleting atelier:', err);
    }
  };

  if (!isSuperAdmin) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-serif">Manage Ateliers</h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Atelier
            </motion.button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {isCreating && (
            <div className="mb-8">
              <AtelierForm
                onSubmit={handleCreate}
                onCancel={() => setIsCreating(false)}
              />
            </div>
          )}

          <div className="grid gap-6">
            {ateliers.map((atelier) => (
              <motion.div
                key={atelier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                {isEditing === atelier.id ? (
                  <AtelierForm
                    initialData={atelier}
                    onSubmit={(data) => handleUpdate(atelier.id, data)}
                    onCancel={() => setIsEditing(null)}
                  />
                ) : (
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{atelier.title}</h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(atelier.date).toLocaleDateString()} at {atelier.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${atelier.price}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {atelier.spotsAvailable}/{atelier.totalSpots} spots
                        </span>
                      </div>
                      <p className="text-gray-600">{atelier.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(atelier.id)}
                        className="p-2 text-gray-600 hover:text-rose-600 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(atelier.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAteliers;