import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { Users, Mail, MapPin, ShoppingBag } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  displayName: string;
  address?: string;
  purchases?: {
    id: string;
    date: string;
    product: string;
    amount: number;
  }[];
}

function AdminCRM() {
  const { isSuperAdmin } = useAuth(true, true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersQuery = query(collection(db, 'users'));
        const querySnapshot = await getDocs(usersQuery);
        
        const userData: UserData[] = [];
        querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() } as UserData);
        });

        setUsers(userData);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!isSuperAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-rose-600" />
            <h1 className="text-2xl font-serif">Customer Relationship Management</h1>
          </div>

          <div className="grid gap-6">
            {users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{user.displayName || 'Unnamed User'}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    {user.address && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {user.address}
                      </div>
                    )}
                  </div>

                  {user.purchases && user.purchases.length > 0 && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ShoppingBag className="w-4 h-4 text-rose-600" />
                        <span className="font-semibold">Purchase History</span>
                      </div>
                      <div className="space-y-2">
                        {user.purchases.map((purchase) => (
                          <div key={purchase.id} className="text-sm">
                            <div className="flex justify-between">
                              <span>{purchase.product}</span>
                              <span>${purchase.amount}</span>
                            </div>
                            <div className="text-gray-500">
                              {new Date(purchase.date).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCRM;