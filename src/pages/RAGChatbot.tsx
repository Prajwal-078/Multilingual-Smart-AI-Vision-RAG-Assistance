// ============================================================
// RAG Chatbot Page - Document Q&A with AI
// ============================================================

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useLanguage, useData } from '../contexts/AppContexts';
import { ragChat, aiChat, speakText, stopSpeaking } from '../services/aiService';
import type { ChatMessage, ChatSession } from '../types';
import {
  MessageSquare, Send, Plus, Mic, MicOff, Volume2, VolumeX,
  Copy, Check, Bot, User, Loader2, Sparkles, FileText,
  ChevronLeft
} from 'lucide-react';

export default function RAGChatbot() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const { chatSessions, addChatSession, updateChatSession, uploads, addActivity } = useData();

  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [ragMode, setRagMode] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const buildRagContext = () => {
    return uploads
      .filter(file => file.status === 'completed')
      .map(file => {
        // RAG should index the uploaded document text only. Summary/analysis notes can pollute retrieval.
        const text = file.extractedText || '';

        const safeName = file.name.replace(/"/g, "'");
        return `<<DOC id="${file.id}" name="${safeName}" type="${file.type}">>\n${text}\n<<END_DOC>>`;
      })
      .join('\n\n');
  };

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create new chat
  const createNewChat = useCallback(() => {
    const session: ChatSession = {
      id: 'chat_' + Date.now(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: ragMode ? 'rag' : 'chat',
    };
    addChatSession(session);
    setCurrentSessionId(session.id);
    setMessages([]);
  }, [addChatSession, ragMode]);

  // Send message
  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // If no session, create one
    let sessionId = currentSessionId;
    if (!sessionId) {
      sessionId = 'chat_' + Date.now();
      const session: ChatSession = {
        id: sessionId,
        title: text.slice(0, 50),
        messages: [userMsg],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: ragMode ? 'rag' : 'chat',
      };
      addChatSession(session);
      setCurrentSessionId(sessionId);
    }

    try {
      // RAG mode must use uploaded file text only. It will not return random canned answers.
      const response = ragMode
        ? await ragChat(text, buildRagContext())
        : await aiChat(text);

      const aiMsg: ChatMessage = {
        id: 'msg_' + Date.now(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMsg]);

      // Update session
      if (sessionId) {
        updateChatSession(sessionId, {
          messages: [...messages, userMsg, aiMsg],
          updatedAt: new Date().toISOString(),
          title: messages.length === 0 ? text.slice(0, 50) : undefined,
        });
      }

      addActivity({
        id: Date.now().toString(),
        type: 'chat',
        title: ragMode ? 'RAG Chat' : 'AI Chat',
        description: text.slice(0, 100),
        timestamp: new Date().toISOString(),
        icon: '💬',
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Voice input
  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : language === 'te' ? 'te-IN' : 'en-US';
    setListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  // TTS
  const handleSpeak = (text: string) => {
    if (speaking) { stopSpeaking(); setSpeaking(false); return; }
    setSpeaking(true);
    speakText(text, language);
    setTimeout(() => setSpeaking(false), 15000);
  };

  // Copy
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/[#*_]/g, ''));
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  // Load session
  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
  };

  const cardClass = isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200';

  // Render message content (basic markdown)
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-base font-bold mt-3 mb-1">{line.replace('## ', '')}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold mt-2">{line.replace(/\*\*/g, '')}</p>;
      if (line.match(/^\d+\.\s\*\*/)) {
        const parts = line.replace(/^\d+\.\s/, '');
        return <li key={i} className="ml-4 text-sm leading-relaxed list-decimal">{parts.replace(/\*\*/g, '')}</li>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} className="ml-4 text-sm leading-relaxed list-disc">{line.replace(/^[-•]\s/, '').replace(/\*\*/g, '')}</li>;
      if (line.startsWith('📎')) return <p key={i} className={`text-xs mt-3 italic ${isDark ? 'text-primary-300' : 'text-primary-600'}`}>{line}</p>;
      if (line.trim() === '---') return <hr key={i} className={`my-2 ${isDark ? 'border-dark-600' : 'border-gray-200'}`} />;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-sm leading-relaxed">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-7rem)] flex gap-4">
      {/* Chat Sessions Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className={`hidden md:flex flex-col rounded-2xl border overflow-hidden shrink-0 ${cardClass}`}
          >
            <div className={`p-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
              <button
                onClick={createNewChat}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium text-sm hover:shadow-lg transition-all"
              >
                <Plus size={16} />
                {t('chat.newChat')}
              </button>
            </div>

            {/* Mode toggle */}
            <div className={`p-3 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
              <div className={`flex rounded-lg p-1 ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setRagMode(true)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                    ragMode ? 'bg-primary-500 text-white shadow' : ''
                  }`}
                >
                  📄 RAG Mode
                </button>
                <button
                  onClick={() => setRagMode(false)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                    !ragMode ? 'bg-primary-500 text-white shadow' : ''
                  }`}
                >
                  🤖 Chat Mode
                </button>
              </div>
            </div>

            {/* Sessions list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {chatSessions.length > 0 ? (
                chatSessions.map(session => (
                  <button
                    key={session.id}
                    onClick={() => loadSession(session)}
                    className={`w-full text-left p-3 rounded-xl text-sm transition-all ${
                      currentSessionId === session.id
                        ? 'bg-primary-500/10 text-primary-400'
                        : isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} />
                      <span className="truncate flex-1">{session.title}</span>
                    </div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </p>
                  </button>
                ))
              ) : (
                <div className={`p-4 text-center text-sm ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
                  No conversations yet
                </div>
              )}
            </div>

            {/* Doc count */}
            {uploads.length > 0 && (
              <div className={`p-3 border-t ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
                <div className={`flex items-center gap-2 p-2 rounded-lg text-xs ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                  <FileText size={14} className="text-green-400" />
                  <span>{uploads.length} document{uploads.length !== 1 ? 's' : ''} indexed</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col rounded-2xl border overflow-hidden ${cardClass}`}>
        {/* Chat header */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`hidden md:flex p-2 rounded-lg ${isDark ? 'hover:bg-dark-700' : 'hover:bg-gray-100'}`}
            >
              <ChevronLeft size={18} className={showSidebar ? '' : 'rotate-180'} />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">
                  {ragMode ? 'RAG Document Assistant' : 'AI Chatbot'}
                </h2>
                <p className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                  {ragMode ? `${uploads.length} documents loaded` : 'General AI assistant'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className={`text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>Online</span>
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 mb-4">
                <Sparkles size={40} className="text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {ragMode ? 'Ask about your documents' : 'Start a conversation'}
              </h3>
              <p className={`text-sm max-w-md ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                {ragMode
                  ? 'Upload documents in the Upload Center, then ask questions here. The AI will search through your files.'
                  : 'Chat with the AI assistant about anything. Try saying "Hello" or "Help"!'}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {(ragMode
                  ? ['What are the key findings?', 'Summarize the revenue data', 'Explain the project timeline', 'List all team members']
                  : ['Hello!', 'What can you do?', 'Help me get started', 'Tell me about RAG']
                ).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(suggestion); inputRef.current?.focus(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isDark
                        ? 'bg-dark-700 hover:bg-dark-600 text-dark-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mt-1">
                  <Bot size={16} className="text-white" />
                </div>
              )}

              <div className={`max-w-[80%] sm:max-w-[70%] ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl rounded-br-md'
                  : isDark
                  ? 'bg-dark-700 rounded-2xl rounded-bl-md'
                  : 'bg-gray-100 rounded-2xl rounded-bl-md'
              } p-4`}>
                {msg.role === 'user' ? (
                  <p className="text-sm">{msg.content}</p>
                ) : (
                  <div>{renderContent(msg.content)}</div>
                )}

                {/* Message actions */}
                {msg.role === 'assistant' && (
                  <div className={`flex items-center gap-1 mt-3 pt-2 border-t ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
                    <button
                      onClick={() => handleSpeak(msg.content)}
                      className={`p-1 rounded ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-200'}`}
                    >
                      {speaking ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} className="text-primary-400" />}
                    </button>
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      className={`p-1 rounded ${isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-200'}`}
                    >
                      {copied === msg.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                    <span className={`ml-auto text-xs ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center mt-1">
                  <User size={16} className="text-white" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${isDark ? 'bg-dark-700' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-primary-400" />
                  <span className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                    {t('chat.thinking')}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className={`p-4 border-t ${isDark ? 'border-dark-600' : 'border-gray-200'}`}>
          <div className={`flex items-end gap-2 p-2 rounded-xl border ${
            isDark ? 'bg-dark-700 border-dark-500' : 'bg-gray-50 border-gray-300'
          }`}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.placeholder')}
              rows={1}
              className={`flex-1 resize-none bg-transparent text-sm py-2 px-2 focus:outline-none ${
                isDark ? 'text-white placeholder-dark-400' : 'text-gray-900 placeholder-gray-400'
              }`}
              style={{ maxHeight: '120px' }}
            />
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleVoice}
                className={`p-2 rounded-lg transition-all ${
                  listening
                    ? 'bg-red-500/20 text-red-400'
                    : isDark ? 'hover:bg-dark-600' : 'hover:bg-gray-200'
                }`}
                title="Voice input"
              >
                {listening ? <MicOff size={18} /> : <Mic size={18} className="text-primary-400" />}
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white disabled:opacity-30 hover:shadow-lg transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          <p className={`text-xs mt-2 text-center ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
            {ragMode ? '📄 RAG mode: AI answers based on your uploaded documents' : '🤖 Chat mode: General AI assistant'}
          </p>
        </div>
      </div>
    </div>
  );
}
