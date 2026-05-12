// ============================================================
// Complete translation system for English, Hindi, Kannada, Telugu
// ============================================================

import { TranslationMap } from '../types';

export const translations: TranslationMap = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ', te: 'హోమ్' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', te: 'డాష్‌బోర్డ్' },
  'nav.vision': { en: 'AI Vision', hi: 'AI विज़न', kn: 'AI ದೃಷ್ಟಿ', te: 'AI విజన్' },
  'nav.upload': { en: 'Upload Center', hi: 'अपलोड केंद्र', kn: 'ಅಪ್‌ಲೋಡ್ ಕೇಂದ್ರ', te: 'అప్‌లోడ్ కేంద్రం' },
  'nav.chatbot': { en: 'RAG Chatbot', hi: 'RAG चैटबॉट', kn: 'RAG ಚಾಟ್‌ಬಾಟ್', te: 'RAG చాట్‌బాట్' },
  'nav.history': { en: 'History', hi: 'इतिहास', kn: 'ಇತಿಹಾಸ', te: 'చరిత్ర' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल', kn: 'ಪ್ರೊಫೈಲ್', te: 'ప్రొఫైల్' },
  'nav.logout': { en: 'Logout', hi: 'लॉगआउट', kn: 'ಲಾಗ್ ಔಟ್', te: 'లాగ్ అవుట్' },
  'nav.login': { en: 'Login', hi: 'लॉगिन', kn: 'ಲಾಗಿನ್', te: 'లాగిన్' },
  'nav.register': { en: 'Register', hi: 'रजिस्टर', kn: 'ನೋಂದಣಿ', te: 'నమోదు' },

  // Landing Page
  'landing.title': { en: 'Multilingual Smart AI Vision RAG Assistant', hi: 'बहुभाषी स्मार्ट AI विज़न RAG सहायक', kn: 'ಬಹುಭಾಷಾ ಸ್ಮಾರ್ಟ್ AI ವಿಷನ್ RAG ಸಹಾಯಕ', te: 'బహుభాషా స్మార్ట్ AI విజన్ RAG అసిస్టెంట్' },
  'landing.subtitle': { en: 'Upload documents, analyze images, chat with AI, and get instant answers in your language', hi: 'दस्तावेज़ अपलोड करें, छवियों का विश्लेषण करें, AI के साथ चैट करें', kn: 'ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಚಿತ್ರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ', te: 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి, చిత్రాలను విశ్లేషించండి' },
  'landing.getStarted': { en: 'Get Started Free', hi: 'मुफ्त शुरू करें', kn: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ', te: 'ఉచితంగా ప్రారంభించండి' },
  'landing.watchDemo': { en: 'Watch Demo', hi: 'डेमो देखें', kn: 'ಡೆಮೊ ನೋಡಿ', te: 'డెమో చూడండి' },

  // Features
  'feature.ocr': { en: 'OCR Text Detection', hi: 'OCR टेक्स्ट डिटेक्शन', kn: 'OCR ಪಠ್ಯ ಪತ್ತೆ', te: 'OCR టెక్స్ట్ డిటెక్షన్' },
  'feature.vision': { en: 'AI Vision Analysis', hi: 'AI विज़न विश्लेषण', kn: 'AI ದೃಷ್ಟಿ ವಿಶ್ಲೇಷಣೆ', te: 'AI విజన్ విశ్లేషణ' },
  'feature.translation': { en: 'Multilingual Translation', hi: 'बहुभाषी अनुवाद', kn: 'ಬಹುಭಾಷಾ ಅನುವಾದ', te: 'బహుభాషా అనువాదం' },
  'feature.rag': { en: 'RAG Q&A System', hi: 'RAG प्रश्न-उत्तर सिस्टम', kn: 'RAG ಪ್ರಶ್ನೋತ್ತರ ವ್ಯವಸ್ಥೆ', te: 'RAG ప్రశ్నోత్తర వ్యవస్థ' },
  'feature.chatbot': { en: 'Smart AI Chatbot', hi: 'स्मार्ट AI चैटबॉट', kn: 'ಸ್ಮಾರ್�್ AI ಚಾಟ್‌ಬಾಟ್', te: 'స్మార్ట్ AI చాట్‌బాట్' },
  'feature.voice': { en: 'Voice Input & TTS', hi: 'वॉइस इनपुट और TTS', kn: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಮತ್ತು TTS', te: 'వాయిస్ ఇన్‌పుట్ & TTS' },

  // Auth
  'auth.login': { en: 'Sign In', hi: 'साइन इन', kn: 'ಸೈನ್ ಇನ್', te: 'సైన్ ఇన్' },
  'auth.register': { en: 'Create Account', hi: 'अकाउंट बनाएं', kn: 'ಖಾತೆ ರಚಿಸಿ', te: 'ఖాతా సృష్టించండి' },
  'auth.email': { en: 'Email Address', hi: 'ईमेल पता', kn: 'ಇಮೇಲ್ ವಿಳಾಸ', te: 'ఇమెయిల్ చిరునామా' },
  'auth.password': { en: 'Password', hi: 'पासवर्ड', kn: 'ಪಾಸ್‌ವರ್ಡ್', te: 'పాస్‌వర్డ్' },
  'auth.name': { en: 'Full Name', hi: 'पूरा नाम', kn: 'ಪೂರ್ಣ ಹೆಸರು', te: 'పూర్తి పేరు' },
  'auth.forgotPassword': { en: 'Forgot Password?', hi: 'पासवर्ड भूल गए?', kn: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?', te: 'పాస్‌వర్డ్ మర్చిపోయారా?' },
  'auth.noAccount': { en: "Don't have an account?", hi: 'अकाउंट नहीं है?', kn: 'ಖಾತೆ ಇಲ್ಲವೇ?', te: 'ఖాతా లేదా?' },
  'auth.hasAccount': { en: 'Already have an account?', hi: 'पहले से अकाउंट है?', kn: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?', te: 'ఇప్పటికే ఖాతా ఉందా?' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', hi: 'वापसी पर स्वागत', kn: 'ಮರಳಿ ಸ್ವಾಗತ', te: 'తిరిగి స్వాగతం' },
  'dashboard.uploads': { en: 'Total Uploads', hi: 'कुल अपलोड', kn: 'ಒಟ್ಟು ಅಪ್‌ಲೋಡ್‌ಗಳು', te: 'మొత్తం అప్‌లోడ్‌లు' },
  'dashboard.chats': { en: 'AI Conversations', hi: 'AI बातचीत', kn: 'AI ಸಂಭಾಷಣೆಗಳು', te: 'AI సంభాషణలు' },
  'dashboard.translations': { en: 'Translations', hi: 'अनुवाद', kn: 'ಅನುವಾದಗಳು', te: 'అనువాదాలు' },
  'dashboard.analyses': { en: 'AI Analyses', hi: 'AI विश्लेषण', kn: 'AI ವಿಶ್ಲೇಷಣೆಗಳು', te: 'AI విశ్లేషణలు' },
  'dashboard.recent': { en: 'Recent Activity', hi: 'हाल की गतिविधि', kn: 'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ', te: 'ఇటీవలి కార్యకలాపం' },
  'dashboard.quickActions': { en: 'Quick Actions', hi: 'त्वरित कार्य', kn: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು', te: 'త్వరిత చర్యలు' },

  // Upload
  'upload.title': { en: 'Upload Center', hi: 'अपलोड केंद्र', kn: 'ಅಪ್‌ಲೋಡ್ ಕೇಂದ್ರ', te: 'అప్‌లోడ్ కేంద్రం' },
  'upload.dragDrop': { en: 'Drag & drop files here', hi: 'फ़ाइलें यहां खींचें और छोड़ें', kn: 'ಫೈಲ್‌ಗಳನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಬಿಡಿ', te: 'ఫైల్‌లను ఇక్కడ డ్రాగ్ & డ్రాప్ చేయండి' },
  'upload.browse': { en: 'Browse Files', hi: 'फ़ाइलें ब्राउज़ करें', kn: 'ಫೈಲ್‌ಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ', te: 'ఫైల్‌లను బ్రౌజ్ చేయండి' },
  'upload.supported': { en: 'Supports PDF, Images (JPG, PNG)', hi: 'PDF, छवियां (JPG, PNG) समर्थित', kn: 'PDF, ಚಿತ್ರಗಳು (JPG, PNG) ಬೆಂಬಲಿತ', te: 'PDF, చిత్రాలు (JPG, PNG) మద్దతు' },

  // Chat
  'chat.placeholder': { en: 'Ask anything about your documents...', hi: 'अपने दस्तावेज़ों के बारे में कुछ भी पूछें...', kn: 'ನಿಮ್ಮ ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...', te: 'మీ డాక్యుమెంట్ల గురించి ఏదైనా అడగండి...' },
  'chat.send': { en: 'Send', hi: 'भेजें', kn: 'ಕಳುಹಿಸಿ', te: 'పంపండి' },
  'chat.newChat': { en: 'New Chat', hi: 'नई चैट', kn: 'ಹೊಸ ಚಾಟ್', te: 'కొత్త చాట్' },
  'chat.thinking': { en: 'AI is thinking...', hi: 'AI सोच रहा है...', kn: 'AI ಯೋಚಿಸುತ್ತಿದೆ...', te: 'AI ఆలోచిస్తోంది...' },

  // Vision
  'vision.title': { en: 'AI Vision Analysis', hi: 'AI विज़न विश्लेषण', kn: 'AI ದೃಷ್ಟಿ ವಿಶ್ಲೇಷಣೆ', te: 'AI విజన్ విశ్లేషణ' },
  'vision.upload': { en: 'Upload an image for AI analysis', hi: 'AI विश्लेषण के लिए एक छवि अपलोड करें', kn: 'AI ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ', te: 'AI విశ్లేషణ కోసం చిత్రాన్ని అప్‌లోడ్ చేయండి' },
  'vision.analyze': { en: 'Analyze Image', hi: 'छवि का विश्लेषण करें', kn: 'ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಿ', te: 'చిత్రాన్ని విశ్లేషించండి' },
  'vision.extractText': { en: 'Extract Text (OCR)', hi: 'टेक्स्ट निकालें (OCR)', kn: 'ಪಠ್ಯ ಹೊರತೆಗೆಯಿರಿ (OCR)', te: 'టెక్స్ట్ సంగ్రహించండి (OCR)' },
  'vision.translate': { en: 'Translate', hi: 'अनुवाद करें', kn: 'ಅನುವಾದಿಸಿ', te: 'అనువదించండి' },
  'vision.summarize': { en: 'Summarize', hi: 'सारांश', kn: 'ಸಾರಾಂಶ', te: 'సారాంశం' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', te: 'లోడ్ అవుతోంది...' },
  'common.save': { en: 'Save', hi: 'सेव करें', kn: 'ಉಳಿಸಿ', te: 'సేవ్ చేయండి' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें', kn: 'ರದ್ದುಮಾಡಿ', te: 'రద్దు చేయండి' },
  'common.delete': { en: 'Delete', hi: 'हटाएं', kn: 'ಅಳಿಸಿ', te: 'తొలగించండి' },
  'common.search': { en: 'Search...', hi: 'खोजें...', kn: 'ಹುಡುಕಿ...', te: 'శోధించండి...' },
  'common.darkMode': { en: 'Dark Mode', hi: 'डार्क मोड', kn: 'ಡಾರ್ಕ್ ಮೋಡ್', te: 'డార్క్ మోడ్' },
  'common.lightMode': { en: 'Light Mode', hi: 'लाइट मोड', kn: 'ಲೈಟ್ ಮೋಡ್', te: 'లైట్ మోడ్' },
  'common.language': { en: 'Language', hi: 'भाषा', kn: 'ಭಾಷೆ', te: 'భాష' },
  'common.settings': { en: 'Settings', hi: 'सेटिंग्स', kn: 'ಸೆಟ್ಟಿಂಗ್ಸ್', te: 'సెట్టింగ్స్' },
  'common.noData': { en: 'No data available', hi: 'कोई डेटा उपलब्ध नहीं', kn: 'ಯಾವುದೇ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ', te: 'డేటా అందుబాటులో లేదు' },
  'common.copy': { en: 'Copy', hi: 'कॉपी', kn: 'ಕಾಪಿ', te: 'కాపీ' },
  'common.copied': { en: 'Copied!', hi: 'कॉपी हो गया!', kn: 'ಕಾಪಿ ಆಯಿತು!', te: 'కాపీ అయింది!' },

  // Profile
  'profile.title': { en: 'My Profile', hi: 'मेरी प्रोफ़ाइल', kn: 'ನನ್ನ ಪ್ರೊಫೈಲ್', te: 'నా ప్రొఫైల్' },
  'profile.edit': { en: 'Edit Profile', hi: 'प्रोफ़ाइल संपादित करें', kn: 'ಪ್ರೊಫೈಲ್ ಎಡಿಟ್ ಮಾಡಿ', te: 'ప్రొఫైల్ ఎడిట్ చేయండి' },
  'profile.stats': { en: 'Your Statistics', hi: 'आपके आंकड़े', kn: 'ನಿಮ್ಮ ಅಂಕಿಅಂಶಗಳು', te: 'మీ గణాంకాలు' },

  // History
  'history.title': { en: 'Activity History', hi: 'गतिविधि इतिहास', kn: 'ಚಟುವಟಿಕೆ ಇತಿಹಾಸ', te: 'కార్యకలాప చరిత్ర' },
  'history.clear': { en: 'Clear History', hi: 'इतिहास साफ करें', kn: 'ಇತಿಹಾಸ ಅಳಿಸಿ', te: 'చరిత్ర తొలగించండి' },
  'history.filter': { en: 'Filter', hi: 'फ़िल्टर', kn: 'ಫಿಲ್ಟರ್', te: 'ఫిల్టర్' },
};

// Language names for display
export const languageNames: Record<string, { en: string; native: string }> = {
  en: { en: 'English', native: 'English' },
  hi: { en: 'Hindi', native: 'हिन्दी' },
  kn: { en: 'Kannada', native: 'ಕನ್ನಡ' },
  te: { en: 'Telugu', native: 'తెలుగు' },
};
