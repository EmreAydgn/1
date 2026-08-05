import React, { useState, useMemo, useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  BookOpen, 
  Sparkles, 
  Feather, 
  ArrowRight, 
  Check, 
  Layers, 
  FileText, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  Info,
  ChevronDown,
  Sparkle,
  Bookmark,
  Share2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BlogPost } from '../types';
import { getAuthorInitials } from '../utils/authorUtils';
import { BirAdaLogo } from './BirAdaLogo';

interface PdfMagazineModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
}

type PageFormat = 'a5' | 'a4';
type ViewFilter = 'all' | 'cover' | 'toc' | 'articles';

// Helper to parse inline markdown (**bold**, *italic*, `code`) safely into React elements
const parseInlineMarkdown = (text: string): React.ReactNode => {
  if (!text) return '';
  
  const cleanSource = text.replace(/^#{1,6}\s+/, '');
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(cleanSource)) !== null) {
    if (match.index > lastIndex) {
      parts.push(cleanSource.substring(lastIndex, match.index));
    }

    const str = match[0];
    if (str.startsWith('**') && str.endsWith('**')) {
      const content = str.slice(2, -2);
      parts.push(
        <strong key={`b-${key++}`} className="font-bold text-[#1A1A1A]">
          {content}
        </strong>
      );
    } else if (str.startsWith('*') && str.endsWith('*')) {
      const content = str.slice(1, -1);
      parts.push(
        <em key={`i-${key++}`} className="italic opacity-90">
          {content}
        </em>
      );
    } else if (str.startsWith('`') && str.endsWith('`')) {
      const content = str.slice(1, -1);
      parts.push(
        <code key={`c-${key++}`} className="bg-[#EBE8E0] px-1 py-0.5 rounded text-[10px] font-mono text-[#8C6A43]">
          {content}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < cleanSource.length) {
    parts.push(cleanSource.substring(lastIndex));
  }

  return parts.length > 0 ? parts : cleanSource;
};

// Helper to parse Markdown tables
const renderMarkdownTable = (tableLines: string[], keyPrefix: string) => {
  if (tableLines.length < 2) return null;

  // Filter out separator line like | :--- | :--- |
  const dataLines = tableLines.filter(line => !line.trim().match(/^\|(\s*:?-+:?\s*\|)+$/));
  if (dataLines.length === 0) return null;

  const headerCells = dataLines[0]
    .split('|')
    .slice(1, -1)
    .map(c => c.trim());

  const bodyRows = dataLines.slice(1).map(line =>
    line
      .split('|')
      .slice(1, -1)
      .map(c => c.trim())
  );

  return (
    <div key={keyPrefix} className="my-2.5 overflow-hidden rounded-md border border-[#1A1A1A]/20 bg-[#FDFBF7] shadow-xs">
      <table className="w-full text-left text-[10px] sm:text-[11px] leading-tight font-serif-newsreader">
        <thead className="bg-[#1A1A1A] text-white">
          <tr>
            {headerCells.map((header, i) => (
              <th key={i} className="py-1.5 px-2 font-bold font-sans-body uppercase tracking-wider text-[8.5px] sm:text-[9.5px]">
                {parseInlineMarkdown(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1A1A1A]/10">
          {bodyRows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-transparent' : 'bg-[#1A1A1A]/[0.03]'}>
              {row.map((cell, ci) => (
                <td key={ci} className="py-1.5 px-2 text-[#1A1A1A]/90 align-top">
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Comprehensive Markdown Chunk Renderer tailored for high-density, crisp magazine pages
const renderMagazineMarkdownChunk = (content: string, chunkKey: string) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;
  let listBuffer: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' = 'ul';

  const flushTable = (idx: number) => {
    if (tableBuffer.length > 0) {
      elements.push(renderMarkdownTable(tableBuffer, `${chunkKey}-tbl-${idx}`));
      tableBuffer = [];
      inTable = false;
    }
  };

  const flushList = (idx: number) => {
    if (listBuffer.length > 0) {
      elements.push(
        listType === 'ul' ? (
          <ul key={`${chunkKey}-ul-${idx}`} className="my-2 space-y-1 pl-3 text-[11px] sm:text-xs leading-snug font-serif-newsreader text-[#1A1A1A]/90">
            {listBuffer.map((item, li) => (
              <li key={li} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-[#D4A373] before:font-bold">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        ) : (
          <ol key={`${chunkKey}-ol-${idx}`} className="my-2 space-y-1 pl-4 text-[11px] sm:text-xs leading-snug font-serif-newsreader text-[#1A1A1A]/90 list-decimal">
            {listBuffer.map((item, li) => (
              <li key={li} className="pl-1">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        )
      );
      listBuffer = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check Table
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(idx);
      inTable = true;
      tableBuffer.push(trimmed);
      return;
    } else if (inTable) {
      flushTable(idx);
    }

    // Check Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushTable(idx);
      if (!inList || listType !== 'ul') {
        flushList(idx);
        inList = true;
        listType = 'ul';
      }
      listBuffer.push(trimmed.substring(2));
      return;
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushTable(idx);
      if (!inList || listType !== 'ol') {
        flushList(idx);
        inList = true;
        listType = 'ol';
      }
      listBuffer.push(trimmed.replace(/^\d+\.\s/, ''));
      return;
    } else if (inList) {
      flushList(idx);
    }

    if (!trimmed) {
      return;
    }

    // Check Headers
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h2 key={`${chunkKey}-h1-${idx}`} className="text-base sm:text-lg font-serif-cormorant font-bold text-[#1A1A1A] mt-3 mb-1.5 leading-snug tracking-tight border-b border-[#1A1A1A]/15 pb-1">
          {parseInlineMarkdown(trimmed.replace(/^#\s*/, ''))}
        </h2>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={`${chunkKey}-h2-${idx}`} className="text-xs sm:text-sm font-serif-cormorant font-bold text-[#1A1A1A] mt-2.5 mb-1 leading-snug flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shrink-0" />
          <span>{parseInlineMarkdown(trimmed.replace(/^##\s*/, ''))}</span>
        </h3>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={`${chunkKey}-h3-${idx}`} className="text-[11px] sm:text-xs font-serif-cormorant font-bold text-[#8C6A43] mt-2 mb-0.5 leading-snug">
          {parseInlineMarkdown(trimmed.replace(/^###\s*/, ''))}
        </h4>
      );
    } else if (trimmed.startsWith('#### ')) {
      elements.push(
        <h5 key={`${chunkKey}-h4-${idx}`} className="text-[10px] sm:text-[11px] font-sans font-bold text-[#1A1A1A] mt-1.5 mb-0.5 leading-snug flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#8C6A43] shrink-0" />
          <span>{parseInlineMarkdown(trimmed.replace(/^####\s*/, ''))}</span>
        </h5>
      );
    } else if (trimmed.startsWith('##### ')) {
      elements.push(
        <h6 key={`${chunkKey}-h5-${idx}`} className="text-[9.5px] sm:text-[10px] font-sans font-semibold text-[#59524B] mt-1 mb-0.5 leading-snug">
          {parseInlineMarkdown(trimmed.replace(/^#####\s*/, ''))}
        </h6>
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={`${chunkKey}-quote-${idx}`} className="my-2 py-1.5 px-3 bg-[#1A1A1A]/[0.03] border-l-2 border-[#D4A373] italic font-serif-newsreader text-[11px] sm:text-xs text-[#1A1A1A]/85 rounded-r">
          {parseInlineMarkdown(trimmed.replace(/^>\s*/, ''))}
        </blockquote>
      );
    } else if (trimmed.startsWith('![') && trimmed.includes('](') && trimmed.endsWith(')')) {
      const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        elements.push(
          <div key={`${chunkKey}-img-${idx}`} className="my-2 rounded-lg overflow-hidden border border-[#1A1A1A]/15 bg-[#FDFBF7]">
            <img src={src} alt={alt} crossOrigin="anonymous" referrerPolicy="no-referrer" className="w-full h-auto max-h-[140px] object-cover" />
            {alt && <p className="text-[8px] font-sans-body italic text-[#1A1A1A]/70 text-center py-1 bg-[#F5EFEB]/50 border-t border-[#1A1A1A]/10">{alt}</p>}
          </div>
        );
      }
    } else if (trimmed === '---') {
      elements.push(
        <div key={`${chunkKey}-hr-${idx}`} className="my-2.5 flex items-center justify-center gap-2 text-[#D4A373]/50">
          <div className="h-[1px] bg-[#1A1A1A]/15 flex-1" />
          <span className="text-[10px]">❖</span>
          <div className="h-[1px] bg-[#1A1A1A]/15 flex-1" />
        </div>
      );
    } else {
      elements.push(
        <p key={`${chunkKey}-p-${idx}`} className="mb-2 font-serif-newsreader text-[11px] sm:text-[12px] leading-relaxed text-[#1A1A1A]/90 text-justify">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushTable(lines.length);
  flushList(lines.length);

  return elements;
};

// Article page model to fit strictly on A5/A4 magazine pages
interface ArticlePage {
  pageType: 'article-lead' | 'article-body' | 'article-conclusion';
  post: BlogPost;
  articlePageIndex: number; // 1-based index within article (1, 2, or 3)
  totalArticlePages: number;
  overallPageNumber: number; // overall magazine page
  leadContent?: string;
  bodyContent?: string;
  hasCoverImage?: boolean;
}

export const PdfMagazineModal: React.FC<PdfMagazineModalProps> = ({
  isOpen,
  onClose,
  posts,
}) => {
  const [activeFormat, setActiveFormat] = useState<PageFormat>('a5');
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');
  const [selectedPostId, setSelectedPostId] = useState<string>('all');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number; text: string }>({
    current: 0,
    total: 0,
    text: '',
  });
  const [printFormat, setPrintFormat] = useState<PageFormat>('a4');
  const [isPreparingPrint, setIsPreparingPrint] = useState<boolean>(false);

  const magazineContainerRef = useRef<HTMLDivElement>(null);

  // Split each article intelligently into 2 or 3 magazine pages
  const { allArticlePages, postPageMapping, totalMagazinePages } = useMemo(() => {
    let currentPage = 3; // Page 1 is Cover, Page 2 is Table of Contents
    const pages: ArticlePage[] = [];
    const mapping: Record<string, number> = {};

    posts.forEach((post) => {
      mapping[post.id] = currentPage;
      const content = post.content || '';

      // Separate title header if exists
      const cleanContent = content.replace(/^#\s+[^\n]+\n+/, '').trim();
      const sections = cleanContent.split(/(?=\n##\s+)/);

      // Decide if article needs 2 or 3 pages based on length / tables
      const isLongArticle = sections.length >= 4 || cleanContent.length > 2400 || cleanContent.includes('| :---');
      const totalPages = isLongArticle ? 3 : 2;

      if (totalPages === 2) {
        // Page 1: Lead
        const leadChunk = sections.slice(0, 2).join('\n\n');
        pages.push({
          pageType: 'article-lead',
          post,
          articlePageIndex: 1,
          totalArticlePages: 2,
          overallPageNumber: currentPage++,
          leadContent: leadChunk,
          hasCoverImage: true,
        });

        // Page 2: Body & Sign-off
        const bodyChunk = sections.slice(2).join('\n\n');
        pages.push({
          pageType: 'article-conclusion',
          post,
          articlePageIndex: 2,
          totalArticlePages: 2,
          overallPageNumber: currentPage++,
          bodyContent: bodyChunk || sections[sections.length - 1] || '',
        });
      } else {
        // Page 1: Lead & Hero
        const leadChunk = sections.slice(0, 2).join('\n\n');
        pages.push({
          pageType: 'article-lead',
          post,
          articlePageIndex: 1,
          totalArticlePages: 3,
          overallPageNumber: currentPage++,
          leadContent: leadChunk,
          hasCoverImage: true,
        });

        // Page 2: Core Deep Dive
        const midChunk = sections.slice(2, 4).join('\n\n');
        pages.push({
          pageType: 'article-body',
          post,
          articlePageIndex: 2,
          totalArticlePages: 3,
          overallPageNumber: currentPage++,
          bodyContent: midChunk,
        });

        // Page 3: Tables, Takeaways & Conclusion
        const endChunk = sections.slice(4).join('\n\n');
        pages.push({
          pageType: 'article-conclusion',
          post,
          articlePageIndex: 3,
          totalArticlePages: 3,
          overallPageNumber: currentPage++,
          bodyContent: endChunk || sections[sections.length - 1] || '',
        });
      }
    });

    return {
      allArticlePages: pages,
      postPageMapping: mapping,
      totalMagazinePages: currentPage - 1,
    };
  }, [posts]);

  // Filtered pages for preview
  const displayPages = useMemo(() => {
    if (selectedPostId !== 'all') {
      return allArticlePages.filter((p) => p.post.id === selectedPostId);
    }
    if (viewFilter === 'cover') return [];
    if (viewFilter === 'toc') return [];
    return allArticlePages;
  }, [allArticlePages, selectedPostId, viewFilter]);

  if (!isOpen) return null;

  // Direct A5 Multi-Page PDF Download Engine (jsPDF + html2canvas)
  const handleDownloadA5Pdf = async () => {
    setIsGeneratingPdf(true);
    setPdfProgress({ current: 0, total: 0, text: 'A5 Sayfaları taranıyor...' });

    try {
      // Find all rendered printable page nodes
      const pageNodes = document.querySelectorAll<HTMLElement>('.magazine-pdf-page');
      if (!pageNodes || pageNodes.length === 0) {
        alert('Dışa aktarılacak sayfa bulunamadı.');
        setIsGeneratingPdf(false);
        return;
      }

      const total = pageNodes.length;
      setPdfProgress({ current: 0, total, text: `0 / ${total} sayfa işleniyor...` });

      // Initialize jsPDF with A5 portrait dimensions (148mm x 210mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5',
        compress: true,
      });

      for (let i = 0; i < total; i++) {
        const pageNode = pageNodes[i];
        setPdfProgress({
          current: i + 1,
          total,
          text: `Sayfa ${i + 1} / ${total} yüksek çözünürlükte işleniyor...`,
        });

        // Use high-DPI scaling (2x) with smooth font rendering
        const canvas = await html2canvas(pageNode, {
          scale: 2.2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#FAF8F5',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage('a5', 'portrait');
        }

        // Exact A5 Dimensions in mm: 148 x 210
        pdf.addImage(imgData, 'JPEG', 0, 0, 148, 210, undefined, 'FAST');
      }

      setPdfProgress({ current: total, total, text: 'PDF Dosyası İndiriliyor...' });
      pdf.save('Bir_Ada_Dergisi_Sayi_01_A5.pdf');
    } catch (error) {
      console.error('PDF export error:', error);
      alert('A5 PDF indirilirken bir hata oluştu. Dilerseniz "A4 Yazdır" seçeneği ile tarayıcınızdan da PDF olarak kaydedebilirsiniz.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Dedicated A4 Print Trigger (Calibrated with @page size: A4)
  const handlePrintA4 = () => {
    setPrintFormat('a4');
    setIsPreparingPrint(true);
    setTimeout(() => {
      window.print();
      setIsPreparingPrint(false);
    }, 250);
  };

  // Dedicated A5 Print Trigger
  const handlePrintA5 = () => {
    setPrintFormat('a5');
    setIsPreparingPrint(true);
    setTimeout(() => {
      window.print();
      setIsPreparingPrint(false);
    }, 250);
  };

  return (
    <div className="pdf-modal-wrapper fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:bg-white print:p-0 print:static print:block print:overflow-visible">
      
      {/* Dynamic Print Stylesheet for Zero-Shift A4 & A5 Output */}
      <style>{`
        @media print {
          @page {
            size: ${printFormat === 'a4' ? 'A4 portrait' : 'A5 portrait'};
            margin: ${printFormat === 'a4' ? '8mm' : '6mm'};
          }

          body, html {
            background-color: #FAF8F5 !important;
            color: #1A1A1A !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          header, 
          footer, 
          nav, 
          main, 
          #mobile-submit-fab,
          .print\\:hidden,
          .print-hidden,
          .pdf-modal-controls {
            display: none !important;
          }

          .pdf-modal-wrapper {
            position: static !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
          }

          .pdf-modal-container {
            border: none !important;
            box-shadow: none !important;
            max-height: none !important;
            height: auto !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }

          /* Exact Page Boundaries for Printing */
          .magazine-pdf-page {
            width: ${printFormat === 'a4' ? '194mm' : '136mm'} !important;
            height: ${printFormat === 'a4' ? '281mm' : '198mm'} !important;
            min-height: ${printFormat === 'a4' ? '281mm' : '198mm'} !important;
            max-height: ${printFormat === 'a4' ? '281mm' : '198mm'} !important;
            margin: 0 auto !important;
            padding: ${printFormat === 'a4' ? '8mm 10mm' : '6mm 8mm'} !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            overflow: hidden !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            border: 1px solid rgba(26, 26, 26, 0.15) !important;
            background-color: #FAF8F5 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Main Modal Card */}
      <div className="pdf-modal-container bg-[#FAF8F5] w-full max-w-5xl rounded-2xl sm:rounded-3xl border border-[#1A1A1A]/20 shadow-2xl overflow-hidden flex flex-col max-h-[96vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none">
        
        {/* Top Header & Interactive Control Bar */}
        <div className="pdf-modal-controls bg-[#1A1A1A] text-white px-3 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 print:hidden border-b border-white/10 shrink-0">
          
          {/* Top Title & Close Bar */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <BirAdaLogo size="sm" showText={false} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-cormorant text-lg sm:text-xl font-bold tracking-tight text-white truncate">
                    BİR ADA — Özel PDF Dergi Sayısı
                  </h3>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-[#D4A373] text-[#1A1A1A] text-[10px] font-sans-body font-bold rounded-full uppercase tracking-wider">
                    Sayı 01 / 2026
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-sans-body text-white/60 truncate">
                  Toplam {totalMagazinePages} Sayfa • A5 Dergi Kitapçığı &amp; A4 Baskı Düzeni
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls Bar: Format Switcher, View Filters & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-white/10">
            
            {/* Format Preview Toggle (A5 vs A4) */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-full text-xs font-sans-body">
              <span className="text-[10px] text-white/50 px-2 font-medium hidden sm:inline">Format:</span>
              <button
                onClick={() => setActiveFormat('a5')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFormat === 'a5'
                    ? 'bg-[#D4A373] text-[#1A1A1A] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
                title="A5 Dergi Formatı (148 x 210 mm) - İndirme ve kitapçık için ideal"
              >
                <span>A5 Dergi (148×210mm)</span>
              </button>
              <button
                onClick={() => setActiveFormat('a4')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFormat === 'a4'
                    ? 'bg-[#D4A373] text-[#1A1A1A] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
                title="A4 Standart Format (210 x 297 mm) - Yazdırma için ideal"
              >
                <span>A4 Standart (210×297mm)</span>
              </button>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full text-xs font-sans-body overflow-x-auto">
              <button
                onClick={() => { setViewFilter('all'); setSelectedPostId('all'); }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewFilter === 'all' && selectedPostId === 'all'
                    ? 'bg-white text-[#1A1A1A] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Tüm Dergi ({totalMagazinePages} Sayfa)
              </button>
              <button
                onClick={() => { setViewFilter('cover'); setSelectedPostId('all'); }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewFilter === 'cover'
                    ? 'bg-white text-[#1A1A1A] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Kapak
              </button>
              <button
                onClick={() => { setViewFilter('toc'); setSelectedPostId('all'); }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewFilter === 'toc'
                    ? 'bg-white text-[#1A1A1A] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                İçindekiler
              </button>
            </div>

            {/* Action Buttons: A5 Download & A4 Print */}
            <div className="flex items-center gap-2 ml-auto">
              
              {/* A5 PDF Download Button */}
              <button
                onClick={handleDownloadA5Pdf}
                disabled={isGeneratingPdf}
                id="btn-download-a5-pdf"
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#D4A373] hover:bg-[#c49261] active:scale-95 text-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-wider font-sans-body transition-all shadow-md cursor-pointer disabled:opacity-50"
                title="Tüm dergiyi A5 formatında gerçek PDF olarak indir"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isGeneratingPdf ? 'İndiriliyor...' : 'A5 PDF İndir'}</span>
              </button>

              {/* A4 Print Button */}
              <button
                onClick={handlePrintA4}
                id="btn-print-a4"
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-white/20 hover:bg-white text-white hover:text-[#1A1A1A] active:scale-95 rounded-full text-xs font-bold uppercase tracking-wider font-sans-body transition-all border border-white/20 shadow-xs cursor-pointer"
                title="Tüm dergiyi A4 formatında sayfalar kaymadan yazdır"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>A4 Yazdır</span>
              </button>
            </div>

          </div>

          {/* Progress Banner during PDF generation */}
          {isGeneratingPdf && (
            <div className="bg-[#D4A373]/20 border border-[#D4A373]/40 rounded-xl p-2.5 flex items-center justify-between gap-3 text-xs text-[#FAF8F5]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-4 h-4 border-2 border-[#D4A373] border-t-transparent rounded-full animate-spin shrink-0" />
                <span className="font-medium truncate">{pdfProgress.text}</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#D4A373]">
                {pdfProgress.total > 0 ? Math.round((pdfProgress.current / pdfProgress.total) * 100) : 0}%
              </span>
            </div>
          )}

        </div>

        {/* Scrollable Magazine Pages Viewer */}
        <div 
          ref={magazineContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-[#EFECE6] print:bg-white print:p-0 print:overflow-visible space-y-6 sm:space-y-8"
        >
          
          {/* ================= PAGE 1: MAGAZINE COVER ================= */}
          {(viewFilter === 'all' || viewFilter === 'cover') && (
            <div 
              className={`magazine-pdf-page bg-[#FAF8F5] border-2 border-[#1A1A1A] p-5 sm:p-8 mx-auto shadow-xl flex flex-col justify-between transition-all ${
                activeFormat === 'a5' 
                  ? 'max-w-[560px] aspect-[148/210] min-h-[720px]' 
                  : 'max-w-[720px] aspect-[210/297] min-h-[900px]'
              }`}
            >
              {/* Masthead Header */}
              <div className="border-b-2 border-[#1A1A1A] pb-3 text-center">
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-sans-body uppercase tracking-[0.25em] font-bold text-[#1A1A1A]/70 mb-1.5">
                  <span>LONDRA • EDINBURGH • CARDIFF • BELFAST</span>
                  <span>SAYI 01 / 2026</span>
                  <span>ÖZEL BASKI</span>
                </div>
                
                <div className="flex justify-center my-2">
                  <BirAdaLogo size="md" showText={false} />
                </div>
                
                <h1 className="font-serif-cormorant text-4xl sm:text-6xl font-bold tracking-tighter text-[#1A1A1A] uppercase leading-none my-1">
                  BİR ADA
                </h1>
                
                <p className="font-serif-cormorant italic text-xs sm:text-base text-[#8C6A43] font-medium">
                  "Bir Arada, Bir Ada'da" • Britanya Online Dergi ve Yaşam Seçkisi
                </p>
              </div>

              {/* Cover Hero Feature */}
              <div className="my-3 sm:my-4 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                <div className="space-y-2 sm:space-y-3">
                  <span className="inline-block px-2.5 py-0.5 bg-[#1A1A1A] text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-sans-body font-bold rounded">
                    Özel Kapak Dosyası
                  </span>
                  
                  <h2 className="font-serif-cormorant text-xl sm:text-3xl font-bold leading-tight text-[#1A1A1A]">
                    Bir Arada, Bir Ada'da
                  </h2>
                  
                  <p className="font-serif-newsreader text-[11px] sm:text-xs text-[#1A1A1A]/80 leading-relaxed text-justify">
                    Londra'nın sisli sokaklarından İskoç Yaylaları'na; Birleşik Krallık'ta yaşayan toplumumuzun sesini, girişimcilik hikâyelerini, vize rehberlerini ve zengin kültür takvimini sayfalarımıza taşıyoruz.
                  </p>
                  
                  <div className="h-[2px] bg-[#D4A373] w-12 sm:w-16" />
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#1A1A1A]/20 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
                    alt="Londra Dergi Kapağı"
                    crossOrigin="anonymous"
                    className="w-full h-36 sm:h-52 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white">
                    <p className="font-serif-cormorant italic text-[10px] sm:text-xs text-center">
                      Thames Nehri ve Westminster • 2026 Koleksiyonu
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Bottom Teasers */}
              <div className="border-t-2 border-[#1A1A1A] pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-sans-body">
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">01. SPONSORLUK VİZESİ</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[10px] truncate">Avantajlar &amp; 60 Gün Kuralı</p>
                </div>
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">02. UK ETKİNLİKLER</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[10px] truncate">Londra Türk Konser &amp; Tiyatro</p>
                </div>
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">03. SHOREDITCH AI</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[10px] truncate">Türk Yapay Zeka Girişimi</p>
                </div>
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">04. ISA &amp; GAYRİMENKUL</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[10px] truncate">Vergisiz Yatırım &amp; Konut</p>
                </div>
              </div>

              {/* Cover Running Footer */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-sans-body text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                <span>ISSN 2814-9921 • BİRLEŞİK KRALLIK</span>
                <span className="font-serif-cormorant italic">Sayfa 1 (Kapak)</span>
              </div>
            </div>
          )}

          {/* ================= PAGE 2: TABLE OF CONTENTS & MANIFESTO ================= */}
          {(viewFilter === 'all' || viewFilter === 'toc') && (
            <div 
              className={`magazine-pdf-page bg-[#FAF8F5] border border-[#1A1A1A]/20 p-5 sm:p-8 mx-auto shadow-xl flex flex-col justify-between transition-all ${
                activeFormat === 'a5' 
                  ? 'max-w-[560px] aspect-[148/210] min-h-[720px]' 
                  : 'max-w-[720px] aspect-[210/297] min-h-[900px]'
              }`}
            >
              {/* Running Header */}
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2 text-[9px] sm:text-[10px] font-sans-body uppercase tracking-wider text-[#1A1A1A]/70">
                <span className="font-bold text-[#8C6A43]">BİR ADA DERGİSİ</span>
                <span>SAYI 01 / 2026 • DERGİ DİZİNİ</span>
                <span className="font-bold">SAYFA 2</span>
              </div>

              {/* Page Title */}
              <div className="my-2 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    İçindekiler &amp; Yayın Dizini
                  </h2>
                  <p className="font-serif-cormorant italic text-xs text-[#8C6A43]">
                    Bu Sayıda Yer Alan Özel Dosyalar ve Makaleler
                  </p>
                </div>
                <Feather className="w-5 h-5 text-[#8C6A43]/50" />
              </div>

              {/* Editorial Note */}
              <div className="p-3 bg-[#F4ECE1] rounded-lg border border-[#8C6A43]/20 text-[10.5px] sm:text-xs font-serif-newsreader text-[#1A1A1A]/85 leading-snug">
                <p className="italic">
                  "Değerli Okurlarımız; Londra'dan tüm Britanya'ya uzanan bu ilk dergi seçkimizde; göçmenlik ve sponsorluk rehberinden Shoreditch yapay zeka ekosistemine, Londra Türk etkinlik takviminden İskoçya rotalarına kadar Ada yaşamının tüm boyutlarını derledik. Keyifli okumalar dileriz."
                </p>
                <p className="text-right not-italic font-bold font-sans-body text-[9px] uppercase tracking-wider text-[#1A1A1A] mt-1">
                  — Bir Ada Yayın Kurulu, Londra
                </p>
              </div>

              {/* Numbered Table of Contents List */}
              <div className="my-2 space-y-1.5 divide-y divide-dashed divide-[#1A1A1A]/15 overflow-hidden">
                {posts.map((post, idx) => {
                  const targetPage = postPageMapping[post.id] || (idx * 2 + 3);
                  return (
                    <div 
                      key={post.id} 
                      className="pt-1.5 first:pt-0 flex items-baseline justify-between gap-2"
                    >
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="font-mono text-xs font-bold text-[#8C6A43] shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[8px] font-sans-body uppercase tracking-wider font-bold text-[#8C6A43] block">
                            {post.category}
                          </span>
                          <h4 className="font-serif-cormorant text-xs sm:text-sm font-bold text-[#1A1A1A] truncate leading-tight">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                      <span className="font-serif-cormorant italic text-xs text-[#1A1A1A]/70 shrink-0 font-bold">
                        Sayfa {targetPage}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Running Footer */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-sans-body text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                <span>BİR ADA • BİRLEŞİK KRALLIK BAĞIMSIZ YAYINCILIK</span>
                <span className="font-serif-cormorant italic">Sayfa 2</span>
              </div>
            </div>
          )}

          {/* ================= ARTICLES PAGES (Formatted in A5/A4 Pages) ================= */}
          {(viewFilter === 'all' || viewFilter === 'articles') && (
            displayPages.map((page, pIdx) => {
              const { post, articlePageIndex, totalArticlePages, overallPageNumber, pageType } = page;

              return (
                <div
                  key={`${post.id}-page-${articlePageIndex}`}
                  className={`magazine-pdf-page bg-[#FAF8F5] border border-[#1A1A1A]/20 p-5 sm:p-8 mx-auto shadow-xl flex flex-col justify-between transition-all ${
                    activeFormat === 'a5' 
                      ? 'max-w-[560px] aspect-[148/210] min-h-[720px]' 
                      : 'max-w-[720px] aspect-[210/297] min-h-[900px]'
                  }`}
                >
                  {/* Top Running Header */}
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-1.5 text-[8.5px] sm:text-[9.5px] font-sans-body uppercase tracking-wider text-[#1A1A1A]/70 shrink-0">
                    <span className="font-bold text-[#8C6A43]">{post.category}</span>
                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                      BİR ADA • {post.title}
                    </span>
                    <span className="font-bold">SAYFA {overallPageNumber}</span>
                  </div>

                  {/* PAGE CONTENT CONTAINER */}
                  <div className="flex-1 my-2 overflow-hidden flex flex-col justify-start">
                    
                    {/* If Page 1: Show Lead Header, Title, Cover Image, and Author */}
                    {pageType === 'article-lead' && (
                      <div className="space-y-2">
                        <div>
                          <h2 className="font-serif-cormorant text-lg sm:text-2xl font-bold text-[#1A1A1A] leading-tight mb-1">
                            {post.title}
                          </h2>
                          {post.subtitle && (
                            <p className="font-serif-cormorant italic text-[11px] sm:text-xs text-[#1A1A1A]/75 leading-snug mb-2">
                              {post.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Author byline */}
                        <div className="flex items-center justify-between text-[9px] font-sans-body text-[#1A1A1A]/65 border-y border-[#1A1A1A]/10 py-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#1A1A1A]">{post.author.name}</span>
                            <span>• {post.author.bio?.split('.')[0] || 'Bir Ada Yazarı'}</span>
                          </div>
                          <span>{post.readTimeMinutes} dk okuma • Londra</span>
                        </div>

                        {/* Featured Image */}
                        {post.coverImage && (
                          <div className="my-1 rounded-lg overflow-hidden border border-[#1A1A1A]/15 shadow-xs">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              crossOrigin="anonymous"
                              className="w-full h-28 sm:h-40 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                          </div>
                        )}

                        {/* Lead Content */}
                        <div className="mt-2">
                          {renderMagazineMarkdownChunk(page.leadContent || '', `${post.id}-lead`)}
                        </div>
                      </div>
                    )}

                    {/* If Page 2 (Body) or Page 3 (Conclusion) */}
                    {pageType !== 'article-lead' && (
                      <div className="space-y-1">
                        {renderMagazineMarkdownChunk(page.bodyContent || '', `${post.id}-body-${articlePageIndex}`)}

                        {/* Sign-off Seal on last page of article */}
                        {articlePageIndex === totalArticlePages && (
                          <div className="mt-3 pt-2 border-t border-[#1A1A1A]/15 flex items-center justify-between text-[9px] font-sans-body text-[#1A1A1A]/70 bg-[#1A1A1A]/[0.02] p-2 rounded">
                            <div className="flex items-center gap-1.5">
                              <BirAdaLogo size="sm" showText={false} />
                              <div>
                                <span className="font-bold text-[#1A1A1A] block">{post.author.name}</span>
                                <span className="text-[8px] text-[#8C6A43]">Bir Ada Kültür &amp; Araştırma Masası</span>
                              </div>
                            </div>
                            <span className="italic font-serif-cormorant text-[10px]">
                              "Bir Arada, Bir Ada'da"
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Bottom Running Footer */}
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-sans-body text-[#1A1A1A]/60 pt-1.5 border-t border-[#1A1A1A]/10 shrink-0">
                    <span>BİR ADA DERGİSİ • SAYI 01</span>
                    <span className="font-serif-cormorant italic text-[10px] font-bold">
                      Sayfa {overallPageNumber}
                    </span>
                  </div>
                </div>
              );
            })
          )}

        </div>

      </div>
    </div>
  );
};
