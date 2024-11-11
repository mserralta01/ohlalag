import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import EventManager from '../components/admin/EventManager';
import GalleryManager from '../components/admin/GalleryManager';
import ExpenseTracker from '../components/ExpenseTracker';
import Settings from '../components/admin/Settings';
import Reports from '../components/admin/Reports';
import { Calendar, Image, DollarSign, Settings as SettingsIcon, BarChart } from 'lucide-react';

function Dashboard() {
  const { user, isAuthenticated } = useAuth(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/account" />;
  }

  return (
    <div className="min-h-screen bg-[#fdfbf6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif mb-8">Admin Dashboard</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Tabs defaultValue="events">
            <TabsList>
              <TabsTrigger value="events">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="gallery">
                <Image className="w-4 h-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="expenses">
                <DollarSign className="w-4 h-4 mr-2" />
                Expenses
              </TabsTrigger>
              <TabsTrigger value="reports">
                <BarChart className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="settings">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events">
              <EventManager />
            </TabsContent>
            <TabsContent value="gallery">
              <GalleryManager />
            </TabsContent>
            <TabsContent value="expenses">
              <ExpenseTracker />
            </TabsContent>
            <TabsContent value="reports">
              <Reports />
            </TabsContent>
            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;