import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cottages from './pages/Cottages';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBookings from './pages/admin/Bookings';
import AdminLayout from './pages/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seoByPath = {
      '/': {
        title: 'Balu Resorts | Nature Stay in Kolli Hills',
        description: 'Stay at Balu Resorts in Kolli Hills and enjoy scenic cottages, fresh mountain air, family-friendly comfort, and peaceful valley views.',
      },
      '/cottages': {
        title: 'Cottages at Balu Resorts | Kolli Hills',
        description: 'Explore cozy cottages and family stays at Balu Resorts in Kolli Hills with nature views, comfort, and flexible booking options.',
      },
      '/gallery': {
        title: 'Gallery | Balu Resorts Kolli Hills',
        description: 'View the gallery of Balu Resorts and discover the cottages, landscapes, viewpoints, and experiences that make Kolli Hills special.',
      },
      '/about': {
        title: 'About Balu Resorts | Kolli Hills Retreat',
        description: 'Learn about Balu Resorts, our hill-stay experience, and what makes our retreat in Kolli Hills a peaceful nature escape.',
      },
      '/booking': {
        title: 'Book Your Stay | Balu Resorts Kolli Hills',
        description: 'Reserve your cottage at Balu Resorts in Kolli Hills with secure booking, comfortable stays, and direct support from our team.',
      },
      '/contact': {
        title: 'Contact Balu Resorts | Kolli Hills',
        description: 'Contact Balu Resorts for bookings, directions, WhatsApp support, and location details in Kolli Hills, Tamil Nadu.',
      },
      '/admin/login': {
        title: 'Admin Login | Balu Resorts',
        description: 'Admin access for Balu Resorts booking management.',
      },
      '/admin': {
        title: 'Admin Dashboard | Balu Resorts',
        description: 'Admin dashboard for Balu Resorts operations.',
      },
      '/admin/bookings': {
        title: 'Admin Bookings | Balu Resorts',
        description: 'Booking management for Balu Resorts.',
      },
    };

    const currentSeo = seoByPath[location.pathname] || seoByPath['/'];

    document.title = currentSeo.title;

    const setMeta = (selector, attribute, value) => {
      const element = document.head.querySelector(selector);
      if (element) {
        element.setAttribute(attribute, value);
      }
    };

    setMeta('meta[name="description"]', 'content', currentSeo.description);
    setMeta('meta[property="og:title"]', 'content', currentSeo.title);
    setMeta('meta[property="og:description"]', 'content', currentSeo.description);
    setMeta('meta[name="twitter:title"]', 'content', currentSeo.title);
    setMeta('meta[name="twitter:description"]', 'content', currentSeo.description);
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <SeoManager />
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/cottages" element={<PublicLayout><Cottages /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
