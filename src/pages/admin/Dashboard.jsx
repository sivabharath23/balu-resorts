import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck, TrendingUp, Clock, IndianRupee,
  CheckCircle2, XCircle, ArrowRight
} from 'lucide-react';
import api from '../../utils/api';

function StatCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-forest-50"
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

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    paid: 'bg-blue-100 text-blue-700',
    failed: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats').then(({ data }) => setStats(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-forest-600 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="font-display text-2xl text-forest-900 mb-1">Overview</h2>
        <p className="text-forest-500 text-sm">Welcome back! Here's what's happening at Balu Resorts.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={CalendarCheck} label="Total Bookings" value={stats?.totalBookings ?? '—'} color="bg-forest-600" delay={0} />
        <StatCard icon={Clock} label="Pending" value={stats?.pendingBookings ?? '—'} sub="Awaiting approval" color="bg-amber-500" delay={0.05} />
        <StatCard icon={CheckCircle2} label="Approved" value={stats?.approvedBookings ?? '—'} color="bg-green-600" delay={0.1} />
        <StatCard
          icon={IndianRupee}
          label="Total Revenue"
          value={stats?.totalRevenue ? `₹${Math.round(stats.totalRevenue).toLocaleString()}` : '₹0'}
          sub="From paid bookings"
          color="bg-earth-500"
          delay={0.15}
        />
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-forest-50 overflow-hidden"
      >
        <div className="p-6 border-b border-forest-50 flex items-center justify-between">
          <h3 className="font-display text-xl text-forest-900">Recent Bookings</h3>
          <Link to="/admin/bookings" className="text-forest-600 hover:text-forest-800 text-sm font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-forest-50">
              <tr>
                {['ID', 'Guest', 'Cottage', 'Check-in', 'Check-out', 'Amount', 'Payment', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-forest-600 font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-50">
              {stats?.recentBookings?.length ? stats.recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-forest-50/50 transition-colors">
                  <td className="px-5 py-4 text-forest-500">#{b.id}</td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-forest-900">{b.name}</div>
                    <div className="text-forest-400 text-xs">{b.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-forest-700">{b.cottageType}</td>
                  <td className="px-5 py-4 text-forest-600">{new Date(b.checkIn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                  <td className="px-5 py-4 text-forest-600">{new Date(b.checkOut).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</td>
                  <td className="px-5 py-4 font-medium text-forest-900">₹{b.amount.toLocaleString()}</td>
                  <td className="px-5 py-4"><StatusBadge status={b.paymentStatus} /></td>
                  <td className="px-5 py-4"><StatusBadge status={b.bookingStatus} /></td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-forest-400">No bookings yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}