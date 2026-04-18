import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/cottages', label: 'Cottages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const isHome = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-forest-900/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ${
            scrolled || !isHome ? 'bg-white shadow-md ring-1 ring-forest-100' : 'bg-white/15 backdrop-blur-sm ring-1 ring-white/20'
          }`}>
            <img src={logo} alt="Balu Resorts logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className={`font-display text-xl font-semibold leading-none block transition-colors duration-300 ${
              scrolled || !isHome ? 'text-forest-900' : 'text-white'
            }`}>Balu Resorts</span>
            <span className={`font-accent italic text-xs transition-colors duration-300 ${
              scrolled || !isHome ? 'text-forest-500' : 'text-white/80'
            }`}>Nature&apos;s comfort kolli&apos;s charm</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? scrolled || !isHome
                      ? 'bg-forest-100 text-forest-700'
                      : 'bg-white/20 text-white'
                    : scrolled || !isHome
                      ? 'text-forest-700 hover:bg-forest-50 hover:text-forest-900'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919043210789"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
              scrolled || !isHome ? 'text-forest-600' : 'text-white/80'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            +91 90432 10789
          </a>
          <Link to="/booking" className="btn-primary text-sm py-2.5 px-5">
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            scrolled || !isHome ? 'text-forest-800' : 'text-white'
          }`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-md border-t border-forest-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-3 rounded-xl text-forest-800 font-medium text-sm transition-colors hover:bg-forest-50 ${
                    location.pathname === to ? 'bg-forest-100 text-forest-700' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-2 pb-1 border-t border-forest-100 mt-1">
                <a href="tel:+919043210789" className="flex items-center gap-2 px-4 py-3 text-forest-600 text-sm font-medium">
                  <Phone className="w-4 h-4" /> +91 90432 10789
                </a>
                <Link to="/booking" className="btn-primary w-full justify-center mt-2">
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
