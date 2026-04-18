import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarCheck,
  LogOut,
  Menu,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import logo from '../../assets/logo.png';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('balu_user') || '{}');

  const logout = () => {
    localStorage.removeItem('balu_token');
    localStorage.removeItem('balu_user');
    navigate('/admin/login');
  };

  const isActive = (item) => item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full bg-forest-900 ${mobile ? 'w-72' : 'w-64'}`}>
      <div className="p-6 border-b border-forest-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl overflow-hidden flex items-center justify-center shadow-lg shadow-black/20">
            <img src={logo} alt="Balu Resorts logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-display text-lg leading-none">Balu Resorts</p>
            <p className="text-forest-400 text-xs">Nature&apos;s comfort kolli&apos;s charm</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = isActive({ to, exact: to === '/admin' });
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-forest-700 text-white'
                  : 'text-forest-300 hover:bg-forest-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-earth-300' : 'text-forest-500 group-hover:text-forest-300'}`} />
              {label}
              {active && <ChevronRight className="w-4 h-4 ml-auto text-forest-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-forest-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-earth-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.username}</p>
            <p className="text-forest-400 text-xs capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-forest-400 hover:text-red-400 hover:bg-forest-800 rounded-xl text-sm transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-mist overflow-hidden">
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-forest-100 px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-forest-600 hover:bg-forest-50 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-xl text-forest-900">
              {navItems.find(n => isActive({ to: n.to, exact: n.to === '/admin' }))?.label || 'Admin'}
            </h1>
          </div>
          <Link to="/" target="_blank" className="inline-flex items-center gap-2 text-forest-500 hover:text-forest-700 text-sm transition-colors">
            View Website <ExternalLink className="w-4 h-4" />
          </Link>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
