import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Trash2, RefreshCw, ChevronLeft, ChevronRight, FilterX } from 'lucide-react';
import api from '../../utils/api';

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    approved: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    paid: 'bg-blue-100 text-blue-700 border-blue-200',
    failed: 'bg-red-100 text-red-600 border-red-200',
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize border ${styles[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: '', paymentStatus: '', date: '' });
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const limit = 15;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit });
      if (filters.status) params.set('status', filters.status);
      if (filters.paymentStatus) params.set('paymentStatus', filters.paymentStatus);
      if (filters.date) params.set('date', filters.date);
      const { data } = await api.get(`/bookings?${params}`);
      setBookings(data.bookings);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id, bookingStatus) => {
    setActionLoading(`status-${id}`);
    try {
      await api.put(`/bookings/${id}/status`, { bookingStatus });
      setBookings(bs => bs.map(b => b.id === id ? { ...b, bookingStatus } : b));
    } finally {
      setActionLoading(null);
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    setActionLoading(`delete-${id}`);
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bs => bs.filter(b => b.id !== id));
      setTotal(t => t - 1);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = search
    ? bookings.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.phone.includes(search) ||
        b.cottageType.toLowerCase().includes(search.toLowerCase())
      )
    : bookings;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl text-forest-900">All Bookings</h2>
          <p className="text-forest-500 text-sm">{total} total bookings</p>
        </div>
        <button onClick={fetchBookings} className="flex items-center gap-2 text-forest-600 hover:text-forest-800 text-sm font-medium transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 border border-forest-50 shadow-sm">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-400" />
            <input
              type="text"
              placeholder="Search by name, phone, cottage…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 text-sm"
            />
          </div>
          <select className="input-field w-auto text-sm" value={filters.status} onChange={e => { setFilters(f => ({ ...f, status: e.target.value })); setPage(1); }}>
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="input-field w-auto text-sm" value={filters.paymentStatus} onChange={e => { setFilters(f => ({ ...f, paymentStatus: e.target.value })); setPage(1); }}>
            <option value="">All Payments</option>
            <option value="pending">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </select>
          <input
            type="date"
            className="input-field w-auto text-sm"
            value={filters.date}
            onChange={e => { setFilters(f => ({ ...f, date: e.target.value })); setPage(1); }}
          />
          {(filters.status || filters.paymentStatus || filters.date) && (
            <button onClick={() => { setFilters({ status: '', paymentStatus: '', date: '' }); setPage(1); }} className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
              <FilterX className="w-4 h-4" /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-forest-50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-forest-600 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-forest-50 border-b border-forest-100">
                <tr>
                  {['#', 'Guest', 'Cottage', 'Dates', 'Guests', 'Amount', 'Payment', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-forest-600 font-medium text-xs whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-forest-400">No bookings found</td>
                  </tr>
                ) : filtered.map((b) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-forest-50/40 transition-colors"
                  >
                    <td className="px-5 py-4 text-forest-400 font-mono text-xs">#{b.id}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-medium text-forest-900">{b.name}</div>
                      <div className="text-forest-400 text-xs">{b.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-forest-700 whitespace-nowrap">{b.cottageType}</td>
                    <td className="px-5 py-4 text-forest-600 whitespace-nowrap text-xs">
                      <div>{new Date(b.checkIn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</div>
                      <div className="text-forest-400">→ {new Date(b.checkOut).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}</div>
                    </td>
                    <td className="px-5 py-4 text-center text-forest-700">{b.guests}</td>
                    <td className="px-5 py-4 font-medium text-forest-900 whitespace-nowrap">₹{b.amount.toLocaleString()}</td>
                    <td className="px-5 py-4"><StatusBadge status={b.paymentStatus} /></td>
                    <td className="px-5 py-4"><StatusBadge status={b.bookingStatus} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {b.bookingStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(b.id, 'approved')}
                              disabled={actionLoading === `status-${b.id}`}
                              title="Approve"
                              className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStatus(b.id, 'rejected')}
                              disabled={actionLoading === `status-${b.id}`}
                              title="Reject"
                              className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          disabled={actionLoading === `delete-${b.id}`}
                          title="Delete"
                          className="w-8 h-8 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-forest-50 flex items-center justify-between">
            <p className="text-forest-500 text-xs">Page {page} of {totalPages} — {total} results</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-forest-200 text-forest-600 hover:bg-forest-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-forest-200 text-forest-600 hover:bg-forest-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
