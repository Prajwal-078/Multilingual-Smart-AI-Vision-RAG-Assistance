// ============================================================
// Profile Page - User settings, stats, preferences
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, useLanguage, useAuth, useData } from '../contexts/AppContexts';
import type { Language } from '../types';
import { languageNames } from '../utils/translations';
import {
  User, Mail, Calendar, Edit3, Save, X, Shield, Globe,
  Sun, Moon, Upload, MessageSquare, Eye, Languages,
  BarChart3, Bell, Lock, Sparkles
} from 'lucide-react';

export default function Profile() {
  const { isDark, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { user, updateProfile } = useAuth();
  const { stats } = useData();

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  const handleSave = () => {
    updateProfile({ name: editName, email: editEmail });
    setEditing(false);
  };

  const cardClass = `rounded-2xl border ${isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'}`;

  const statItems = [
    { icon: Upload, label: t('dashboard.uploads'), value: stats.totalUploads, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: MessageSquare, label: t('dashboard.chats'), value: stats.totalChats, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Languages, label: t('dashboard.translations'), value: stats.totalTranslations, color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: Eye, label: t('dashboard.analyses'), value: stats.totalAnalyses, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
            <User size={24} className="text-white" />
          </div>
          {t('profile.title')}
        </h1>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`${cardClass} overflow-hidden`}
      >
        {/* Cover gradient */}
        <div className="h-32 bg-gradient-to-r from-primary-500 via-accent-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Avatar & Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-white dark:border-dark-800">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              {editing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      isDark ? 'bg-dark-700 border-dark-500 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder={t('auth.name')}
                  />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${
                      isDark ? 'bg-dark-700 border-dark-500 text-white' : 'bg-white border-gray-300'
                    }`}
                    placeholder={t('auth.email')}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                  <p className={`text-sm flex items-center gap-1 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                    <Mail size={14} />
                    {user?.email || 'user@example.com'}
                  </p>
                </>
              )}
            </div>
            <div>
              {editing ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-medium"
                  >
                    <Save size={14} />
                    {t('common.save')}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className={`p-2 rounded-lg ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditing(true); setEditName(user?.name || ''); setEditEmail(user?.email || ''); }}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary-500/10 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-colors"
                >
                  <Edit3 size={14} />
                  {t('profile.edit')}
                </button>
              )}
            </div>
          </div>

          {/* Member since */}
          <div className={`mt-4 flex items-center gap-4 text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
            </span>
            <span className="flex items-center gap-1">
              <Shield size={14} className="text-green-400" />
              Verified Account
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-primary-400" />
          {t('profile.stats')}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`${cardClass} p-5 text-center`}
            >
              <div className={`inline-flex p-2.5 rounded-xl ${item.bg} mb-3`}>
                <item.icon size={20} className={item.color} />
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>{item.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={cardClass}
      >
        <div className={`px-6 py-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
          <h2 className="font-semibold flex items-center gap-2">
            <Sparkles size={18} className="text-primary-400" />
            {t('common.settings')}
          </h2>
        </div>

        <div className={`divide-y ${isDark ? 'divide-dark-600' : 'divide-gray-100'}`}>
          {/* Theme */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-yellow-500" />}
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  {isDark ? t('common.darkMode') : t('common.lightMode')}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDark ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                isDark ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-green-400" />
              <div>
                <p className="text-sm font-medium">{t('common.language')}</p>
                <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  Select your preferred language
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as Language)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                isDark ? 'bg-dark-700 border-dark-500 text-white' : 'bg-white border-gray-300'
              }`}
            >
              {(Object.keys(languageNames) as Language[]).map(lang => (
                <option key={lang} value={lang}>{languageNames[lang].native} ({languageNames[lang].en})</option>
              ))}
            </select>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-orange-400" />
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  Email notifications for AI completions
                </p>
              </div>
            </div>
            <div className="w-12 h-6 rounded-full bg-primary-500 relative cursor-pointer">
              <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white shadow" />
            </div>
          </div>

          {/* Security */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-red-400" />
              <div>
                <p className="text-sm font-medium">Security</p>
                <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  Two-factor authentication, password change
                </p>
              </div>
            </div>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
              isDark ? 'bg-dark-600 hover:bg-dark-500' : 'bg-gray-100 hover:bg-gray-200'
            }`}>
              Manage
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
