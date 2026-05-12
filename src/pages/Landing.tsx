// ============================================================
// Landing Page - Hero, Features, CTA sections
// ============================================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme, useLanguage } from '../contexts/AppContexts';
import {
  Brain, Eye, FileText, Globe, MessageSquare, Mic, Sparkles,
  ArrowRight, Upload, Shield, Zap, Languages, Camera, Search,
  Star, Users, FileCheck
} from 'lucide-react';

const features = [
  { icon: Eye, title: 'feature.vision', desc: 'Upload images and get instant AI-powered visual analysis with object detection and scene understanding.', color: 'from-blue-500 to-cyan-500' },
  { icon: FileText, title: 'feature.ocr', desc: 'Extract text from images and scanned documents with high-accuracy OCR technology.', color: 'from-green-500 to-emerald-500' },
  { icon: Globe, title: 'feature.translation', desc: 'Translate content seamlessly between English, Hindi, Kannada, and Telugu.', color: 'from-purple-500 to-pink-500' },
  { icon: Search, title: 'feature.rag', desc: 'Ask questions about your uploaded documents and get AI-powered answers with source references.', color: 'from-orange-500 to-red-500' },
  { icon: MessageSquare, title: 'feature.chatbot', desc: 'Chat with an intelligent AI assistant that understands context and provides helpful responses.', color: 'from-indigo-500 to-blue-500' },
  { icon: Mic, title: 'feature.voice', desc: 'Use voice commands for hands-free interaction and listen to AI responses with text-to-speech.', color: 'from-pink-500 to-rose-500' },
];

const stats = [
  { value: '99.2%', label: 'OCR Accuracy', icon: FileCheck },
  { value: '4', label: 'Languages', icon: Languages },
  { value: '50K+', label: 'Documents Processed', icon: Upload },
  { value: '10K+', label: 'Happy Users', icon: Users },
];

export default function Landing() {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen -m-4 lg:-m-6">
      {/* Hero Section */}
      <section className={`relative overflow-hidden ${isDark ? '' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        {isDark && <div className="absolute inset-0 animated-gradient" />}

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-32">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            >
              <Sparkles size={16} className="text-primary-400" />
              <span className="text-sm font-medium text-primary-400">
                Powered by Advanced AI
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">{t('landing.title').split(' ').slice(0, 3).join(' ')}</span>
              <br />
              <span className={isDark ? 'text-white' : 'text-gray-900'}>
                {t('landing.title').split(' ').slice(3).join(' ')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-lg sm:text-xl max-w-3xl mx-auto mb-10 ${isDark ? 'text-dark-200' : 'text-gray-600'}`}
            >
              {t('landing.subtitle')}. Powered by cutting-edge AI with support for English, Hindi, Kannada & Telugu.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/register"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/30 transition-all hover:-translate-y-0.5"
              >
                {t('landing.getStarted')}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border-2 transition-all hover:-translate-y-0.5 ${
                  isDark
                    ? 'border-dark-400 text-white hover:border-primary-500 hover:bg-primary-500/10'
                    : 'border-gray-300 text-gray-700 hover:border-primary-500 hover:bg-primary-50'
                }`}
              >
                <Shield size={20} />
                {t('nav.login')}
              </Link>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-16 max-w-5xl mx-auto"
            >
              <div className={`relative rounded-2xl overflow-hidden border shadow-2xl ${
                isDark
                  ? 'border-dark-500 shadow-primary-500/10 bg-dark-800'
                  : 'border-gray-200 shadow-gray-200/50 bg-white'
              }`}>
                {/* Simulated dashboard preview */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className={`ml-3 text-sm ${isDark ? 'text-dark-300' : 'text-gray-400'}`}>
                      AI Vision RAG Assistant
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* AI Analysis Card */}
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Camera size={18} className="text-primary-400" />
                        <span className="text-sm font-semibold">Vision Analysis</span>
                      </div>
                      <div className={`h-24 rounded-lg ${isDark ? 'bg-dark-600' : 'bg-gray-200'} flex items-center justify-center`}>
                        <Eye size={32} className="text-primary-300 opacity-50" />
                      </div>
                      <div className="mt-2 flex gap-1">
                        {[95, 88, 76].map((val, i) => (
                          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-dark-600">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${val}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chat Card */}
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <MessageSquare size={18} className="text-accent-400" />
                        <span className="text-sm font-semibold">AI Chatbot</span>
                      </div>
                      <div className="space-y-2">
                        <div className={`p-2 rounded-lg text-xs ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                          What does the report say about Q3?
                        </div>
                        <div className="p-2 rounded-lg text-xs bg-primary-500/20 text-primary-300">
                          Revenue grew 24% in Q3...
                        </div>
                        <div className={`p-2 rounded-lg text-xs ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                          Translate to Hindi
                        </div>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Zap size={18} className="text-yellow-400" />
                        <span className="text-sm font-semibold">Processing</span>
                      </div>
                      <div className="space-y-3">
                        {['OCR Extraction', 'RAG Indexing', 'Translation'].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{item}</span>
                              <span className="text-green-400">✓</span>
                            </div>
                            <div className={`h-1.5 rounded-full ${isDark ? 'bg-dark-600' : 'bg-gray-200'}`}>
                              <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 w-full" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary-500/10 mb-3">
                  <stat.icon size={24} className="text-primary-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Powerful AI Features</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
              Everything you need for intelligent document processing, analysis, and multilingual communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border transition-all cursor-default ${
                  isDark
                    ? 'bg-dark-800 border-dark-600 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5'
                    : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t(feature.title)}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-dark-300' : 'text-gray-600'}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className={`py-20 ${isDark ? 'bg-dark-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Speak Your Language</span>
            </h2>
            <p className={`text-lg ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
              Full support for 4 major languages with real-time translation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { lang: 'English', native: 'English', emoji: '🇺🇸', script: 'Hello World' },
              { lang: 'Hindi', native: 'हिन्दी', emoji: '🇮🇳', script: 'नमस्ते दुनिया' },
              { lang: 'Kannada', native: 'ಕನ್ನಡ', emoji: '🇮🇳', script: 'ಹಲೋ ವಿಶ್ವ' },
              { lang: 'Telugu', native: 'తెలుగు', emoji: '🇮🇳', script: 'హలో ప్రపంచం' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-5 rounded-2xl border text-center transition-all ${
                  isDark
                    ? 'bg-dark-700 border-dark-500 hover:border-primary-500/30'
                    : 'bg-gray-50 border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-bold text-lg mb-1">{item.native}</div>
                <div className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>{item.lang}</div>
                <div className={`text-xs mt-2 ${isDark ? 'text-primary-300' : 'text-primary-600'}`}>{item.script}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 rounded-2xl bg-primary-500/10 mb-6">
              <Brain size={40} className="text-primary-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
              Join thousands of users leveraging AI for document intelligence, vision analysis, and multilingual communication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-primary-500/30 transition-all"
              >
                <Sparkles size={20} />
                {t('landing.getStarted')}
              </Link>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                <span className={`ml-2 text-sm ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
                  Rated 4.9/5
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Brain size={20} className="text-primary-400" />
              <span className="font-semibold gradient-text">AI Vision RAG Assistant</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
              © 2024 AI Vision RAG. Built with React, Tailwind & AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
