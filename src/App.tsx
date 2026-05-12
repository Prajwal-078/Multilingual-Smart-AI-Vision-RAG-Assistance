// ============================================================
// App.tsx - Main application entry point with routing
// Multilingual Smart AI Vision RAG Assistant
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, LanguageProvider, AuthProvider, DataProvider, useAuth } from './contexts/AppContexts';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import { LoginPage, RegisterPage } from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AIVision from './pages/AIVision';
import UploadCenter from './pages/UploadCenter';
import RAGChatbot from './pages/RAGChatbot';
import History from './pages/History';
import Profile from './pages/Profile';

// ============================================================
// Protected Route Component
// ============================================================
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// ============================================================
// Public Route - redirect to dashboard if authenticated
// ============================================================
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

// ============================================================
// App Routes
// ============================================================
function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/vision" element={<ProtectedRoute><AIVision /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadCenter /></ProtectedRoute>} />
        <Route path="/chatbot" element={<ProtectedRoute><RAGChatbot /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

// ============================================================
// Main App Component with all providers
// ============================================================
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <DataProvider>
              <AppRoutes />
            </DataProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
