// ============================================================
// Upload Center Page - Drag & drop file uploads, file list
// ============================================================

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useLanguage, useData } from '../contexts/AppContexts';
import type { UploadedFile } from '../types';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import {
  Upload, FileText, Image, Check, Clock, AlertCircle,
  File, X, HardDrive, Search, Loader2
} from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PLACEHOLDER_TEXT = 'No readable text could be extracted from this file. If it is scanned, use OCR first.';

function normalizeExtractedText(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    .replace(/\uFFFD/g, ' ')
    .replace(/([A-Za-z])-\n([a-z])/g, '$1$2')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{4,}/g, '\n\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function isReadable(text: string) {
  const cleaned = normalizeExtractedText(text);
  if (cleaned.length < 40) return false;
  const readable = (cleaned.match(/[A-Za-z0-9.,;:'"()\[\]\-/%₹$\s\n]/g) || []).length;
  return readable / cleaned.length > 0.6;
}

async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const items = content.items
      .filter((item: any) => typeof item.str === 'string' && item.str.trim())
      .map((item: any) => ({
        text: item.str.trim(),
        x: Math.round(item.transform?.[4] || 0),
        y: Math.round(item.transform?.[5] || 0),
      }))
      .sort((a, b) => (b.y - a.y) || (a.x - b.x));

    const lines: string[] = [];
    let currentY: number | null = null;
    let line: string[] = [];

    for (const item of items) {
      if (currentY === null || Math.abs(item.y - currentY) <= 3) {
        line.push(item.text);
        currentY = currentY ?? item.y;
      } else {
        lines.push(line.join(' '));
        line = [item.text];
        currentY = item.y;
      }
    }
    if (line.length) lines.push(line.join(' '));
    pages.push(`Page ${pageNumber}\n${lines.join('\n')}`);
  }

  return normalizeExtractedText(pages.join('\n\n'));
}

async function extractDocxText(file: File): Promise<string> {
  const mammoth = (await import('mammoth/mammoth.browser')).default;
  const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return normalizeExtractedText(result.value);
}

async function extractUploadedFileText(file: File): Promise<string> {
  const lowerName = file.name.toLowerCase();
  if (file.type === 'application/pdf' || lowerName.endsWith('.pdf')) return extractPdfText(file);
  if (file.type.startsWith('text/') || lowerName.endsWith('.txt') || lowerName.endsWith('.md')) {
    return normalizeExtractedText(await file.text());
  }
  if (lowerName.endsWith('.docx')) return extractDocxText(file);
  return PLACEHOLDER_TEXT;
}

export default function UploadCenter() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { uploads, addUpload, removeUpload, addActivity } = useData();
  const [dragOver, setDragOver] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const fileRef = useRef<HTMLInputElement>(null);

  // Process uploaded file
  const processFile = useCallback((file: File) => {
    const id = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    const newFile: UploadedFile = {
      id,
      name: file.name,
      type: isImage ? 'image' : isPdf ? 'pdf' : 'document',
      size: file.size,
      url: '',
      uploadedAt: new Date().toISOString(),
      status: 'uploading',
    };

    // Create preview for images
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newFile.preview = e.target?.result as string;
        newFile.url = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }

    addUpload(newFile);

    // Simulate processing
    setTimeout(() => {
      const updated: UploadedFile = {
        ...newFile,
        status: 'processing',
      };
      // We update via removing and re-adding (simplified)
      removeUpload(id);
      addUpload(updated);

      setTimeout(async () => {
        let extractedText = PLACEHOLDER_TEXT;
        let status: UploadedFile['status'] = 'completed';
        let aiAnalysis = `Indexed ${file.name}.`;

        try {
          extractedText = await extractUploadedFileText(file);
          if (!isReadable(extractedText)) {
            extractedText = PLACEHOLDER_TEXT;
            aiAnalysis = 'No readable text was extracted. Scanned PDFs/images need OCR before RAG can answer from them.';
          } else {
            aiAnalysis = `Readable text extracted from ${file.name}. The document is ready for RAG retrieval.`;
          }
        } catch (error) {
          status = 'error';
          extractedText = `Could not parse ${file.name}. ${error instanceof Error ? error.message : 'Unknown parsing error.'}`;
          aiAnalysis = 'Parsing failed. Try a text-based PDF, TXT, or DOCX file.';
        }

        const completed: UploadedFile = {
          ...updated,
          status,
          extractedText,
          aiAnalysis,
          summary: isReadable(extractedText)
            ? normalizeExtractedText(extractedText).split(/(?<=[.!?])\s+/).slice(0, 3).join(' ')
            : undefined,
        };
        removeUpload(id);
        addUpload(completed);

        addActivity({
          id: Date.now().toString(),
          type: 'upload',
          title: `File Uploaded: ${file.name}`,
          description: `${isImage ? 'Image' : isPdf ? 'PDF' : 'Document'} • ${formatSize(file.size)}`,
          timestamp: new Date().toISOString(),
          icon: isImage ? '🖼️' : isPdf ? '📄' : '📁',
        });
      }, 2000);
    }, 1500);
  }, [addUpload, removeUpload, addActivity]);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  }, [processFile]);

  // Handle file input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(processFile);
    e.target.value = '';
  };

  // Filter uploads
  const filteredUploads = uploads.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || f.type === filterType;
    return matchesSearch && matchesType;
  });

  const cardClass = `rounded-2xl border ${isDark ? 'bg-dark-800 border-dark-600' : 'bg-white border-gray-200'}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
            <Upload size={24} className="text-white" />
          </div>
          {t('upload.title')}
        </h1>
        <p className={`mt-2 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
          Upload PDFs, images, and documents for AI processing
        </p>
      </motion.div>

      {/* Upload Zone */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`${cardClass} p-10 sm:p-16 text-center cursor-pointer transition-all border-2 border-dashed ${
            dragOver
              ? 'border-primary-400 bg-primary-500/10 scale-[1.01]'
              : isDark
              ? 'border-dark-500 hover:border-primary-500/50'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          <motion.div
            animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 mb-4"
          >
            <Upload size={40} className="text-primary-400" />
          </motion.div>
          <p className="text-xl font-semibold mb-2">{t('upload.dragDrop')}</p>
          <p className={`text-sm mb-4 ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
            {t('upload.supported')} • Max 50MB per file
          </p>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium text-sm hover:shadow-lg transition-all">
            {t('upload.browse')}
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </motion.div>

      {/* File List Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <HardDrive size={20} className="text-primary-400" />
          <h2 className="text-lg font-semibold">
            Uploaded Files ({uploads.length})
          </h2>
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
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm ${
              isDark ? 'bg-dark-700 border-dark-500 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="pdf">PDFs</option>
            <option value="document">Documents</option>
          </select>
        </div>
      </div>

      {/* File Grid */}
      <AnimatePresence>
        {filteredUploads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUploads.map((file, i) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className={`${cardClass} overflow-hidden group`}
              >
                {/* Preview */}
                <div className={`h-32 flex items-center justify-center relative ${isDark ? 'bg-dark-700' : 'bg-gray-50'}`}>
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                  ) : file.type === 'pdf' ? (
                    <FileText size={48} className="text-red-400 opacity-50" />
                  ) : file.type === 'image' ? (
                    <Image size={48} className="text-blue-400 opacity-50" />
                  ) : (
                    <File size={48} className={`${isDark ? 'text-dark-400' : 'text-gray-300'}`} />
                  )}

                  {/* Status badge */}
                  <div className="absolute top-2 right-2">
                    {file.status === 'uploading' && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
                        <Loader2 size={12} className="animate-spin" /> Uploading
                      </span>
                    )}
                    {file.status === 'processing' && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                        <Clock size={12} /> Processing
                      </span>
                    )}
                    {file.status === 'completed' && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">
                        <Check size={12} /> Ready
                      </span>
                    )}
                    {file.status === 'error' && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
                        <AlertCircle size={12} /> Error
                      </span>
                    )}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeUpload(file.id)}
                    className="absolute top-2 left-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* File info */}
                <div className="p-4">
                  <p className="font-medium text-sm truncate" title={file.name}>{file.name}</p>
                  <div className={`flex items-center justify-between mt-2 text-xs ${isDark ? 'text-dark-300' : 'text-gray-500'}`}>
                    <span>{file.type.toUpperCase()}</span>
                    <span>{formatSize(file.size)}</span>
                  </div>
                  {file.status === 'completed' && (
                    <div className="mt-2 flex gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 text-xs">AI Ready</span>
                      {file.extractedText && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs">OCR ✓</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`${cardClass} p-12 text-center`}>
            <Upload size={48} className={`mx-auto mb-4 ${isDark ? 'text-dark-400' : 'text-gray-300'}`} />
            <p className={`font-medium ${isDark ? 'text-dark-200' : 'text-gray-600'}`}>
              {searchQuery ? 'No files match your search' : 'No files uploaded yet'}
            </p>
            <p className={`text-sm mt-1 ${isDark ? 'text-dark-400' : 'text-gray-400'}`}>
              Drag & drop files above to get started
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Format file size
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
