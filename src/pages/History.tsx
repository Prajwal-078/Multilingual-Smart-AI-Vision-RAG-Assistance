// ============================================================
// History Page - Activity timeline with filters
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useLanguage, useData } from '../contexts/AppContexts';
import {
  Clock, Trash2, Search, Upload, MessageSquare,
  Globe, Eye, Calendar
} from 'lucide-react';

const typeConfig = {
  upload: { icon: Upload, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Upload' },
  chat: { icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Chat' },
  translation: { icon: Globe, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Translation' },
  analysis: { icon: Eye, color: 'text-orange-400', bg: 'bg-orange-500/10', label: 'Analysis' },
};

export default function History() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { activities, clearHistory } = useData();
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filtered = activities.filter(a => {
    const matchesType = filter === 'all' || a.type === filter;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const cardClass = `rounded-2xl border ${isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'}`;

  // Group by date
  const grouped: Record<string, typeof activities> = {};
  filtered.forEach(item => {
    const date = new Date(item.timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500">
            <Clock size={24} className="text-white" />
          </div>
          {t('history.title')}
        </h1>
        <p className={`mt-2 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
          View all your AI interactions and file activities
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'upload', 'chat', 'translation', 'analysis'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === type
                  ? 'bg-primary-500 text-white shadow'
                  : isDark
                  ? 'bg-dark-700 hover:bg-dark-600 text-dark-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {type === 'all' ? 'All' : (typeConfig as any)[type]?.label || type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search size={16} className={`absolute left-3 top-2.5 ${isDark ? 'text-dark-400' : 'text-gray-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('common.search')}
              className={`w-full sm:w-48 pl-9 pr-4 py-2 rounded-lg border text-sm ${
                isDark ? 'bg-dark-700 border-dark-500 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          {activities.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={14} />
              {t('history.clear')}
            </button>
          )}
        </div>
      </motion.div>

      {/* Clear confirmation */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`${cardClass} p-4 flex items-center justify-between`}
          >
            <p className="text-sm">Are you sure you want to clear all history?</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className={`px-3 py-1.5 rounded-lg text-xs ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => { clearHistory(); setShowClearConfirm(false); }}
                className="px-3 py-1.5 rounded-lg text-xs bg-red-500 text-white"
              >
                {t('common.delete')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline */}
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([date, items]) => (
          <motion.div key={date} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-primary-400" />
              <h3 className={`text-sm font-semibold ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>{date}</h3>
            </div>
            <div className={`${cardClass} overflow-hidden divide-y ${isDark ? 'divide-dark-600' : 'divide-gray-100'}`}>
              {items.map((item, i) => {
                const config = typeConfig[item.type as keyof typeof typeConfig];
                const Icon = config?.icon || Clock;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-start gap-4 p-4 ${isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <div className={`shrink-0 p-2 rounded-xl ${config?.bg || 'bg-gray-100'}`}>
                      <Icon size={18} className={config?.color || 'text-gray-400'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{item.title}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${config?.bg} ${config?.color}`}>
                          {config?.label}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                        {item.description}
                      </p>
                    </div>
                    <span className={`shrink-0 text-xs ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardClass} p-12 text-center`}>
          <Clock size={48} className={`mx-auto mb-4 ${isDark ? 'text-dark-400' : 'text-gray-300'}`} />
          <p className={`font-medium ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
            {searchQuery || filter !== 'all' ? 'No matching activities found' : t('common.noData')}
          </p>
          <p className={`text-sm mt-1 ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
            Your AI interactions will appear here
          </p>
        </motion.div>
      )}
    </div>
  );
}
