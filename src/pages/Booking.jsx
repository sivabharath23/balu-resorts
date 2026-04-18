import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Loader2,
  User,
  ArrowRight,
} from "lucide-react";
import api from "../utils/api";
import PageWrapper from "../components/PageWrapper";
import { loadRazorpay } from "../utils/loadRazorpay";
import { Toaster, toast } from "react-hot-toast";
// ADD THIS IMPORT

const cottageOptions = [
  {
    name: "Single Bedroom",
    price: 3000,
    maxGuests: 3,
  },
  {
    name: "Double Bedroom",
    price: 6000,
    maxGuests: 6,
  },
];

function SuccessScreen({ booking, onWhatsApp }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-14 h-14 text-green-600" />
      </motion.div>
      <h2 className="font-display text-4xl text-forest-900 mb-3">
        Booking Confirmed!
      </h2>
      <p className="text-forest-600 text-lg mb-2">
        Welcome to Balu Resorts, <strong>{booking.name}</strong>!
      </p>
      <p className="text-forest-500 text-sm mb-8">
        Booking ID: #{booking.id} - A confirmation will be sent to your phone.
      </p>

      <div className="glass-card p-6 max-w-sm mx-auto mb-8 text-left space-y-3">
        {[
          ["Cottage", booking.cottageType],
          [
            "Check-in",
            new Date(booking.checkIn).toLocaleDateString("en-IN", {
              dateStyle: "long",
            }),
          ],
          [
            "Check-out",
            new Date(booking.checkOut).toLocaleDateString("en-IN", {
              dateStyle: "long",
            }),
          ],
          ["Guests", booking.guests],
          [
            "Amount Paid",
            `Rs. ${Number(booking.amount || 0).toLocaleString()}`,
          ],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm gap-4">
            <span className="text-forest-500">{label}</span>
            <span className="font-medium text-forest-900 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      <button onClick={onWhatsApp} className="btn-primary mx-auto">
        Send Booking to WhatsApp
      </button>
    </motion.div>
  );
}

export default function Booking() {
    const today = new Date().toISOString().split('T')[0];
  const [params] = useSearchParams();
const [form, setForm] = useState({
  name: '',
  phone: '',
  email: '',
  checkIn: today,
  checkOut: today,
  guests: 2,
  cottageType: params.get('cottage') || 'Single Bedroom',
  notes: '',
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const cottage =
    cottageOptions.find((item) => item.name === form.cottageType) ||
    cottageOptions[0];
const nights = form.checkIn && form.checkOut
  ? Math.max(
      1,
      Math.ceil(
        (new Date(form.checkOut).setHours(0,0,0,0) -
         new Date(form.checkIn).setHours(0,0,0,0)) /
        (1000 * 60 * 60 * 24)
      )
    )
  : 0;
  const validateForm = () => {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.checkIn ||
      !form.checkOut ||
      !form.cottageType
    ) {
      toast.error("Please enter/select all mandatory fields");
      return false;
    }

    // 🔥 FIX date issue
    const start = new Date(form.checkIn);
    const end = new Date(form.checkOut);

   if (end < start) {
  toast.error("Check-out cannot be before check-in");
  return false;
}

    return true;
  };

  const roomTotal = cottage.price * (nights > 0 ? nights : 0);
  const grandTotal = roomTotal; // GST already included

  const setField = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  // Fixed WhatsApp function with better emoji support
  const openWhatsApp = () => {
    if (!validateForm()) return;
    const checkInDate = form.checkIn
      ? new Date(form.checkIn).toLocaleDateString("en-IN", {
          dateStyle: "long",
        })
      : "Not selected";

    const checkOutDate = form.checkOut
      ? new Date(form.checkOut).toLocaleDateString("en-IN", {
          dateStyle: "long",
        })
      : "Not selected";

    const message =
      `🌿 *New Booking Enquiry - Balu Resorts*\n\n` +
      `👤 *Guest Details:*\n` +
      `• Name: ${form.name || "Not provided"}\n` +
      `• Phone: ${form.phone || "Not provided"}\n` +
      `• Email: ${form.email || "Not provided"}\n\n` +
      `🏠 *Booking Details:*\n` +
      `• Cottage: ${form.cottageType}\n` +
      `• Check-in: ${checkInDate}\n` +
      `• Check-out: ${checkOutDate}\n` +
      `• Nights: ${nights || "Not calculated"}\n` +
      `• Guests: ${form.guests} persons\n\n` +
      `💰 *Price Summary:*\n` +
      `• Rate: ₹${cottage.price} per night\n` +
      `• Room Total: ₹${(cottage.price * (nights || 0)).toLocaleString()}\n` +
      `• *Total (Inclusive): ₹${grandTotal.toLocaleString()}*\n\n` +
      `${form.notes ? `📝 *Special Requests:*\n${form.notes}\n\n` : ""}` +
      `Kindly confirm my booking.\nThank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send?phone=919043210789&text=${encodedMessage}`,
      "_blank",
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay checkout failed to load. Please check your internet connection and try again.",
        );
      }

      const { data: booking } = await api.post("/bookings", {
        ...form,
        guests: Number(form.guests),
        amount: grandTotal,
      });

      const { data: order } = await api.post("/payment/create-order", {
        amount: grandTotal,
        bookingId: booking.id,
      });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Balu Resorts",
        description: `${form.cottageType} - ${nights} night${nights > 1 ? "s" : ""}`,
        order_id: order.orderId,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email,
        },
        theme: { color: "#22762a" },
        handler: async (response) => {
          try {
            const { data } = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking.id,
            });
            setSuccess(data.booking || { ...booking, amount: grandTotal });
          } catch (verifyError) {
            setError(
              verifyError.response?.data?.error ||
                "Payment verification failed. Please contact us.",
            );
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      razorpay.open();
    } catch (submitError) {
      setError(
        submitError.response?.data?.error ||
          submitError.message ||
          "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-forest-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-accent italic text-earth-300 text-lg mb-3"
          >
            Secure your retreat
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl mb-5"
          >
            Book Your Stay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-forest-300"
          >
            Fill in your details and pay securely via Razorpay. All fields are
            mandatory.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream leaf-pattern min-h-screen">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="glass-card p-10 max-w-xl mx-auto">
                  <SuccessScreen
                    booking={success}
                    onWhatsApp={() => openWhatsApp()}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Guest Details */}
                    <div className="glass-card p-7">
                      <h2 className="font-display text-2xl text-forest-900 mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-forest-600" /> Guest
                        Details
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="input-field"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setField("name", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="input-field"
                            placeholder="+91 XXXXX XXXXX"
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            required
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="input-field"
                            placeholder="your@email.com"
                            type="email"
                            value={form.email}
                            onChange={(e) => setField("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="glass-card p-7">
                      <h2 className="font-display text-2xl text-forest-900 mb-6 flex items-center gap-2">
                        <CalendarDays className="w-5 h-5 text-forest-600" />{" "}
                        Stay Details
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Check-in Date{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="input-field"
                            type="date"
                            value={form.checkIn}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) =>
                              setField("checkIn", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Check-out Date{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            className="input-field"
                            type="date"
                            value={form.checkOut}
                            min={
                              form.checkIn ||
                              new Date().toISOString().split("T")[0]
                            }
                            onChange={(e) =>
                              setField("checkOut", e.target.value)
                            }
                            required
                          />
                        </div>
                          <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Cottage Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="input-field"
                            value={form.cottageType}
                            onChange={(e) =>
                              setField("cottageType", e.target.value)
                            }
                            required
                          >
                            {cottageOptions.map((option) => (
                              <option key={option.name} value={option.name}>
                                {option.name} - ₹{option.price}/night (up to{" "}
                                {option.maxGuests} guests)
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Number of Guests{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="input-field"
                            value={form.guests}
                            onChange={(e) => setField("guests", e.target.value)}
                            required
                          >
                            {[...Array(cottage.maxGuests)].map((_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1} Guest{index > 0 ? "s" : ""}
                              </option>
                            ))}
                          </select>
                        </div>
                      
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-forest-700 mb-2">
                            Special Requests / Notes
                          </label>
                          <textarea
                            className="input-field"
                            rows={3}
                            placeholder="Any special requests (optional)"
                            value={form.notes}
                            onChange={(e) => setField("notes", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                        {error}
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  <div className="lg:col-span-1">
                    <div className="glass-card p-7 sticky top-24">
                      <h3 className="font-display text-xl text-forest-900 mb-6">
                        Price Summary
                      </h3>
                      <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between">
                          <span className="text-forest-600">
                            {cottage.name}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-forest-600">
                            ₹{cottage.price.toLocaleString()} × {nights || "-"}{" "}
                            night{nights > 1 ? "s" : ""}
                          </span>
                          <span className="text-forest-900 font-medium">
                            ₹{(cottage.price * (nights || 0)).toLocaleString()}
                          </span>
                        </div>

                        <div className="border-t border-forest-200 pt-3 flex justify-between font-semibold text-base">
                          <span className="text-forest-900">
                            Total (Inclusive)
                          </span>
                          <span className="text-forest-700 font-display text-xl">
                            ₹{roomTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading || !nights}
                        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                            Processing...
                          </>
                        ) : (
                          <>
                            Pay & Book <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <div className="mt-4 flex items-center gap-2 text-xs text-forest-500 justify-center">
                        Secured by Razorpay
                      </div>

                      <div className="mt-6 pt-5 border-t border-forest-100">
                        <p className="text-xs text-forest-500 mb-3 font-medium">
                          Or book via WhatsApp
                        </p>
                        <button
                          type="button"
                          onClick={openWhatsApp}
                          className="flex items-center justify-center gap-2 border border-green-300 text-green-700 hover:bg-green-50 px-4 py-3 rounded-full text-sm font-medium transition-colors w-full"
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          Book via WhatsApp
                        </button>
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
