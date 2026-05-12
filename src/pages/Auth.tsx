// ============================================================
// Login and Register Pages with animations
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme, useLanguage, useAuth } from '../contexts/AppContexts';
import {
  Brain, Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Sparkles
} from 'lucide-react';

// ============================================================
// Login Page
// ============================================================
export function LoginPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
    isDark
      ? 'bg-dark-700 border-dark-500 text-white placeholder-dark-300 focus:border-primary-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary-500'
  }`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 -m-4 lg:-m-6">
      {/* Background */}
      {isDark && <div className="fixed inset-0 animated-gradient -z-10" />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className={`p-8 rounded-3xl border shadow-2xl ${
          isDark
            ? 'bg-dark-800/80 border-dark-600 backdrop-blur-xl shadow-primary-500/5'
            : 'bg-white border-gray-200 shadow-gray-200/50'
        }`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-lg shadow-primary-500/25">
              <Brain size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('auth.login')}</h1>
            <p className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
              Welcome back to AI Vision RAG Assistant
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={18} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('auth.email')}
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <Lock size={18} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('auth.password')}
                className={`${inputClass} pr-11`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary-400 hover:text-primary-300">
                {t('auth.forgotPassword')}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
              {loading ? 'Signing in...' : t('auth.login')}
            </button>
          </form>

          {/* Demo login hint */}
          <div className={`mt-4 p-3 rounded-xl text-center text-xs ${isDark ? 'bg-dark-700 text-dark-300' : 'bg-gray-50 text-gray-500'}`}>
            <Sparkles size={14} className="inline mr-1 text-primary-400" />
            Enter any email & password to try the demo
          </div>

          {/* Register link */}
          <p className={`text-center mt-6 text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
              {t('nav.register')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// Register Page
// ============================================================
export function RegisterPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Please fill in all fields'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
    isDark
      ? 'bg-dark-700 border-dark-500 text-white placeholder-dark-300 focus:border-primary-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary-500'
  }`;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 -m-4 lg:-m-6">
      {isDark && <div className="fixed inset-0 animated-gradient -z-10" />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className={`p-8 rounded-3xl border shadow-2xl ${
          isDark
            ? 'bg-dark-800/80 border-dark-600 backdrop-blur-xl shadow-primary-500/5'
            : 'bg-white border-gray-200 shadow-gray-200/50'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-lg shadow-primary-500/25">
              <Brain size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('auth.register')}</h1>
            <p className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
              Create your AI Vision RAG account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={18} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`} />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t('auth.name')}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Mail size={18} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('auth.email')}
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <Lock size={18} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('auth.password')}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Lock size={18} className={`absolute left-3.5 top-3.5 ${isDark ? 'text-dark-300' : 'text-gray-400'}`} />
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {loading ? 'Creating account...' : t('auth.register')}
            </button>
          </form>

          <p className={`text-center mt-6 text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
              {t('nav.login')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
