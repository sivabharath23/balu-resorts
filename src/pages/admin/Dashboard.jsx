import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Clock, IndianRupee,
  CheckCircle2, XCircle, ArrowRight, AlertCircle, CreditCard
} from 'lucide-react';
import api from '../../utils/api';

function StatCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-forest-50 hover:border-forest-100 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="font-display text-3xl text-forest-900 mb-1">{value}</div>
      <div className="text-forest-500 text-sm font-medium">{label}</div>
      {sub && <div className="text-forest-400 text-xs mt-1">{sub}</div>}
    </motion.div>
  );
}

function StatusBadge({ status, type = 'booking' }) {
  const bookingStyles = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  
  const paymentStyles = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    paid: 'bg-blue-100 text-blue-700 border-blue-200',
    failed: 'bg-red-100 text-red-700 border-red-200',
    refunded: 'bg-purple-100 text-purple-700 border-purple-200',
  };
  
  const styles = type === 'payment' ? paymentStyles : bookingStyles;
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize border ${styles[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('balu_token');
    api.get('/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        setStats(data.stats || data);
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Failed to load stats');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-forest-600 border-t-transparent rounded-full" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-forest-700 mb-3">{error}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors text-sm font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const totalStats = [
    { icon: CalendarCheck, label: 'Total Bookings', value: stats?.totalBookings ?? 0, color: 'bg-forest-600', delay: 0 },
    { icon: Clock, label: 'Pending', value: stats?.pendingBookings ?? 0, sub: 'Awaiting approval', color: 'bg-amber-500', delay: 0.05 },
    { icon: CheckCircle2, label: 'Approved', value: stats?.approvedBookings ?? 0, color: 'bg-green-600', delay: 0.1 },
    { icon: IndianRupee, label: 'Total Revenue', value: stats?.totalRevenue ? `₹${Math.round(stats.totalRevenue).toLocaleString()}` : '₹0', sub: 'From paid bookings', color: 'bg-earth-500', delay: 0.15 },
  ];

  const paymentStats = [
    { icon: CreditCard, label: 'Paid Bookings', value: stats?.paidBookings ?? 0, color: 'bg-blue-600', delay: 0.2 },
    { icon: Clock, label: 'Pending Payments', value: stats?.pendingPayments ?? 0, sub: 'Awaiting payment', color: 'bg-orange-500', delay: 0.25 },
    { icon: XCircle, label: 'Rejected', value: stats?.rejectedBookings ?? 0, color: 'bg-red-600', delay: 0.3 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-forest-900 mb-1">Dashboard</h2>
          <p className="text-forest-500 text-sm">Welcome back! Here's what's happening at Balu Resorts.</p>
        </div>
        <button
          onClick={fetchStats}
          className="px-3 py-2 text-sm text-forest-600 hover:text-forest-800 hover:bg-forest-50 rounded-lg transition-all"
          title="Refresh data"
        >
          <motion.div animate={{ rotate: loading ? 360 : 0 }} transition={{ duration: 0.6 }}>
            ↻
          </motion.div>
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {totalStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {paymentStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-forest-50 overflow-hidden"
      >
        <div className="p-6 border-b border-forest-50 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl text-forest-900">Recent Bookings</h3>
            <p className="text-forest-500 text-xs mt-1">Latest {Math.min(stats?.recentBookings?.length || 0, 8)} bookings</p>
          </div>
          <Link to="/admin/bookings" className="text-forest-600 hover:text-forest-800 text-sm font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {stats?.recentBookings?.length ? (
            <table className="w-full text-sm">
              <thead className="bg-forest-50 border-b border-forest-100">
                <tr>
                  {['ID', 'Guest', 'Cottage', 'Check-in', 'Check-out', 'Amount', 'Payment', 'Booking Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-forest-600 font-medium text-xs whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-50">
                {stats.recentBookings.map((b) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-forest-50/40 transition-colors">
                    <td className="px-5 py-4 text-forest-400 font-mono text-xs">#{b.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-forest-900">{b.name}</div>
                      <div className="text-forest-400 text-xs">{b.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-forest-700 text-sm">{b.cottageType}</td>
                    <td className="px-5 py-4 text-forest-600 text-xs whitespace-nowrap">
                      {new Date(b.checkIn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-5 py-4 text-forest-600 text-xs whitespace-nowrap">
                      {new Date(b.checkOut).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-5 py-4 font-medium text-forest-900 whitespace-nowrap">₹{(b.amount || 0).toLocaleString()}</td>
                    <td className="px-5 py-4"><StatusBadge status={b.paymentStatus} type="payment" /></td>
                    <td className="px-5 py-4"><StatusBadge status={b.bookingStatus} type="booking" /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-5 py-12 text-center text-forest-400">
              <p>No bookings yet</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}