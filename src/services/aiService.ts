// ============================================================
// AI Service - Simulates AI responses for Vision, OCR, RAG,
// Translation, Summarization, and Chatbot features
// ============================================================

import { type Language } from '../types';

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================
// AI Vision Analysis
// ============================================================
export async function analyzeImage(_imageUrl: string): Promise<string> {
  await delay(2000 + Math.random() * 1500);

  const analyses = [
    `## 🔍 AI Vision Analysis Report

**Image Classification:** Natural Scene / Landscape Photography

**Detected Objects:**
- 🌳 Trees and vegetation (confidence: 97.2%)
- ☁️ Cloud formations (confidence: 94.8%)
- 🏔️ Mountain terrain (confidence: 89.1%)
- 💧 Water body (confidence: 76.4%)

**Scene Description:**
This image depicts a stunning natural landscape with lush green vegetation in the foreground, rolling hills transitioning to mountainous terrain in the background, and a partly cloudy sky overhead. The composition suggests this was captured during golden hour.

**Color Palette:**
- Dominant: Forest Green (#228B22), Sky Blue (#87CEEB)
- Secondary: Earth Brown (#8B4513), Cloud White (#F5F5F5)

**Technical Analysis:**
- Resolution: High quality
- Lighting: Natural, well-exposed
- Composition: Rule of thirds applied
- Focus: Sharp throughout the frame`,

    `## 🔍 AI Vision Analysis Report

**Image Classification:** Document / Text Content

**Detected Elements:**
- 📄 Text regions detected (confidence: 98.5%)
- 📊 Table or structured data (confidence: 82.3%)
- 🖊️ Handwritten notes (confidence: 65.7%)

**Document Type:** Printed document with mixed content

**Layout Analysis:**
- Header section detected at top
- Body text in single column format
- Possible table or list structure detected
- Footer information present

**Quality Assessment:**
- Readability: High
- Contrast: Good for OCR
- Skew: Minimal (< 2°)
- Recommended: Proceed with text extraction`,

    `## 🔍 AI Vision Analysis Report

**Image Classification:** Urban Scene / Architecture

**Detected Objects:**
- 🏢 Buildings and structures (confidence: 96.8%)
- 🚗 Vehicles (confidence: 91.2%)
- 🚶 Pedestrians (confidence: 84.5%)
- 🚦 Traffic infrastructure (confidence: 78.9%)
- 🌳 Urban vegetation (confidence: 72.1%)

**Scene Description:**
An urban cityscape featuring modern architectural elements with glass and steel structures. The scene captures daily urban life with pedestrians and vehicles navigating the streets.

**Architectural Style:** Contemporary / Modern
**Time of Day:** Daytime (estimated 2-4 PM based on shadow analysis)
**Weather:** Clear conditions

**Semantic Segmentation:**
- Buildings: 45% of frame
- Sky: 25% of frame
- Road/Ground: 20% of frame
- Vegetation: 10% of frame`,
  ];

  return analyses[Math.floor(Math.random() * analyses.length)];
}

// ============================================================
// OCR Text Extraction
// ============================================================
export async function extractTextOCR(_imageUrl: string): Promise<string> {
  await delay(1800 + Math.random() * 1200);

  const texts = [
    `## 📝 Extracted Text (OCR)

**Confidence Level:** 96.8%
**Language Detected:** English

---

**DOCUMENT TITLE: Annual Report 2024**

Section 1: Executive Summary

The fiscal year 2024 has shown remarkable growth across all departments. Revenue increased by 23.5% compared to the previous year, reaching a total of $4.2 billion. Our commitment to innovation and customer satisfaction continues to drive our success in the global market.

Key Highlights:
• Revenue Growth: 23.5% YoY
• New Customers: 15,000+
• Market Expansion: 12 new regions
• Employee Satisfaction: 94%
• R&D Investment: $580M

Section 2: Financial Overview
Total Revenue: $4,200,000,000
Operating Costs: $2,850,000,000
Net Profit: $1,350,000,000
Profit Margin: 32.1%

---
*Text extraction completed successfully with high confidence.*`,

    `## 📝 Extracted Text (OCR)

**Confidence Level:** 94.2%
**Language Detected:** English

---

**MEETING NOTES - Project Alpha**
Date: March 15, 2024
Attendees: Dr. Smith, Ms. Johnson, Mr. Patel

Agenda:
1. Project timeline review
2. Budget allocation
3. Team assignments
4. Risk assessment

Discussion Points:
- Phase 1 completion scheduled for Q2 2024
- Additional resources needed for the ML pipeline
- Data security protocols to be updated
- Client presentation moved to April 5th

Action Items:
□ Update project Gantt chart - Smith
□ Prepare budget proposal - Johnson
□ Recruit 2 ML engineers - Patel
□ Security audit scheduling - Team

Next Meeting: March 22, 2024, 10:00 AM

---
*Text extraction completed successfully.*`,
  ];

  return texts[Math.floor(Math.random() * texts.length)];
}

// ============================================================
// AI Translation
// ============================================================
const sampleTranslations: Record<string, Record<Language, string>> = {
  greeting: {
    en: 'Hello! Welcome to our AI-powered platform. We are delighted to have you here. Our system can analyze images, extract text, translate content, and answer questions about your documents.',
    hi: 'नमस्ते! हमारे AI-संचालित प्लेटफ़ॉर्म में आपका स्वागत है। हमें आपको यहां पाकर खुशी हो रही है। हमारा सिस्टम छवियों का विश्लेषण कर सकता है, टेक्स्ट निकाल सकता है, सामग्री का अनुवाद कर सकता है, और आपके दस्तावेज़ों के बारे में सवालों के जवाब दे सकता है।',
    kn: 'ನಮಸ್ಕಾರ! ನಮ್ಮ AI-ಚಾಲಿತ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗೆ ಸ್ವಾಗತ. ನಿಮ್ಮನ್ನು ಇಲ್ಲಿ ಹೊಂದಲು ನಮಗೆ ಸಂತೋಷವಾಗಿದೆ. ನಮ್ಮ ಸಿಸ್ಟಮ್ ಚಿತ್ರಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಬಹುದು, ಪಠ್ಯವನ್ನು ಹೊರತೆಗೆಯಬಹುದು, ವಿಷಯವನ್ನು ಅನುವಾದಿಸಬಹುದು ಮತ್ತು ನಿಮ್ಮ ಡಾಕ್ಯುಮೆಂಟ್‌ಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಬಹುದು.',
    te: 'హలో! మా AI-ఆధారిత ప్లాట్‌ఫారమ్‌కు స్వాగతం. మిమ్మల్ని ఇక్కడ కలిగి ఉండటం మాకు ఆనందంగా ఉంది. మా సిస్టమ్ చిత్రాలను విశ్లేషించగలదు, టెక్స్ట్‌ను సంగ్రహించగలదు, కంటెంట్‌ను అనువదించగలదు మరియు మీ డాక్యుమెంట్ల గురించి ప్రశ్నలకు సమాధానం ఇవ్వగలదు.',
  },
  analysis: {
    en: 'The analysis shows that the document contains important financial data with quarterly revenue figures showing consistent growth. The AI model has identified key metrics including profit margins, operational efficiency, and market expansion indicators.',
    hi: 'विश्लेषण से पता चलता है कि दस्तावेज़ में तिमाही राजस्व आंकड़ों के साथ महत्वपूर्ण वित्तीय डेटा है जो लगातार वृद्धि दिखा रहा है। AI मॉडल ने लाभ मार्जिन, परिचालन दक्षता और बाजार विस्तार संकेतकों सहित प्रमुख मैट्रिक्स की पहचान की है।',
    kn: 'ವಿಶ್ಲೇಷಣೆಯು ಡಾಕ್ಯುಮೆಂಟ್ ತ್ರೈಮಾಸಿಕ ಆದಾಯ ಅಂಕಿಅಂಶಗಳೊಂದಿಗೆ ಪ್ರಮುಖ ಆರ್ಥಿಕ ಡೇಟಾವನ್ನು ಒಳಗೊಂಡಿದೆ ಎಂದು ತೋರಿಸುತ್ತದೆ. AI ಮಾದರಿಯು ಲಾಭ ಅಂಚುಗಳು, ಕಾರ್ಯಾಚರಣೆಯ ದಕ್ಷತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ವಿಸ್ತರಣೆ ಸೂಚಕಗಳನ್ನು ಒಳಗೊಂಡಂತೆ ಪ್ರಮುಖ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ಗುರುತಿಸಿದೆ.',
    te: 'విశ్లేషణ ప్రకారం డాక్యుమెంట్‌లో స్థిరమైన వృద్ధిని చూపుతున్న త్రైమాసిక ఆదాయ గణాంకాలతో ముఖ్యమైన ఆర్థిక డేటా ఉంది. AI మోడల్ లాభ మార్జిన్లు, కార్యాచరణ సామర్థ్యం మరియు మార్కెట్ విస్తరణ సూచికలతో సహా కీలక కొలమానాలను గుర్తించింది.',
  },
};

export async function translateText(text: string, targetLang: Language): Promise<string> {
  await delay(1500 + Math.random() * 1000);

  // Pick a contextual translation or provide a simulated one
  if (text.length < 200) {
    const translatedPrefixes: Record<Language, string> = {
      en: text,
      hi: `[हिन्दी अनुवाद] ${sampleTranslations.greeting.hi}`,
      kn: `[ಕನ್ನಡ ಅನುವಾದ] ${sampleTranslations.greeting.kn}`,
      te: `[తెలుగు అనువాదం] ${sampleTranslations.greeting.te}`,
    };
    return translatedPrefixes[targetLang];
  }

  return sampleTranslations.analysis[targetLang];
}

// ============================================================
// AI Summarization
// ============================================================
export async function summarizeText(text: string): Promise<string> {
  await delay(2000 + Math.random() * 1000);

  return `## 📋 AI Summary

**Key Points:**

1. **Main Topic:** The document discusses organizational performance metrics and strategic planning initiatives for the upcoming fiscal year.

2. **Financial Highlights:** Revenue shows a positive trajectory with 23.5% year-over-year growth, indicating strong market demand for products and services.

3. **Operational Efficiency:** The organization has achieved significant improvements in operational workflows, reducing costs by 15% while maintaining quality standards.

4. **Strategic Initiatives:**
   - Market expansion into 12 new regions
   - Investment in R&D totaling $580M
   - Digital transformation across all departments

5. **Risk Factors:** The document identifies potential supply chain disruptions and regulatory changes as primary risk factors requiring monitoring.

**Sentiment:** Positive and forward-looking
**Complexity:** Medium
**Word Count (Original):** ~${text.length > 10 ? text.split(' ').length : 450} words
**Compression Ratio:** ~75% reduction

---
*Summary generated by AI Vision RAG Assistant*`;
}

// ============================================================
// Retrieval-Augmented Generation (RAG)
// Uses only uploaded document content. No random canned answers.
// ============================================================
interface RagDocument {
  id: string;
  name: string;
  type: string;
  text: string;
}

interface RagChunk {
  id: string;
  docId: string;
  docName: string;
  heading: string;
  text: string;
  tokenCount: number;
  order: number;
  score: number;
  matchedTerms: string[];
}

type RagIntent = 'projects' | 'skills' | 'experience' | 'education' | 'summary' | 'general';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'could', 'did', 'do', 'does',
  'for', 'from', 'give', 'how', 'i', 'in', 'into', 'is', 'it', 'me', 'of', 'on', 'or',
  'our', 'please', 'show', 'tell', 'that', 'the', 'their', 'this', 'to', 'was', 'were',
  'what', 'when', 'where', 'which', 'who', 'why', 'with', 'you', 'your', 'about', 'based',
  'document', 'documents', 'uploaded', 'file', 'files', 'answer', 'question', 'explain'
]);

function normalizeForRag(input: string): string {
  return input
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\uFFFD/g, ' ')
    .replace(/[ \t]+$/gm, '')
    .replace(/([A-Za-z])-\n([a-z])/g, '$1$2')
    .replace(/([^\n])\n([^\n\-•\dA-Z#])/g, '$1 $2')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9%.$₹-]+/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

function detectIntent(question: string): RagIntent {
  const q = question.toLowerCase();
  if (/\b(project|projects|portfolio|built|developed|application|apps)\b/.test(q)) return 'projects';
  if (/\b(skill|skills|technical skill|technologies|tools|programming|language|languages|framework|frameworks)\b/.test(q)) return 'skills';
  if (/\b(experience|work|internship|employment|job|role|roles)\b/.test(q)) return 'experience';
  if (/\b(education|degree|college|university|school|cgpa|gpa|marks)\b/.test(q)) return 'education';
  if (isSummaryQuestion(question)) return 'summary';
  return 'general';
}

function isOffIntentHeading(heading: string, intent: RagIntent): boolean {
  const h = heading.toLowerCase();
  if (intent === 'projects') return /\b(skill|skills|technical|technologies|toolbox|toolkit|education|certificate|certification)\b/.test(h);
  if (intent === 'skills') return /\b(project|projects|experience|education)\b/.test(h);
  if (intent === 'education') return /\b(project|projects|skill|skills|experience)\b/.test(h);
  if (intent === 'experience') return /\b(project|projects|skill|skills|education)\b/.test(h);
  return false;
}

function intentHeadingBoost(heading: string, intent: RagIntent): number {
  const h = heading.toLowerCase();
  if (intent === 'projects' && /\b(project|projects|portfolio|academic project|personal project)\b/.test(h)) return 18;
  if (intent === 'skills' && /\b(skill|skills|technical skills|technologies|tools)\b/.test(h)) return 18;
  if (intent === 'education' && /\b(education|academic|qualification)\b/.test(h)) return 18;
  if (intent === 'experience' && /\b(experience|work experience|internship|employment)\b/.test(h)) return 18;
  return 0;
}

function parseDocuments(context = ''): RagDocument[] {
  const docs: RagDocument[] = [];
  const docPattern = /<<DOC id="([^"]+)" name="([^"]+)" type="([^"]+)">>\n([\s\S]*?)\n<<END_DOC>>/g;
  let match: RegExpExecArray | null;

  while ((match = docPattern.exec(context)) !== null) {
    const text = normalizeForRag(match[4]);
    const readableChars = (text.match(/[A-Za-z0-9.,;:'"()\[\]\-/%₹$\s\n]/g) || []).length;
    const readability = text.length ? readableChars / text.length : 0;

    if (text.length > 40 && readability > 0.55) {
      docs.push({ id: match[1], name: match[2], type: match[3], text });
    }
  }

  const fallback = normalizeForRag(context);
  if (!docs.length && fallback.length > 40) {
    docs.push({ id: 'context', name: 'Uploaded context', type: 'text', text: fallback });
  }

  return docs;
}

function isHeading(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 3 || trimmed.length > 120) return false;

  return (
    /^#{1,6}\s+/.test(trimmed) ||
    /^(chapter|section|unit|module|part)\s+\d+/i.test(trimmed) ||
    /^\d+(\.\d+)*\s+[A-Z][\w\s:,-]{3,}$/.test(trimmed) ||
    /^(abstract|introduction|methodology|objectives?|results?|discussion|conclusion|references|appendix)$/i.test(trimmed) ||
    (/^[A-Z0-9\s:,-]{5,}$/.test(trimmed) && /[A-Z]/.test(trimmed))
  );
}

function chunkDocument(doc: RagDocument, maxTokens = 320, overlapTokens = 60): RagChunk[] {
  const chunks: RagChunk[] = [];
  const lines = doc.text.split('\n');
  const sections: { heading: string; text: string }[] = [];
  let heading = 'Document body';
  let buffer: string[] = [];

  const flush = () => {
    const text = normalizeForRag(buffer.join('\n'));
    if (text.length > 30) sections.push({ heading, text });
    buffer = [];
  };

  for (const line of lines) {
    if (isHeading(line)) {
      flush();
      heading = line.replace(/^#+\s*/, '').trim();
    } else {
      buffer.push(line);
    }
  }
  flush();

  const sourceSections = sections.length ? sections : [{ heading, text: doc.text }];

  for (const section of sourceSections) {
    const paragraphs = section.text
      .split(/\n{2,}/)
      .map(paragraph => paragraph.trim())
      .filter(Boolean);

    let currentParagraphs: string[] = [];
    let tokenCount = 0;

    const pushChunk = (force = false) => {
      if (tokenCount < 35 && !force) return;
      const text = currentParagraphs.join('\n\n').trim();
      if (text.length > 60) {
        chunks.push({
          id: `${doc.id}-chunk-${chunks.length + 1}`,
          docId: doc.id,
          docName: doc.name,
          heading: section.heading,
          text,
          tokenCount,
          order: chunks.length,
          score: 0,
          matchedTerms: [],
        });
      }
      const overlapParagraphs: string[] = [];
      let overlapCount = 0;
      for (let i = currentParagraphs.length - 1; i >= 0; i -= 1) {
        const paragraphTokens = currentParagraphs[i].split(/\s+/).filter(Boolean).length;
        if (overlapCount + paragraphTokens > overlapTokens && overlapParagraphs.length) break;
        overlapParagraphs.unshift(currentParagraphs[i]);
        overlapCount += paragraphTokens;
      }
      currentParagraphs = overlapParagraphs;
      tokenCount = overlapCount;
    };

    for (const paragraph of paragraphs) {
      const paragraphWords = paragraph.split(/\s+/).filter(Boolean);
      if (paragraphWords.length > maxTokens) {
        pushChunk(true);
        const sentenceParts = paragraph.split(/(?<=[.!?])\s+(?=[A-Z0-9])/).filter(Boolean);
        if (sentenceParts.length > 1) {
          for (const sentence of sentenceParts) {
            const sentenceTokens = sentence.split(/\s+/).filter(Boolean).length;
            if (tokenCount + sentenceTokens > maxTokens) pushChunk(true);
            currentParagraphs.push(sentence);
            tokenCount += sentenceTokens;
          }
          pushChunk(true);
        } else {
          for (let i = 0; i < paragraphWords.length; i += maxTokens - overlapTokens) {
            currentParagraphs = [paragraphWords.slice(i, i + maxTokens).join(' ')];
            tokenCount = currentParagraphs[0].split(/\s+/).filter(Boolean).length;
            pushChunk(true);
          }
        }
        currentParagraphs = [];
        tokenCount = 0;
        continue;
      }

      if (tokenCount + paragraphWords.length > maxTokens) pushChunk(true);
      currentParagraphs.push(paragraph);
      tokenCount += paragraphWords.length;
    }
    pushChunk(true);
  }

  return chunks;
}

function scoreChunks(question: string, chunks: RagChunk[], intent: RagIntent): RagChunk[] {
  const queryTerms = [...new Set(tokenize(question))];
  const phrase = question.toLowerCase().replace(/[^a-z0-9%.$₹\s-]+/g, ' ').trim();

  return chunks
    .map(chunk => {
      const chunkText = chunk.text.toLowerCase();
      const headingText = chunk.heading.toLowerCase();
      const matchedTerms = queryTerms.filter(term => chunkText.includes(term) || headingText.includes(term));
      const termScore = matchedTerms.reduce((sum, term) => {
        const count = (chunkText.match(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')) || []).length;
        const headingBoost = headingText.includes(term) ? 2 : 0;
        return sum + Math.min(count, 4) + headingBoost;
      }, 0);

      const numberBoost = /\d/.test(question) && /\d/.test(chunk.text) ? 1.5 : 0;
      const exactBoost = phrase.length > 12 && chunkText.includes(phrase) ? 8 : 0;
      const coverage = queryTerms.length ? matchedTerms.length / queryTerms.length : 0;
      const density = termScore / Math.max(1, chunk.tokenCount / 80);
      const headingBoost = intentHeadingBoost(chunk.heading, intent);
      const offIntentPenalty = isOffIntentHeading(chunk.heading, intent) ? 25 : 0;

      return {
        ...chunk,
        score: termScore + exactBoost + numberBoost + coverage * 6 + density + headingBoost - offIntentPenalty,
        matchedTerms,
      };
    })
    .filter(chunk => chunk.score > 0)
    .sort((a, b) => b.score - a.score);
}

function cleanExtractedItem(item: string): string {
  return item
    .replace(/^[-•*\d.)\s]+/, '')
    .replace(/\s+/g, ' ')
    .replace(/\b(HTML|CSS|JavaScript|React|Node|Express|MongoDB|Python|Java|C\+\+|SQL)\b(?:\s*,\s*)?/gi, match => match)
    .trim();
}

function selectIntentAnswer(question: string, chunks: RagChunk[], intent: RagIntent): string[] {
  if (intent !== 'projects') return selectAnswerSentences(question, chunks);

  const projectChunks = chunks.filter(chunk =>
    /\b(project|projects|portfolio|academic project|personal project)\b/i.test(chunk.heading) ||
    /\b(project|projects)\b/i.test(chunk.text)
  );
  const source = projectChunks.length ? projectChunks : chunks;
  const rawText = source.map(chunk => chunk.text).join('\n');

  const colonList = rawText.match(/(?:projects?|academic projects?|personal projects?)\s*[:\-]\s*([\s\S]{0,900})/i)?.[1] || rawText;
  const candidateParts = colonList
    .split(/(?:\n|\r|\s{2,}|[;|] )/)
    .flatMap(part => part.split(/(?=\b[A-Z][A-Za-z0-9 .'-]{2,}\s*(?:-|:|\())/))
    .map(cleanExtractedItem)
    .filter(item => item.length > 3 && item.length < 180)
    .filter(item => !/^technical skills?\b|^skills?\b|^education\b|^certifications?\b/i.test(item))
    .filter(item => !/^html\b|^css\b|^javascript\b|^react\b|^node\b|^mongodb\b|^python\b|^java\b/i.test(item));

  const unique = candidateParts.filter((item, index, arr) =>
    arr.findIndex(other => other.toLowerCase() === item.toLowerCase()) === index
  );

  if (unique.length) return unique.slice(0, 8).map(item => `- ${item}`);

  return selectAnswerSentences(question, source).map(sentence => `- ${sentence}`);
}

function sentencesFrom(text: string): string[] {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 20);
}

function selectAnswerSentences(question: string, chunks: RagChunk[]): string[] {
  const terms = [...new Set(tokenize(question))];
  const candidates = chunks.flatMap(chunk =>
    sentencesFrom(chunk.text).map(sentence => {
      const lower = sentence.toLowerCase();
      const matched = terms.filter(term => lower.includes(term));
      return {
        sentence,
        score: matched.length * 4 + (/[0-9%₹$]/.test(sentence) ? 1.5 : 0),
      };
    })
  );

  const selected = candidates
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(candidate => candidate.sentence)
    .filter((sentence, index, arr) => arr.findIndex(item => item.toLowerCase() === sentence.toLowerCase()) === index)
    .slice(0, 5);

  return selected.length ? selected : chunks.slice(0, 2).flatMap(chunk => sentencesFrom(chunk.text).slice(0, 2));
}

function isSummaryQuestion(question: string): boolean {
  return /summary|summarize|overview|key points|main points|brief|abstract/i.test(question);
}

function isIndexedContentRequest(question: string): boolean {
  return /indexed content|indexed chunks|chunks?|retrieved context|show context|exact text|full context|phrase/i.test(question);
}

function extractQuotedPhrase(question: string): string | null {
  const quoted = question.match(/["'“”‘’]([^"'“”‘’]{3,})["'“”‘’]/)?.[1];
  if (quoted) return quoted.trim();

  const phraseMatch = question.match(/(?:phrase|text|sentence)\s+(?:called|named|about|for)?\s*[:\-]?\s*(.+)$/i)?.[1];
  return phraseMatch && phraseMatch.trim().length > 3 ? phraseMatch.trim() : null;
}

function uniqueParagraphs(text: string): string {
  const seen = new Set<string>();
  return text
    .split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
    .filter(paragraph => {
      const key = paragraph.toLowerCase().replace(/\W+/g, ' ').trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join('\n\n');
}

function collectCompleteSections(allChunks: RagChunk[], rankedChunks: RagChunk[], intent: RagIntent): RagChunk[] {
  if (!rankedChunks.length) return [];

  const best = rankedChunks[0];
  const sameSection = allChunks.filter(chunk =>
    chunk.docId === best.docId &&
    chunk.heading === best.heading &&
    !isOffIntentHeading(chunk.heading, intent)
  );

  const scoredRelevant = rankedChunks.filter(chunk => {
    if (isOffIntentHeading(chunk.heading, intent)) return false;
    if (intent !== 'general' && intent !== 'summary') {
      return chunk.heading === best.heading || chunk.score >= Math.max(5, best.score * 0.45);
    }
    return chunk.score >= Math.max(3, best.score * 0.5);
  });

  const combined = [...sameSection, ...scoredRelevant];
  return combined
    .filter((chunk, index, arr) => arr.findIndex(item => item.id === chunk.id) === index)
    .sort((a, b) => a.docName.localeCompare(b.docName) || a.order - b.order)
    .slice(0, 8);
}

function findPhraseContexts(docs: RagDocument[], phrase: string): string[] {
  const phraseLower = phrase.toLowerCase();
  const matches: string[] = [];

  for (const doc of docs) {
    const paragraphs = doc.text.split(/\n{2,}/).map(paragraph => paragraph.trim()).filter(Boolean);
    for (let index = 0; index < paragraphs.length; index += 1) {
      if (paragraphs[index].toLowerCase().includes(phraseLower)) {
        const before = paragraphs[index - 1] ? `${paragraphs[index - 1]}\n\n` : '';
        const after = paragraphs[index + 1] ? `\n\n${paragraphs[index + 1]}` : '';
        matches.push(`**${doc.name} - matching context**\n\n${before}${paragraphs[index]}${after}`);
      }
    }
  }

  return matches;
}

function formatContextAnswer(question: string, chunks: RagChunk[], confidence: number) {
  const grouped = chunks.reduce<Record<string, RagChunk[]>>((acc, chunk) => {
    const key = `${chunk.docName}|||${chunk.heading}`;
    acc[key] = acc[key] || [];
    acc[key].push(chunk);
    return acc;
  }, {});

  const sections = Object.entries(grouped).map(([key, group]) => {
    const [docName, heading] = key.split('|||');
    const body = uniqueParagraphs(group.sort((a, b) => a.order - b.order).map(chunk => chunk.text).join('\n\n'));
    return `### ${heading}\n**Source file:** ${docName}\n\n${body}`;
  });

  const sources = chunks
    .map((chunk, index) => `${index + 1}. ${chunk.docName} - ${chunk.heading} (${chunk.id}, matched: ${chunk.matchedTerms.join(', ') || 'section'})`)
    .join('\n');

  return `## Document-grounded answer

I retrieved the complete relevant section(s) from the uploaded document before answering your question: **${question}**

${sections.join('\n\n---\n\n')}

**Retrieval confidence:** ${confidence}%

📎 Source chunks:
${sources}`;
}

export async function ragChat(question: string, context?: string): Promise<string> {
  await delay(900 + Math.random() * 500);

  const docs = parseDocuments(context);
  if (!docs.length) {
    return `## I could not read any uploaded document text

Please upload a PDF, TXT, or DOCX that contains selectable text. If it is a scanned image-only PDF, first use OCR or upload the page image in AI Vision.`;
  }

  const chunks = docs.flatMap(doc => chunkDocument(doc));
  const phrase = extractQuotedPhrase(question);
  if (phrase) {
    const phraseMatches = findPhraseContexts(docs, phrase);
    if (phraseMatches.length) {
      return `## Exact phrase retrieved from uploaded document

${phraseMatches.join('\n\n---\n\n')}

📎 Matched phrase: "${phrase}"`;
    }
  }

  const intent = detectIntent(question);
  const ranked = scoreChunks(question, chunks, intent);
  const strictRanked = intent === 'general'
    ? ranked
    : ranked.filter(chunk => !isOffIntentHeading(chunk.heading, intent));
  const topChunks = (strictRanked.length ? strictRanked : ranked).slice(0, 4);
  const strongestScore = topChunks[0]?.score || 0;

  if (!topChunks.length || strongestScore < 2.5) {
    return `## I could not find that answer in the uploaded documents

I searched ${docs.length} uploaded document(s), but the question terms did not match the indexed content strongly enough.

**Try asking with words that appear in the document**, for example a heading, author name, topic, date, figure number, table name, or keyword.

**Indexed files:**
${docs.map(doc => `- ${doc.name} (${Math.round(doc.text.length / 1000)}k characters indexed)`).join('\n')}`;
  }

  const completeChunks = collectCompleteSections(chunks, (strictRanked.length ? strictRanked : ranked), intent);
  const confidence = Math.min(96, Math.round(55 + strongestScore * 4));

  if (isIndexedContentRequest(question) || isSummaryQuestion(question) || intent !== 'projects') {
    return formatContextAnswer(question, completeChunks.length ? completeChunks : topChunks, confidence);
  }

  const answerSentences = selectIntentAnswer(question, completeChunks.length ? completeChunks : topChunks, intent);
  const contextBlock = formatContextAnswer(question, completeChunks.length ? completeChunks : topChunks, confidence);

  return `## Projects found in uploaded document

${answerSentences.join('\n')}

---

${contextBlock}`;
}

// ============================================================
// General AI Chat
// ============================================================
const chatResponses: Record<string, string[]> = {
  greeting: [
    "Hello! 👋 I'm your AI Vision RAG Assistant. I can help you with:\n\n• 🖼️ **Image Analysis** - Upload images for AI-powered analysis\n• 📄 **Document Processing** - Extract text from PDFs and images\n• 🌐 **Translation** - Translate content into multiple languages\n• 💬 **Q&A** - Ask questions about your uploaded documents\n• 📝 **Summarization** - Get concise summaries of long documents\n\nHow can I assist you today?",
  ],
  help: [
    "Here's how to get the most out of the AI Vision RAG Assistant:\n\n**1. Upload Documents** 📤\nGo to the Upload Center to add PDFs or images. The system will automatically process and index them.\n\n**2. AI Vision** 👁️\nUpload any image to get detailed AI analysis, OCR text extraction, and multi-language translation.\n\n**3. RAG Chatbot** 🤖\nAsk questions about your uploaded documents. The AI will search through your files and provide accurate answers with source references.\n\n**4. Translation** 🌐\nTranslate any text between English, Hindi, Kannada, and Telugu.\n\n**5. Voice Features** 🎤\nUse the microphone button for voice input, and click the speaker icon to hear responses read aloud.\n\nNeed anything specific? Just ask!",
  ],
};

interface WebSearchResult {
  title: string;
  extract: string;
  url: string;
}

function cleanSearchQuery(message: string): string {
  return message
    .replace(/\b(search|google|web|internet|latest|tell me|explain|what is|who is|give me|about)\b/gi, ' ')
    .replace(/[^a-zA-Z0-9\s.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();
}

async function searchWikipedia(query: string): Promise<WebSearchResult[]> {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=3&srsearch=${encodeURIComponent(query)}`;
  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) throw new Error('Wikipedia search failed');

  const searchData = await searchResponse.json();
  const results = searchData?.query?.search || [];

  const summaries = await Promise.all(
    results.map(async (item: { title: string; snippet: string }) => {
      try {
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`;
        const summaryResponse = await fetch(summaryUrl);
        if (!summaryResponse.ok) throw new Error('Summary unavailable');
        const summaryData = await summaryResponse.json();
        return {
          title: summaryData.title || item.title,
          extract: summaryData.extract || stripHtml(item.snippet),
          url: summaryData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
        };
      } catch {
        return {
          title: item.title,
          extract: stripHtml(item.snippet),
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
        };
      }
    })
  );

  return summaries.filter(result => result.extract && result.extract.length > 40);
}

function buildWebAnswer(results: WebSearchResult[]): string {
  const lead = results[0];
  const supporting = results.slice(1);

  return `## Web answer

**${lead.title}**

${lead.extract}

${supporting.length ? `**Related information:**\n${supporting.map(result => `- **${result.title}:** ${result.extract.slice(0, 220)}${result.extract.length > 220 ? '...' : ''}`).join('\n')}` : ''}

**Sources:**
${results.map((result, index) => `${index + 1}. ${result.title} - ${result.url}`).join('\n')}

Note: This answer is retrieved from live Wikipedia web data. For private uploaded documents, switch to RAG Mode.`;
}

export async function aiChat(message: string): Promise<string> {
  await delay(600 + Math.random() * 500);

  const lower = message.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) {
    return chatResponses.greeting[0];
  }
  if (lower.includes('help') || lower.includes('how') || lower.includes('what can')) {
    return chatResponses.help[0];
  }

  const query = cleanSearchQuery(message) || message;
  try {
    const results = await searchWikipedia(query);
    if (results.length) return buildWebAnswer(results);
  } catch (error) {
    console.warn('Web retrieval failed:', error);
  }

  return `## I could not retrieve a reliable web answer

I tried searching live web knowledge for: **${query}**, but no reliable result was returned.

Try asking with a more specific topic name, person name, technology name, or keyword. Example: "What is LangChain?" or "Explain Retrieval Augmented Generation".`;
}

// ============================================================
// Text-to-Speech utility
// ============================================================
export function speakText(text: string, lang: Language = 'en') {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const cleanText = text.replace(/[#*_\-|>📎📋🔍📝📊💡📤👁️🤖🌐🎤💬□•]/g, '').replace(/\n+/g, '. ');

  const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 500));
  const langMap: Record<Language, string> = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN', te: 'te-IN' };
  utterance.lang = langMap[lang];
  utterance.rate = 0.9;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
