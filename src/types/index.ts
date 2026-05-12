// ============================================================
// Type definitions for the AI Vision RAG Assistant
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  attachments?: FileAttachment[];
  language?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  type: 'chat' | 'vision' | 'rag' | 'translation';
}

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  preview?: string;
  extractedText?: string;
  uploadedAt: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  size: number;
  url: string;
  preview?: string;
  extractedText?: string;
  aiAnalysis?: string;
  summary?: string;
  uploadedAt: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

export interface DashboardStats {
  totalUploads: number;
  totalChats: number;
  totalTranslations: number;
  totalAnalyses: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'upload' | 'chat' | 'translation' | 'analysis';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export type Language = 'en' | 'hi' | 'kn' | 'te';

export interface TranslationMap {
  [key: string]: {
    en: string;
    hi: string;
    kn: string;
    te: string;
  };
}

export type Theme = 'dark' | 'light';
