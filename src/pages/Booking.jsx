import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, CheckCircle2, Loader2, User, ArrowRight } from 'lucide-react';
import api from '../utils/api';
import PageWrapper from '../components/PageWrapper';
import { loadRazorpay } from '../utils/loadRazorpay';

const cottageOptions = [
  { name: 'Forest Cottage', price: 2500, maxGuests: 2 },
  { name: 'Valley View Suite', price: 3800, maxGuests: 4 },
  { name: 'Family Bungalow', price: 5500, maxGuests: 6 },
  { name: 'Treetop Hideaway', price: 7200, maxGuests: 2 },
];

function SuccessScreen({ booking, onWhatsApp }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-14 h-14 text-green-600" />
      </motion.div>
      <h2 className="font-display text-4xl text-forest-900 mb-3">Booking Confirmed!</h2>
      <p className="text-forest-600 text-lg mb-2">
        Welcome to Balu Resorts, <strong>{booking.name}</strong>!
      </p>
      <p className="text-forest-500 text-sm mb-8">
        Booking ID: #{booking.id} - A confirmation will be sent to your phone.
      </p>

      <div className="glass-card p-6 max-w-sm mx-auto mb-8 text-left space-y-3">
        {[
          ['Cottage', booking.cottageType],
          ['Check-in', new Date(booking.checkIn).toLocaleDateString('en-IN', { dateStyle: 'long' })],
          ['Check-out', new Date(booking.checkOut).toLocaleDateString('en-IN', { dateStyle: 'long' })],
          ['Guests', booking.guests],
          ['Amount Paid', `Rs. ${Number(booking.amount || 0).toLocaleString()}`],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm gap-4">
            <span className="text-forest-500">{label}</span>
            <span className="font-medium text-forest-900 text-right">{value}</span>
          </div>
        ))}
      </div>

      <button onClick={onWhatsApp} className="btn-primary mx-auto">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Send Booking to WhatsApp
      </button>
    </motion.div>
  );
}

export default function Booking() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    cottageType: params.get('cottage') || 'Forest Cottage',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const cottage = cottageOptions.find(item => item.name === form.cottageType) || cottageOptions[0];
  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)))
    : 0;
  const roomTotal = cottage.price * (nights || 1);
  const taxAmount = Math.round(roomTotal * 0.12);
  const grandTotal = roomTotal + taxAmount;

  const setField = (key, value) => setForm(current => ({ ...current, [key]: value }));

  const openWhatsApp = booking => {
    const checkIn = new Date(booking.checkIn).toLocaleDateString('en-IN');
    const checkOut = new Date(booking.checkOut).toLocaleDateString('en-IN');
    const message = encodeURIComponent(
      `Hi, I've booked Balu Resorts!\n\n` +
      `Check-in: ${checkIn}\n` +
      `Check-out: ${checkOut}\n` +
      `Cottage: ${booking.cottageType}\n` +
      `Guests: ${booking.guests}\n` +
      `Amount: Rs. ${Number(booking.amount || 0).toLocaleString()}\n` +
      `Booking ID: #${booking.id}`
    );
    window.open(`https://wa.me/919043210789?text=${message}`, '_blank');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
      setError('Please fill in all required fields.');
      return;
    }

    if (nights <= 0) {
      setError('Check-out must be after check-in.');
      return;
    }

    setLoading(true);

    try {
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error('Razorpay checkout failed to load. Please check your internet connection and try again.');
      }

      const { data: booking } = await api.post('/bookings', {
        ...form,
        guests: Number(form.guests),
        amount: grandTotal,
      });

      const { data: order } = await api.post('/payment/create-order', {
        amount: grandTotal,
        bookingId: booking.id,
      });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Balu Resorts',
        description: `${form.cottageType} - ${nights} night${nights > 1 ? 's' : ''}`,
        order_id: order.orderId,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email,
        },
        theme: { color: '#22762a' },
        handler: async response => {
          try {
            const { data } = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id,
            });
            setSuccess(data.booking || { ...booking, amount: grandTotal });
          } catch (verifyError) {
            setError(verifyError.response?.data?.error || 'Payment verification failed. Please contact us.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      });

      razorpay.open();
    } catch (submitError) {
      setError(submitError.response?.data?.error || submitError.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <section className="bg-forest-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-accent italic text-earth-300 text-lg mb-3">
            Secure your retreat
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-6xl mb-5">
            Book Your Stay
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-forest-300">
            Fill in your details and pay securely via Razorpay. Confirmation via WhatsApp.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream leaf-pattern min-h-screen">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="glass-card p-10 max-w-xl mx-auto">
                  <SuccessScreen booking={success} onWhatsApp={() => openWhatsApp(success)} />
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-7">
                      <h2 className="font-display text-2xl text-forest-900 mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-forest-600" /> Guest Details
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">Full Name *</label>
                          <input className="input-field" placeholder="Your name" value={form.name} onChange={event => setField('name', event.target.value)} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">Phone Number *</label>
                          <input className="input-field" placeholder="+91 XXXXX XXXXX" type="tel" value={form.phone} onChange={event => setField('phone', event.target.value)} required />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-forest-700 mb-2">Email (optional)</label>
                          <input className="input-field" placeholder="your@email.com" type="email" value={form.email} onChange={event => setField('email', event.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-7">
                      <h2 className="font-display text-2xl text-forest-900 mb-6 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-forest-600" /> Stay Details
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">Check-in *</label>
                          <input className="input-field" type="date" value={form.checkIn} min={new Date().toISOString().split('T')[0]} onChange={event => setField('checkIn', event.target.value)} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">Check-out *</label>
                          <input className="input-field" type="date" value={form.checkOut} min={form.checkIn || new Date().toISOString().split('T')[0]} onChange={event => setField('checkOut', event.target.value)} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">Number of Guests *</label>
                          <select className="input-field" value={form.guests} onChange={event => setField('guests', event.target.value)}>
                            {[...Array(cottage.maxGuests)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1} Guest{index > 0 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">Cottage Type *</label>
                          <select className="input-field" value={form.cottageType} onChange={event => setField('cottageType', event.target.value)}>
                            {cottageOptions.map(option => (
                              <option key={option.name} value={option.name}>
                                {option.name} - Rs. {option.price}/night
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-forest-700 mb-2">Special Requests</label>
                          <textarea className="input-field" rows={3} placeholder="Any dietary needs, room preferences, special occasions..." value={form.notes} onChange={event => setField('notes', event.target.value)} />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-1">
                    <div className="glass-card p-7 sticky top-24">
                      <h3 className="font-display text-xl text-forest-900 mb-6">Price Summary</h3>
                      <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between">
                          <span className="text-forest-600">{cottage.name}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-forest-600">Rs. {cottage.price.toLocaleString()} x {nights || '-'} night{nights > 1 ? 's' : ''}</span>
                          <span className="text-forest-900 font-medium">Rs. {(cottage.price * (nights || 0)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-forest-600">GST (12%)</span>
                          <span className="text-forest-900 font-medium">Rs. {nights ? taxAmount.toLocaleString() : '0'}</span>
                        </div>
                        <div className="border-t border-forest-200 pt-3 flex justify-between font-semibold text-base">
                          <span className="text-forest-900">Total</span>
                          <span className="text-forest-700 font-display text-xl">Rs. {nights ? grandTotal.toLocaleString() : '-'}</span>
                        </div>
                      </div>

                      <button type="submit" disabled={loading || !nights} className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                        ) : (
                          <>Pay & Book <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <div className="mt-4 flex items-center gap-2 text-xs text-forest-500 justify-center">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Secured by Razorpay
                      </div>

                      <div className="mt-6 pt-5 border-t border-forest-100">
                        <p className="text-xs text-forest-500 mb-3 font-medium">Or book via WhatsApp</p>
                        <a
                          href={`https://wa.me/919043210789?text=Hi%2C%20I'd%20like%20to%20book%20the%20${encodeURIComponent(form.cottageType)}%20from%20${form.checkIn || '[date]'}%20to%20${form.checkOut || '[date]'}%20for%20${form.guests}%20guests.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 border border-green-300 text-green-700 hover:bg-green-50 px-4 py-2.5 rounded-full text-sm font-medium transition-colors w-full"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          Book via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
}
