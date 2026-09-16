'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      router.push('/admin/login');
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loader">
          <div className="loader-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: '1,234', icon: '📋', color: 'text-ocean-400' },
            { label: 'Revenue', value: '₹45,67,890', icon: '💰', color: 'text-green-400' },
            { label: 'Active Divers', value: '5,000+', icon: '🤿', color: 'text-sky-400' },
            { label: 'Pending', value: '23', icon: '⏳', color: 'text-amber-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-xl p-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="glass-dark rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name', 'Activity', 'Date', 'Status', 'Amount', 'Actions'].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                ) : bookings.map((booking: any, index: number) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm">{booking.name}</td>
                    <td className="px-6 py-4 text-sm">{booking.activity}</td>
                    <td className="px-6 py-4 text-sm">{booking.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">₹{booking.amount}</td>
                    <td className="px-6 py-4">
                      <button className="text-ocean-400 hover:text-ocean-300 text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
