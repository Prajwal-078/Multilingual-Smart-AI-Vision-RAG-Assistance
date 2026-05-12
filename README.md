# 🧠 Multilingual Smart AI Vision RAG Assistant

A comprehensive, full-featured AI-powered web application for document analysis, image processing, multilingual translation, and intelligent Q&A — built with React, Vite, Tailwind CSS, and simulated AI services.

![AI Vision RAG](https://img.shields.io/badge/AI-Vision%20RAG-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-blue?style=for-the-badge&logo=tailwindcss)

---

## 🌟 Features

### Core AI Features
- 👁️ **AI Vision Analysis** — Upload images for instant AI-powered visual analysis
- 📝 **OCR Text Detection** — Extract text from images and scanned documents
- 🌐 **Multilingual Translation** — Translate between English, Hindi, Kannada & Telugu
- 🤖 **RAG Chatbot** — Ask questions about your uploaded documents
- 📋 **AI Summarization** — Generate concise summaries of content
- 🎤 **Voice Input** — Speak to interact with the AI using Web Speech API
- 🔊 **Text-to-Speech** — Listen to AI responses in your preferred language

### Application Features
- 🔐 **JWT Authentication** — Login/Register with protected routes
- 📤 **Drag & Drop Upload** — Upload PDFs and images with drag & drop
- 📊 **Dashboard** — Overview with stats, quick actions, recent activity
- 📜 **Activity History** — Timeline of all AI interactions with filters
- 👤 **User Profile** — Profile management with settings
- 🌙 **Dark/Light Mode** — Toggle between themes with smooth transitions
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🎨 **Modern UI** — Glass morphism, gradients, smooth animations

### Supported Languages
| Language | Native | Code |
|----------|--------|------|
| English  | English | `en` |
| Hindi    | हिन्दी  | `hi` |
| Kannada  | ಕನ್ನಡ   | `kn` |
| Telugu   | తెలుగు  | `te` |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (React)                  │
│  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐  │
│  │ Landing  │ │Dashboard │ │Vision  │ │ Chatbot  │  │
│  │  Page    │ │   Page   │ │ Page   │ │  Page    │  │
│  └────┬─────┘ └────┬─────┘ └───┬────┘ └────┬─────┘  │
│       └─────────────┼──────────┼────────────┘        │
│                     ▼          ▼                     │
│  ┌─────────────────────────────────────────────┐     │
│  │           Context Providers                  │    │
│  │  Auth │ Theme │ Language │ Data              │    │
│  └──────────────────┬──────────────────────────┘     │
│                     ▼                                │
│  ┌─────────────────────────────────────────────┐     │
│  │           AI Service Layer                   │    │
│  │  Vision │ OCR │ Translation │ RAG │ TTS     │    │
│  └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
src/
├── App.tsx                    # Main app with routing
├── main.tsx                   # Entry point
├── index.css                  # Global styles & Tailwind
├── components/
│   └── Layout.tsx             # Navbar, Sidebar, Layout wrapper
├── contexts/
│   └── AppContexts.tsx        # Auth, Theme, Language, Data providers
├── pages/
│   ├── Landing.tsx            # Landing/Hero page
│   ├── Auth.tsx               # Login & Register pages
│   ├── Dashboard.tsx          # Dashboard with stats
│   ├── AIVision.tsx           # Image analysis, OCR, translation
│   ├── UploadCenter.tsx       # File upload with drag & drop
│   ├── RAGChatbot.tsx         # RAG & AI chat interface
│   ├── History.tsx            # Activity history timeline
│   └── Profile.tsx            # User profile & settings
├── services/
│   └── aiService.ts           # AI simulation services
├── types/
│   └── index.ts               # TypeScript type definitions
└── utils/
    └── translations.ts        # 4-language translation system
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-vision-rag-assistant

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📱 Pages Overview

### 🏠 Landing Page
- Hero section with animated gradients and floating elements
- Feature cards showcasing all AI capabilities
- Language support showcase
- Statistics and social proof
- CTA sections with registration links

### 🔐 Login / Register
- Clean auth forms with validation
- Password visibility toggle
- Demo mode — use any email/password
- Animated transitions

### 📊 Dashboard
- Welcome header with user info
- Stats cards (uploads, chats, translations, analyses)
- Quick action cards with navigation
- Recent activity feed
- AI capabilities status panel

### 👁️ AI Vision
- Image upload with drag & drop
- AI Vision Analysis (object detection, scene understanding)
- OCR Text Extraction
- Multi-language Translation
- AI Summarization
- Voice input & Text-to-Speech
- Copy to clipboard

### 📤 Upload Center
- Drag & drop file uploads
- Support for PDF, images, documents
- File processing pipeline visualization
- File grid with previews and status
- Search and filter capabilities

### 🤖 RAG Chatbot
- Chat interface with message history
- RAG mode (document Q&A) & Chat mode (general AI)
- Session management
- Suggested prompts
- Voice input with Web Speech API
- Text-to-Speech for responses
- Copy message content

### 📜 History
- Activity timeline grouped by date
- Type-based filtering
- Search across activities
- Clear history option
- Color-coded activity types

### 👤 Profile
- Profile card with cover gradient
- Editable name and email
- Usage statistics
- Theme toggle
- Language preference
- Notification & security settings

---

## 🔧 Backend Architecture (Reference)

For a full-stack deployment, the backend would include:

```
backend/
├── server.js                  # Express server
├── .env.example               # Environment variables
├── config/
│   ├── db.js                  # MongoDB connection
│   └── auth.js                # JWT configuration
├── controllers/
│   ├── authController.js      # Login, Register, Profile
│   ├── uploadController.js    # File upload handling
│   ├── chatController.js      # Chat message handling
│   ├── aiController.js        # AI analysis endpoints
│   └── translationController.js # Translation endpoints
├── middleware/
│   ├── auth.js                # JWT verification
│   ├── upload.js              # Multer configuration
│   └── errorHandler.js        # Error handling
├── models/
│   ├── User.js                # User schema
│   ├── Chat.js                # Chat session schema
│   ├── Upload.js              # File upload schema
│   └── Activity.js            # Activity log schema
├── routes/
│   ├── auth.js                # /api/auth/*
│   ├── upload.js              # /api/upload/*
│   ├── chat.js                # /api/chat/*
│   ├── ai.js                  # /api/ai/*
│   └── translation.js         # /api/translation/*
├── services/
│   ├── aiService.js           # OpenAI/Gemini integration
│   ├── ocrService.js          # Tesseract OCR
│   ├── ragService.js          # LangChain RAG pipeline
│   ├── translationService.js  # Translation API
│   └── vectorStore.js         # ChromaDB/FAISS
└── utils/
    ├── helpers.js             # Utility functions
    └── validators.js          # Input validation
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login with credentials |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/upload/file` | Upload file |
| GET | `/api/upload/files` | List uploads |
| DELETE | `/api/upload/:id` | Delete upload |
| POST | `/api/chat/message` | Send chat message |
| GET | `/api/chat/sessions` | List sessions |
| POST | `/api/ai/analyze` | Analyze image |
| POST | `/api/ai/ocr` | Extract text |
| POST | `/api/ai/summarize` | Summarize text |
| POST | `/api/translation/translate` | Translate text |
| GET | `/api/history` | Get activity history |

### Environment Variables (.env.example)

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-vision-rag

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Google Gemini (alternative)
GEMINI_API_KEY=your-gemini-api-key

# Vector Database
CHROMA_DB_PATH=./vectorstore
```

---

## 🚢 Deployment

### Frontend → Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Backend → Render/Railway

1. Push backend code to GitHub
2. Connect repository on Render/Railway
3. Set environment variables
4. Deploy

### Database → MongoDB Atlas

1. Create cluster on MongoDB Atlas
2. Configure network access
3. Create database user
4. Get connection string

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM |
| Animations | Framer Motion |
| Icons | Lucide React |
| State Management | React Context API |
| Storage | LocalStorage (demo) |
| Voice | Web Speech API |
| TTS | SpeechSynthesis API |

---

## 📊 System Flow Diagram

```
User Input ──► Authentication ──► Dashboard
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
              Upload File      AI Vision Chat      RAG Chatbot
                    │                 │                  │
                    ▼                 ▼                  ▼
              Process File     Analyze Image      Index Documents
                    │                 │                  │
                    ▼                 ▼                  ▼
              Extract Text     Generate Report    Vector Search
                    │                 │                  │
                    ▼                 ▼                  ▼
              Index in RAG     OCR + Translate    AI Response
                    │                 │                  │
                    └─────────────────┼──────────────────┘
                                      ▼
                              Activity History
```

---

## 📝 License

MIT License — feel free to use, modify, and distribute.

---

Built with ❤️ using React, Tailwind CSS, and AI
