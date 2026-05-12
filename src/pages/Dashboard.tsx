// ============================================================
// Dashboard Page - Stats, quick actions, recent activity
// ============================================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme, useLanguage, useAuth, useData } from '../contexts/AppContexts';
import {
  Upload, MessageSquare, Eye, Languages, TrendingUp,
  ArrowRight, Clock, Sparkles, Brain, Zap, BarChart3
} from 'lucide-react';

const quickActions = [
  { path: '/vision', icon: Eye, label: 'AI Vision Analysis', desc: 'Analyze images with AI', color: 'from-blue-500 to-cyan-500' },
  { path: '/upload', icon: Upload, label: 'Upload Documents', desc: 'PDF, Images, Docs', color: 'from-green-500 to-emerald-500' },
  { path: '/chatbot', icon: MessageSquare, label: 'RAG Chatbot', desc: 'Ask about your files', color: 'from-purple-500 to-pink-500' },
  { path: '/vision', icon: Languages, label: 'Translate Text', desc: 'Multi-language support', color: 'from-orange-500 to-red-500' },
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { stats, activities } = useData();

  const cardClass = `p-6 rounded-2xl border transition-all ${
    isDark
      ? 'bg-dark-800 border-dark-600 hover:border-dark-500'
      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
  }`;

  const statCards = [
    { label: t('dashboard.uploads'), value: stats.totalUploads, icon: Upload, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: t('dashboard.chats'), value: stats.totalChats, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: t('dashboard.translations'), value: stats.totalTranslations, icon: Languages, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: t('dashboard.analyses'), value: stats.totalAnalyses, icon: BarChart3, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ];

  const recentItems = activities.length > 0
    ? activities.slice(0, 5)
    : [
        { id: '1', type: 'upload' as const, title: 'Sample Document Uploaded', description: 'annual_report.pdf processed successfully', timestamp: new Date().toISOString(), icon: '📄' },
        { id: '2', type: 'analysis' as const, title: 'Image Analyzed', description: 'AI vision analysis completed', timestamp: new Date(Date.now() - 3600000).toISOString(), icon: '🔍' },
        { id: '3', type: 'chat' as const, title: 'RAG Chat Session', description: 'Asked 5 questions about documents', timestamp: new Date(Date.now() - 7200000).toISOString(), icon: '💬' },
        { id: '4', type: 'translation' as const, title: 'Text Translated', description: 'English → Hindi translation', timestamp: new Date(Date.now() - 10800000).toISOString(), icon: '🌐' },
      ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden ${
          isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-500/25">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {t('dashboard.welcome')}, <span className="gradient-text">{user?.name || 'User'}</span>!
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  Here's your AI workspace overview for today
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Brain size={20} className="text-primary-400" />
            <span className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
              AI Systems Active
            </span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cardClass}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
            <div className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" />
              {t('dashboard.quickActions')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} to={action.path}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className={`${cardClass} group cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}>
                        <action.icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1 flex items-center gap-2">
                          {action.label}
                          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                          {action.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock size={20} className="text-primary-400" />
            {t('dashboard.recent')}
          </h2>
          <div className={`${cardClass} space-y-0 p-0 overflow-hidden`}>
            {recentItems.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-4 ${
                  i < recentItems.length - 1
                    ? isDark ? 'border-b border-dark-600' : 'border-b border-gray-100'
                    : ''
                }`}
              >
                <div className="text-xl mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Capabilities Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-6 rounded-2xl border relative overflow-hidden ${
          isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-accent-400" />
            <h2 className="text-lg font-semibold">AI Capabilities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: '👁️', label: 'Vision' },
              { icon: '📝', label: 'OCR' },
              { icon: '🤖', label: 'Chatbot' },
              { icon: '🌐', label: 'Translation' },
              { icon: '📄', label: 'RAG Q&A' },
              { icon: '🎤', label: 'Voice I/O' },
            ].map((cap, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 p-3 rounded-xl ${
                  isDark ? 'bg-dark-700' : 'bg-gray-50'
                }`}
              >
                <span className="text-lg">{cap.icon}</span>
                <span className="text-sm font-medium">{cap.label}</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-green-400" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
