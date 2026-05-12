// ============================================================
// All application context providers: Auth, Theme, Language
// ============================================================

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type User, type Language, type Theme, type ChatSession, type UploadedFile, type ActivityItem } from '../types';
import { translations } from '../utils/translations';

// ============================================================
// Theme Context
// ============================================================
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('ai-vision-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('ai-vision-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// ============================================================
// Language Context
// ============================================================
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ai-vision-lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ai-vision-lang', lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] || entry.en || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

// ============================================================
// Auth Context
// ============================================================
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ai-vision-user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulated authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('ai-vision-user', JSON.stringify(newUser));
    localStorage.setItem('ai-vision-token', 'jwt_' + Date.now());
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('ai-vision-user', JSON.stringify(newUser));
    localStorage.setItem('ai-vision-token', 'jwt_' + Date.now());
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ai-vision-user');
    localStorage.removeItem('ai-vision-token');
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('ai-vision-user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// ============================================================
// Data Context (uploads, chats, history)
// ============================================================
interface DataContextType {
  uploads: UploadedFile[];
  chatSessions: ChatSession[];
  activities: ActivityItem[];
  addUpload: (file: UploadedFile) => void;
  removeUpload: (id: string) => void;
  addChatSession: (session: ChatSession) => void;
  updateChatSession: (id: string, session: Partial<ChatSession>) => void;
  addActivity: (activity: ActivityItem) => void;
  clearHistory: () => void;
  stats: { totalUploads: number; totalChats: number; totalTranslations: number; totalAnalyses: number };
}

const DataContext = createContext<DataContextType>({
  uploads: [],
  chatSessions: [],
  activities: [],
  addUpload: () => {},
  removeUpload: () => {},
  addChatSession: () => {},
  updateChatSession: () => {},
  addActivity: () => {},
  clearHistory: () => {},
  stats: { totalUploads: 0, totalChats: 0, totalTranslations: 0, totalAnalyses: 0 },
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<UploadedFile[]>(() => {
    const saved = localStorage.getItem('ai-vision-uploads');
    return saved ? JSON.parse(saved) : [];
  });

  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('ai-vision-chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('ai-vision-activities');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ai-vision-uploads', JSON.stringify(uploads));
  }, [uploads]);

  useEffect(() => {
    localStorage.setItem('ai-vision-chats', JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem('ai-vision-activities', JSON.stringify(activities));
  }, [activities]);

  const addUpload = useCallback((file: UploadedFile) => {
    setUploads(prev => [file, ...prev]);
  }, []);

  const removeUpload = useCallback((id: string) => {
    setUploads(prev => prev.filter(f => f.id !== id));
  }, []);

  const addChatSession = useCallback((session: ChatSession) => {
    setChatSessions(prev => [session, ...prev]);
  }, []);

  const updateChatSession = useCallback((id: string, data: Partial<ChatSession>) => {
    setChatSessions(prev => prev.map(s => (s.id === id ? { ...s, ...data } : s)));
  }, []);

  const addActivity = useCallback((activity: ActivityItem) => {
    setActivities(prev => [activity, ...prev].slice(0, 50)); // Keep last 50
  }, []);

  const clearHistory = useCallback(() => {
    setActivities([]);
    localStorage.removeItem('ai-vision-activities');
  }, []);

  const stats = {
    totalUploads: uploads.length,
    totalChats: chatSessions.length,
    totalTranslations: activities.filter(a => a.type === 'translation').length,
    totalAnalyses: activities.filter(a => a.type === 'analysis').length,
  };

  return (
    <DataContext.Provider
      value={{
        uploads,
        chatSessions,
        activities,
        addUpload,
        removeUpload,
        addChatSession,
        updateChatSession,
        addActivity,
        clearHistory,
        stats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
