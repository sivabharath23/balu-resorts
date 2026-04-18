import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import api from '../../utils/api';
import logo from '../../assets/logo.png';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('balu_token', data.token);
      localStorage.setItem('balu_user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-forest-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-earth-700/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="glass-dark p-10 rounded-3xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-white rounded-3xl overflow-hidden flex items-center justify-center mx-auto mb-4 shadow-xl shadow-black/20">
              <img src={logo} alt="Balu Resorts logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-display text-3xl text-white mb-1">Admin Portal</h1>
            <p className="text-forest-400 text-sm">Nature&apos;s comfort kolli&apos;s charm</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-forest-300 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full px-4 py-3 bg-forest-800/80 border border-forest-700 rounded-xl text-white placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-forest-300 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-3 bg-forest-800/80 border border-forest-700 rounded-xl text-white placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-200 transition-colors">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/40 border border-red-700/50 text-red-300 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-600 hover:bg-forest-500 text-white font-medium py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing in...</> : <><LogIn className="w-5 h-5" /> Sign In</>}
            </button>
          </form>

          <p className="text-center text-forest-500 text-xs mt-6">
            Default: admin / admin@balu123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
