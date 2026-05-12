// ============================================================
// AI Vision Page - Image upload, analysis, OCR, translation
// ============================================================

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useLanguage, useData } from '../contexts/AppContexts';
import { analyzeImage, extractTextOCR, translateText, summarizeText, speakText, stopSpeaking } from '../services/aiService';
import type { Language } from '../types';
import { languageNames } from '../utils/translations';
import {
  Eye, Camera, Loader2, FileText, Globe, Sparkles,
  Volume2, VolumeX, Copy, Check, Image as ImageIcon, Trash2, Mic, MicOff
} from 'lucide-react';

export default function AIVision() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const { addActivity } = useData();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [targetLang, setTargetLang] = useState<Language>('hi');
  const [dragOver, setDragOver] = useState(false);
  const [listening, setListening] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setAnalysis('');
      setOcrText('');
      setTranslatedText('');
      setSummary('');
    };
    reader.readAsDataURL(file);
  }, []);

  // Drag and drop handlers
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  // AI Analysis
  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setLoading('analyze');
    try {
      const result = await analyzeImage(imagePreview);
      setAnalysis(result);
      addActivity({ id: Date.now().toString(), type: 'analysis', title: 'Image Analyzed', description: 'AI vision analysis completed', timestamp: new Date().toISOString(), icon: '👁️' });
    } finally {
      setLoading(null);
    }
  };

  // OCR
  const handleOCR = async () => {
    if (!imagePreview) return;
    setLoading('ocr');
    try {
      const result = await extractTextOCR(imagePreview);
      setOcrText(result);
      addActivity({ id: Date.now().toString(), type: 'analysis', title: 'OCR Extraction', description: 'Text extracted from image', timestamp: new Date().toISOString(), icon: '📝' });
    } finally {
      setLoading(null);
    }
  };

  // Translate
  const handleTranslate = async () => {
    const textToTranslate = ocrText || analysis;
    if (!textToTranslate) return;
    setLoading('translate');
    try {
      const result = await translateText(textToTranslate, targetLang);
      setTranslatedText(result);
      addActivity({ id: Date.now().toString(), type: 'translation', title: 'Text Translated', description: `Translated to ${languageNames[targetLang].en}`, timestamp: new Date().toISOString(), icon: '🌐' });
    } finally {
      setLoading(null);
    }
  };

  // Summarize
  const handleSummarize = async () => {
    const textToSummarize = ocrText || analysis;
    if (!textToSummarize) return;
    setLoading('summarize');
    try {
      const result = await summarizeText(textToSummarize);
      setSummary(result);
      addActivity({ id: Date.now().toString(), type: 'analysis', title: 'Summary Generated', description: 'AI summary created', timestamp: new Date().toISOString(), icon: '📋' });
    } finally {
      setLoading(null);
    }
  };

  // Copy text
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text.replace(/[#*_]/g, ''));
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  // TTS
  const handleSpeak = (text: string) => {
    if (speaking) { stopSpeaking(); setSpeaking(false); return; }
    setSpeaking(true);
    speakText(text, language);
    setTimeout(() => setSpeaking(false), 10000);
  };

  // Voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : language === 'te' ? 'te-IN' : 'en-US';
    recognition.continuous = false;
    setListening(true);
    recognition.onresult = () => {
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const cardClass = `rounded-2xl border ${isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'}`;

  // Render markdown-like text
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold mt-4 mb-2">{line.replace('## ', '')}</h2>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</p>;
      if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} className="ml-4 text-sm leading-relaxed">{line.replace(/^[-•]\s/, '')}</li>;
      if (line.startsWith('*') && line.endsWith('*')) return <p key={i} className={`text-xs italic mt-2 ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>{line.replace(/\*/g, '')}</p>;
      if (line.trim() === '---') return <hr key={i} className={`my-3 ${isDark ? 'border-dark-600' : 'border-gray-200'}`} />;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-sm leading-relaxed">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <Eye size={24} className="text-white" />
          </div>
          {t('vision.title')}
        </h1>
        <p className={`mt-2 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
          {t('vision.upload')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Image Upload */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className={cardClass}>
            {/* Upload zone */}
            {!imagePreview ? (
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`m-4 p-12 rounded-xl border-2 border-dashed cursor-pointer transition-all text-center ${
                  dragOver
                    ? 'border-primary-400 bg-primary-500/10'
                    : isDark
                    ? 'border-dark-500 hover:border-primary-500/50 hover:bg-dark-700'
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary-500/10 mb-4">
                  <Camera size={32} className="text-primary-400" />
                </div>
                <p className="font-semibold mb-1">{t('upload.dragDrop')}</p>
                <p className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  or click to browse • JPG, PNG, WEBP
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="p-4">
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    className="w-full rounded-xl max-h-80 object-contain bg-black/10"
                  />
                  <button
                    onClick={() => { setImagePreview(null); setAnalysis(''); setOcrText(''); setTranslatedText(''); setSummary(''); }}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {imagePreview && (
              <div className={`p-4 border-t ${isDark ? 'border-dark-600' : 'border-gray-200'} space-y-3`}>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAnalyze}
                    disabled={!!loading}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading === 'analyze' ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                    {t('vision.analyze')}
                  </button>
                  <button
                    onClick={handleOCR}
                    disabled={!!loading}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium text-sm hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading === 'ocr' ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                    {t('vision.extractText')}
                  </button>
                </div>

                {/* Translation & Summary buttons */}
                {(analysis || ocrText) && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <select
                        value={targetLang}
                        onChange={e => setTargetLang(e.target.value as Language)}
                        className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                          isDark ? 'bg-dark-700 border-dark-500 text-white' : 'bg-gray-50 border-gray-300'
                        }`}
                      >
                        {(Object.keys(languageNames) as Language[]).map(lang => (
                          <option key={lang} value={lang}>{languageNames[lang].native}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleTranslate}
                        disabled={!!loading}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium disabled:opacity-50"
                      >
                        {loading === 'translate' ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                      </button>
                    </div>
                    <button
                      onClick={handleSummarize}
                      disabled={!!loading}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium disabled:opacity-50"
                    >
                      {loading === 'summarize' ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      {t('vision.summarize')}
                    </button>
                  </div>
                )}

                {/* Voice controls */}
                <div className="flex gap-2">
                  <button
                    onClick={handleVoiceInput}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
                      listening
                        ? 'border-red-500 bg-red-500/10 text-red-400'
                        : isDark ? 'border-dark-500 hover:bg-dark-700' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {listening ? <MicOff size={16} /> : <Mic size={16} />}
                    {listening ? 'Listening...' : 'Voice Input'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Results */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
          {/* Loading state */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${cardClass} p-6 flex items-center gap-4`}
              >
                <div className="relative">
                  <Loader2 size={24} className="text-primary-400 animate-spin" />
                </div>
                <div>
                  <p className="font-medium">Processing...</p>
                  <p className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                    {loading === 'analyze' ? 'Running AI vision analysis...' :
                     loading === 'ocr' ? 'Extracting text with OCR...' :
                     loading === 'translate' ? 'Translating text...' :
                     'Generating summary...'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis Result */}
          {analysis && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-blue-400" />
                  <span className="font-semibold text-sm">Vision Analysis</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleSpeak(analysis)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                    {speaking ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-primary-400" />}
                  </button>
                  <button onClick={() => handleCopy(analysis, 'analysis')} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                    {copied === 'analysis' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">{renderText(analysis)}</div>
            </motion.div>
          )}

          {/* OCR Result */}
          {ocrText && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-green-400" />
                  <span className="font-semibold text-sm">OCR Text</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleSpeak(ocrText)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                    {speaking ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-primary-400" />}
                  </button>
                  <button onClick={() => handleCopy(ocrText, 'ocr')} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                    {copied === 'ocr' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">{renderText(ocrText)}</div>
            </motion.div>
          )}

          {/* Translation Result */}
          {translatedText && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-purple-400" />
                  <span className="font-semibold text-sm">Translation ({languageNames[targetLang].native})</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleSpeak(translatedText)} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                    <Volume2 size={16} className="text-primary-400" />
                  </button>
                  <button onClick={() => handleCopy(translatedText, 'translation')} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                    {copied === 'translation' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">{renderText(translatedText)}</div>
            </motion.div>
          )}

          {/* Summary Result */}
          {summary && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-orange-400" />
                  <span className="font-semibold text-sm">AI Summary</span>
                </div>
                <button onClick={() => handleCopy(summary, 'summary')} className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-100'}`}>
                  {copied === 'summary' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">{renderText(summary)}</div>
            </motion.div>
          )}

          {/* Empty state */}
          {!analysis && !ocrText && !translatedText && !summary && !loading && (
            <div className={`${cardClass} p-12 text-center`}>
              <ImageIcon size={48} className={`mx-auto mb-4 ${isDark ? 'text-dark-400' : 'text-gray-300'}`} />
              <p className={`font-medium mb-1 ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
                Upload an image to get started
              </p>
              <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
                AI analysis results will appear here
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
