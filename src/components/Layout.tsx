// ============================================================
// Main Layout Component with Navbar and Sidebar
// ============================================================

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useLanguage, useAuth } from '../contexts/AppContexts';
import { languageNames } from '../utils/translations';
import type { Language } from '../types';
import {
  Brain, LayoutDashboard, Eye, Upload, MessageSquare, Clock,
  User, LogOut, Menu, X, Sun, Moon, Globe, ChevronDown,
  Sparkles, Shield
} from 'lucide-react';

// Navigation items for authenticated users
const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { path: '/vision', icon: Eye, labelKey: 'nav.vision' },
  { path: '/upload', icon: Upload, labelKey: 'nav.upload' },
  { path: '/chatbot', icon: MessageSquare, labelKey: 'nav.chatbot' },
  { path: '/history', icon: Clock, labelKey: 'nav.history' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const bgClass = isDark ? 'bg-dark-900 text-white' : 'bg-gray-50 text-gray-900';
  const navBg = isDark ? 'bg-dark-800/90 border-dark-600' : 'bg-white/90 border-gray-200';
  const sidebarBg = isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b backdrop-blur-xl`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Left: Logo + Menu toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-primary-500/10 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Brain size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">
                <span className="gradient-text">AI Vision</span>
                <span className={`ml-1 ${isDark ? 'text-dark-100' : 'text-gray-500'}`}>RAG</span>
              </span>
            </Link>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'
                }`}
              >
                <Globe size={16} className="text-primary-400" />
                <span className="hidden sm:inline">{languageNames[language].native}</span>
                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {langDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                      isDark ? 'bg-dark-700 border-dark-500' : 'bg-white border-gray-200'
                    }`}
                  >
                    {(Object.keys(languageNames) as Language[]).map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangDropdown(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                          language === lang
                            ? 'bg-primary-500/10 text-primary-400'
                            : isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span>{languageNames[lang].native}</span>
                        <span className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-400'}`}>
                          {languageNames[lang].en}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-dark-600 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={isDark ? t('common.lightMode') : t('common.darkMode')}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth buttons or user menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-2">
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-dark-100' : 'text-gray-700'}`}>
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark ? 'text-dark-100 hover:bg-dark-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for authenticated users */}
      {isAuthenticated && (
        <>
          {/* Desktop Sidebar */}
          <aside className={`hidden lg:flex fixed left-0 top-16 bottom-0 w-64 ${sidebarBg} border-r flex-col z-40`}>
            <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 text-primary-400 shadow-sm'
                        : isDark
                        ? 'text-dark-200 hover:bg-dark-600 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-primary-400' : ''} />
                    {t(item.labelKey)}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Sidebar footer */}
            <div className={`p-4 border-t ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-accent-400" />
                  <span className="text-sm font-semibold">AI Powered</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  Vision • OCR • RAG • Translation
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Shield size={12} className="text-green-400" />
                  <span className="text-xs text-green-400">Secure & Private</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.aside
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className={`lg:hidden fixed left-0 top-16 bottom-0 w-72 ${sidebarBg} border-r z-50 flex flex-col`}
                >
                  <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {navItems.map(item => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 text-primary-400'
                              : isDark
                              ? 'text-dark-200 hover:bg-dark-600'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <item.icon size={20} />
                          {t(item.labelKey)}
                        </Link>
                      );
                    })}
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Main Content Area */}
      <main className={`pt-16 min-h-screen ${isAuthenticated ? 'lg:pl-64' : ''}`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* Click outside to close lang dropdown */}
      {langDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setLangDropdown(false)} />
      )}
    </div>
  );
}
