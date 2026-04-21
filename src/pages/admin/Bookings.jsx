import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Trash2, RefreshCw, ChevronLeft, ChevronRight, FilterX, Eye, Calendar } from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

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
    failed: 'bg-red-100 text-red-600 border-red-200',
    refunded: 'bg-purple-100 text-purple-700 border-purple-200',
  };
  
  const styles = type === 'payment' ? paymentStyles : bookingStyles;
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize border ${styles[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
}

function BookingDetailsModal({ booking, onClose }) {
  if (!booking) return null;

  const nights = Math.ceil(
    (new Date(booking.checkOut).setHours(0, 0, 0, 0) -
      new Date(booking.checkIn).setHours(0, 0, 0, 0)) /
    (1000 * 60 * 60 * 24)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto"
      >
        <div className="sticky top-0 bg-forest-900 text-white p-6 flex items-center justify-between border-b border-forest-800">
          <h2 className="font-display text-2xl">Booking #{booking.id}</h2>
          <button onClick={onClose} className="text-2xl leading-none hover:opacity-70">×</button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-forest-500 uppercase mb-3">Guest Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-forest-500 mb-1">Name</p>
                  <p className="font-semibold text-forest-900">{booking.name}</p>
                </div>
                <div>
                  <p className="text-xs text-forest-500 mb-1">Phone</p>
                  <p className="font-semibold text-forest-900"><a href={`tel:${booking.phone}`} className="hover:text-forest-600">{booking.phone}</a></p>
                </div>
                <div>
                  <p className="text-xs text-forest-500 mb-1">Email</p>
                  <p className="font-semibold text-forest-900"><a href={`mailto:${booking.email}`} className="hover:text-forest-600 break-all">{booking.email}</a></p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-forest-500 uppercase mb-3">Booking Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-forest-500 mb-1">Cottage Type</p>
                  <p className="font-semibold text-forest-900">{booking.cottageType}</p>
                </div>
                <div>
                  <p className="text-xs text-forest-500 mb-1">Check-in</p>
                  <p className="font-semibold text-forest-900">{new Date(booking.checkIn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-xs text-forest-500 mb-1">Check-out</p>
                  <p className="font-semibold text-forest-900">{new Date(booking.checkOut).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-forest-100 pt-6 grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-forest-500 uppercase mb-3">Financial</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-forest-600">Guests</span>
                  <span className="font-semibold text-forest-900">{booking.guests} persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-forest-600">Nights</span>
                  <span className="font-semibold text-forest-900">{nights}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-forest-100">
                  <span className="text-sm font-semibold text-forest-700">Total Amount</span>
                  <span className="font-display text-lg text-forest-900">₹{(booking.amount || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-forest-500 uppercase mb-3">Status</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-forest-500 mb-2">Booking Status</p>
                  <StatusBadge status={booking.bookingStatus} type="booking" />
                </div>
                <div>
                  <p className="text-xs text-forest-500 mb-2">Payment Status</p>
                  <StatusBadge status={booking.paymentStatus} type="payment" />
                </div>
                {booking.notes && (
                  <div className="pt-2 border-t border-forest-100">
                    <p className="text-xs text-forest-500 mb-1">Special Requests</p>
                    <p className="text-sm text-forest-700">{booking.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-forest-100 pt-4 text-xs text-forest-400 space-y-1">
            <p>Created: {new Date(booking.createdAt).toLocaleString('en-IN')}</p>
            {booking.updatedAt && <p>Updated: {new Date(booking.updatedAt).toLocaleString('en-IN')}</p>}
            {booking.paymentId && <p>Payment ID: {booking.paymentId}</p>}
          </div>
        </div>
      </motion.div>
    </div>
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
  const [selectedBooking, setSelectedBooking] = useState(null);
  const limit = 15;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit });
      if (filters.status) params.set('status', filters.status);
      if (filters.paymentStatus) params.set('paymentStatus', filters.paymentStatus);
      if (filters.date) params.set('date', filters.date);
      const { data } = await api.get(`/bookings?${params}`);
      setBookings(data.bookings || []);
      setTotal(data.pagination?.total || data.total || 0);
    } catch (error) {
      toast.error('Failed to load bookings');
      console.error(error);
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
      toast.success(`Booking ${bookingStatus}`);
    } catch (error) {
      toast.error('Failed to update booking');
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
      toast.success('Booking deleted');
    } catch (error) {
      toast.error('Failed to delete booking');
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
                        <button
                          onClick={() => setSelectedBooking(b)}
                          title="View details"
                          className="w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      )}
    </div>
  );
}
