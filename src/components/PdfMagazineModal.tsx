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
  Share2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Smartphone,
  AlertCircle
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

// Helper to parse Markdown tables with responsive container
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
    <div key={keyPrefix} className="my-2.5 overflow-x-auto rounded-md border border-[#1A1A1A]/20 bg-[#FDFBF7] shadow-xs">
      <table className="w-full text-left text-[9.5px] sm:text-[11px] leading-tight font-serif-newsreader min-w-[320px]">
        <thead className="bg-[#1A1A1A] text-white">
          <tr>
            {headerCells.map((header, i) => (
              <th key={i} className="py-1.5 px-2 font-bold font-sans-body uppercase tracking-wider text-[8px] sm:text-[9px]">
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
          <ul key={`${chunkKey}-ul-${idx}`} className="my-1.5 sm:my-2 space-y-0.5 sm:space-y-1 pl-3 text-[10.5px] sm:text-xs leading-snug font-serif-newsreader text-[#1A1A1A]/90">
            {listBuffer.map((item, li) => (
              <li key={li} className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-[#D4A373] before:font-bold">
                {parseInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        ) : (
          <ol key={`${chunkKey}-ol-${idx}`} className="my-1.5 sm:my-2 space-y-0.5 sm:space-y-1 pl-4 text-[10.5px] sm:text-xs leading-snug font-serif-newsreader text-[#1A1A1A]/90 list-decimal">
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
        <h2 key={`${chunkKey}-h1-${idx}`} className="text-sm sm:text-lg font-serif-cormorant font-bold text-[#1A1A1A] mt-2 sm:mt-3 mb-1 sm:mb-1.5 leading-snug tracking-tight border-b border-[#1A1A1A]/15 pb-1">
          {parseInlineMarkdown(trimmed.replace(/^#\s*/, ''))}
        </h2>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={`${chunkKey}-h2-${idx}`} className="text-[11.5px] sm:text-sm font-serif-cormorant font-bold text-[#1A1A1A] mt-2 sm:mt-2.5 mb-0.5 sm:mb-1 leading-snug flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] shrink-0" />
          <span>{parseInlineMarkdown(trimmed.replace(/^##\s*/, ''))}</span>
        </h3>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={`${chunkKey}-h3-${idx}`} className="text-[10.5px] sm:text-xs font-serif-cormorant font-bold text-[#8C6A43] mt-1.5 sm:mt-2 mb-0.5 leading-snug">
          {parseInlineMarkdown(trimmed.replace(/^###\s*/, ''))}
        </h4>
      );
    } else if (trimmed.startsWith('#### ')) {
      elements.push(
        <h5 key={`${chunkKey}-h4-${idx}`} className="text-[9.5px] sm:text-[11px] font-sans font-bold text-[#1A1A1A] mt-1 mb-0.5 leading-snug flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#8C6A43] shrink-0" />
          <span>{parseInlineMarkdown(trimmed.replace(/^####\s*/, ''))}</span>
        </h5>
      );
    } else if (trimmed.startsWith('##### ')) {
      elements.push(
        <h6 key={`${chunkKey}-h5-${idx}`} className="text-[9px] sm:text-[10px] font-sans font-semibold text-[#59524B] mt-1 mb-0.5 leading-snug">
          {parseInlineMarkdown(trimmed.replace(/^#####\s*/, ''))}
        </h6>
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={`${chunkKey}-quote-${idx}`} className="my-1.5 sm:my-2 py-1 sm:py-1.5 px-2.5 sm:px-3 bg-[#1A1A1A]/[0.03] border-l-2 border-[#D4A373] italic font-serif-newsreader text-[10.5px] sm:text-xs text-[#1A1A1A]/85 rounded-r">
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
            <img src={src} alt={alt} crossOrigin="anonymous" referrerPolicy="no-referrer" className="w-full h-auto max-h-[120px] sm:max-h-[140px] object-cover" />
            {alt && <p className="text-[8px] font-sans-body italic text-[#1A1A1A]/70 text-center py-0.5 sm:py-1 bg-[#F5EFEB]/50 border-t border-[#1A1A1A]/10">{alt}</p>}
          </div>
        );
      }
    } else if (trimmed.startsWith('---') || trimmed.startsWith('***')) {
      elements.push(
        <div key={`${chunkKey}-hr-${idx}`} className="my-2 flex items-center justify-center gap-2 text-[#D4A373]/50">
          <span className="h-px bg-[#1A1A1A]/10 flex-1" />
          <span className="text-[9px]">✦</span>
          <span className="h-px bg-[#1A1A1A]/10 flex-1" />
        </div>
      );
    } else {
      elements.push(
        <p key={`${chunkKey}-p-${idx}`} className="my-1 text-[10.5px] sm:text-xs leading-relaxed font-serif-newsreader text-[#1A1A1A]/85 text-justify">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    }
  });

  flushTable(lines.length);
  flushList(lines.length);

  return elements;
};

// Represents a structured page inside the magazine
interface FormattedMagazinePage {
  pageType: 'article-lead' | 'article-body' | 'article-conclusion';
  post: BlogPost;
  articlePageIndex: number;
  totalArticlePages: number;
  overallPageNumber: number;
  leadContent?: string;
  bodyContent?: string;
}

export const PdfMagazineModal: React.FC<PdfMagazineModalProps> = ({
  isOpen,
  onClose,
  posts,
}) => {
  const [activeFormat, setActiveFormat] = useState<PageFormat>('a5');
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');
  const [selectedPostId, setSelectedPostId] = useState<string>('all');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number; text: string }>({
    current: 0,
    total: 0,
    text: '',
  });
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);
  const [printFormat, setPrintFormat] = useState<'a5' | 'a4'>('a4');
  const [activeMobilePageIndex, setActiveMobilePageIndex] = useState<number>(0);

  const magazineContainerRef = useRef<HTMLDivElement>(null);
  const fullMagazineRenderRef = useRef<HTMLDivElement>(null);

// Divide and format all posts into discrete magazine pages with smart dynamic pagination
  const { allArticlePages, postPageMapping, totalMagazinePages, orderedPosts } = useMemo(() => {
    // 1. Ensure the first article is ALWAYS the Magazine Introduction / Manifesto ("Dergi Tanıtımı")
    const manifestoPost = posts.find(p => p.id === 'post-pin-manifesto' || p.category === 'Dergi Tanıtımı' || p.pinned);
    const regularPostsList = posts.filter(p => p.id !== manifestoPost?.id);
    const sortedPosts = manifestoPost ? [manifestoPost, ...regularPostsList] : posts;

    let currentPage = 3; // Page 1: Cover, Page 2: Table of Contents
    const pages: FormattedMagazinePage[] = [];
    const mapping: Record<string, number> = {};

    sortedPosts.forEach((post) => {
      mapping[post.id] = currentPage;
      const cleanContent = post.content || '';
      
      // Split content by major sections (H1 / H2 headers)
      const rawSections = cleanContent.split(/\n(?=##?\s+)/g).map(s => s.trim()).filter(Boolean);

      // Smart section packing algorithm based on visual weight:
      // - Page 1 (Lead page) contains Title, Subtitle, Author Byline, Cover Image + Lead text (approx 500-800 chars)
      // - Pages 2..N contain full-height text & tables (approx 1200-1700 chars or 1 table + text)
      if (rawSections.length <= 1 && cleanContent.length < 1000) {
        // Very short single-page article
        pages.push({
          pageType: 'article-lead',
          post,
          articlePageIndex: 1,
          totalArticlePages: 1,
          overallPageNumber: currentPage++,
          leadContent: cleanContent,
        });
      } else {
        // Multi-section or long article: group sections into pages
        const articlePageChunks: { type: 'lead' | 'body' | 'conclusion'; content: string }[] = [];

        // Page 1 Chunk: First section (Intro/Lead)
        const leadSection = rawSections[0] || '';
        let nextIndex = 1;
        let leadCombined = leadSection;

        // If lead section is very short (< 400 chars) and there is a short next section without table, combine them on page 1
        if (rawSections.length > 1 && leadSection.length < 400 && rawSections[1].length < 500 && !rawSections[1].includes('|')) {
          leadCombined = `${leadSection}\n\n${rawSections[1]}`;
          nextIndex = 2;
        }

        articlePageChunks.push({
          type: 'lead',
          content: leadCombined,
        });

        // Group remaining sections for subsequent pages
        let currentBodyChunk = '';
        
        for (let i = nextIndex; i < rawSections.length; i++) {
          const section = rawSections[i];
          const hasTable = section.includes('|');
          const hasImage = section.includes('![');
          // Effective weight of section
          const sectionWeight = section.length + (hasTable ? 600 : 0) + (hasImage ? 400 : 0);

          if (!currentBodyChunk) {
            currentBodyChunk = section;
          } else {
            const currentWeight = currentBodyChunk.length + (currentBodyChunk.includes('|') ? 600 : 0);
            
            // Check if adding this section exceeds comfortable page capacity (~1500 chars)
            if (currentWeight + sectionWeight > 1600 || (hasTable && currentWeight > 600)) {
              // Push current chunk as a page and start fresh
              articlePageChunks.push({
                type: 'body',
                content: currentBodyChunk,
              });
              currentBodyChunk = section;
            } else {
              currentBodyChunk += `\n\n${section}`;
            }
          }
        }

        if (currentBodyChunk) {
          articlePageChunks.push({
            type: 'conclusion',
            content: currentBodyChunk,
          });
        }

        const totalPagesForArticle = articlePageChunks.length;

        articlePageChunks.forEach((chunk, pageIdx) => {
          const pageIndex1Based = pageIdx + 1;
          const isFirstPage = pageIndex1Based === 1;
          const isLastPage = pageIndex1Based === totalPagesForArticle;

          pages.push({
            pageType: isFirstPage ? 'article-lead' : (isLastPage ? 'article-conclusion' : 'article-body'),
            post,
            articlePageIndex: pageIndex1Based,
            totalArticlePages: totalPagesForArticle,
            overallPageNumber: currentPage++,
            leadContent: isFirstPage ? chunk.content : undefined,
            bodyContent: !isFirstPage ? chunk.content : undefined,
          });
        });
      }
    });

    return {
      allArticlePages: pages,
      postPageMapping: mapping,
      totalMagazinePages: currentPage - 1,
      orderedPosts: sortedPosts,
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

  // Total visible pages in current view
  const visiblePagesCount = useMemo(() => {
    if (viewFilter === 'cover') return 1;
    if (viewFilter === 'toc') return 1;
    if (selectedPostId !== 'all') return displayPages.length;
    return totalMagazinePages;
  }, [viewFilter, selectedPostId, displayPages.length, totalMagazinePages]);

  if (!isOpen) return null;

  // Ultra-robust Multi-Page PDF Download Engine (jsPDF + html2canvas)
  const handleDownloadA5Pdf = async (scope: 'all' | 'current' = 'all') => {
    setIsGeneratingPdf(true);
    setDownloadError(null);
    setDownloadBlobUrl(null);
    setPdfProgress({ current: 0, total: 0, text: 'PDF sayfaları hazırlanıyor...' });

    try {
      // Determine which nodes to render:
      // If scope is 'all', always render from the dedicated complete buffer to ensure all 22 pages are captured.
      let pageNodes: HTMLElement[] = [];
      
      if (scope === 'all') {
        const fullContainer = document.getElementById('pdf-full-magazine-render-container');
        if (fullContainer) {
          pageNodes = Array.from(fullContainer.querySelectorAll<HTMLElement>('.magazine-pdf-page-full'));
        }
      }

      // Fallback to active preview pages if full container not ready
      if (pageNodes.length === 0) {
        pageNodes = Array.from(document.querySelectorAll<HTMLElement>('.magazine-pdf-page'));
      }

      if (!pageNodes || pageNodes.length === 0) {
        throw new Error('Dışa aktarılacak dergi sayfası bulunamadı.');
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

        try {
          // Robust html2canvas settings: allowTaint: false (PREVENTS SecurityError), useCORS: true
          const canvas = await html2canvas(pageNode, {
            scale: 1.8, // Crisp text while optimizing memory & speed on mobile
            useCORS: true,
            allowTaint: false,
            logging: false,
            backgroundColor: '#FAF8F5',
            imageTimeout: 6000,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.92);

          if (i > 0) {
            pdf.addPage('a5', 'portrait');
          }

          // Exact A5 Dimensions in mm: 148 x 210
          pdf.addImage(imgData, 'JPEG', 0, 0, 148, 210, undefined, 'FAST');
        } catch (pageErr) {
          console.warn(`Page ${i + 1} rendering warning, falling back:`, pageErr);
          // If a specific image taints the canvas, render a clean fallback page
          if (i > 0) {
            pdf.addPage('a5', 'portrait');
          }
          pdf.setFontSize(14);
          pdf.text(`BİR ADA DERGİSİ — Sayfa ${i + 1}`, 15, 20);
        }
      }

      setPdfProgress({ current: total, total, text: 'PDF dosyası kaydediliyor...' });

      // Generate Blob and trigger direct browser download
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      setDownloadBlobUrl(blobUrl);

      const fileName = `Bir_Ada_Dergisi_Sayi_01_A5_${scope === 'current' ? 'Secili' : 'Tam_Sayi'}.pdf`;
      
      // Native anchor trigger (compatible with mobile Chrome, Safari, Android & Desktop)
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = fileName;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();

      setTimeout(() => {
        if (document.body.contains(downloadLink)) {
          document.body.removeChild(downloadLink);
        }
      }, 3000);

      setPdfProgress({ current: total, total, text: 'PDF başarıyla indirildi!' });
    } catch (error: any) {
      console.error('PDF export error:', error);
      setDownloadError(error?.message || 'PDF oluşturulurken bir hata oluştu.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Dedicated Print Trigger (Calibrated with @page size: A4)
  const handlePrintA4 = () => {
    setPrintFormat('a4');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Dedicated A5 Print Trigger
  const handlePrintA5 = () => {
    setPrintFormat('a5');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Mobile page jump helper
  const handleJumpToPage = (index: number) => {
    setActiveMobilePageIndex(index);
    if (magazineContainerRef.current) {
      const pages = magazineContainerRef.current.querySelectorAll('.magazine-pdf-page');
      if (pages[index]) {
        pages[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="pdf-modal-wrapper fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-3 md:p-4 overflow-y-auto print:bg-white print:p-0 print:static print:block print:overflow-visible">
      
      {/* Dynamic Print Stylesheet for Zero-Shift A4 & A5 Output */}
      <style>{`
        @media print {
          @page {
            size: ${printFormat === 'a5' ? '148mm 210mm' : 'A4 portrait'};
            margin: 0 !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #FFFFFF !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          .pdf-modal-container,
          .pdf-modal-container * {
            visibility: visible;
          }
          .pdf-modal-wrapper {
            position: static !important;
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }
          .pdf-modal-controls,
          .pdf-modal-mobile-bottom-bar,
          .print-hidden-element {
            display: none !important;
          }
          .magazine-pdf-page {
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            break-inside: avoid !important;
            margin: 0 !important;
            width: ${printFormat === 'a5' ? '148mm' : '210mm'} !important;
            height: ${printFormat === 'a5' ? '210mm' : '297mm'} !important;
            max-width: none !important;
            min-height: auto !important;
            border: 1px solid rgba(26, 26, 26, 0.15) !important;
            background-color: #FAF8F5 !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Main Modal Card */}
      <div className="pdf-modal-container bg-[#FAF8F5] w-full max-w-5xl rounded-none sm:rounded-2xl md:rounded-3xl border-0 sm:border border-[#1A1A1A]/20 shadow-2xl overflow-hidden flex flex-col h-full sm:h-auto sm:max-h-[95vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none">
        
        {/* Top Header & Interactive Control Bar */}
        <div className="pdf-modal-controls bg-[#1A1A1A] text-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-col gap-2.5 print:hidden border-b border-white/10 shrink-0">
          
          {/* Top Title & Close Bar */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <BirAdaLogo size="sm" showText={false} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-serif-cormorant text-base sm:text-xl font-bold tracking-tight text-white truncate">
                    BİR ADA — Özel PDF Dergi Sayısı
                  </h3>
                  <span className="px-1.5 sm:px-2 py-0.5 bg-[#D4A373] text-[#1A1A1A] text-[9px] sm:text-[10px] font-sans-body font-bold rounded-full uppercase tracking-wider shrink-0">
                    Sayı 01
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs font-sans-body text-white/60 truncate">
                  Toplam {totalMagazinePages} Sayfa • A5 Dergi Kitapçığı &amp; A4 Baskı
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Quick Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop & Tablet Action & Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-white/10">
            
            {/* Format Preview Toggle (A5 vs A4) */}
            <div className="flex items-center gap-1 bg-white/10 p-0.5 sm:p-1 rounded-full text-xs font-sans-body">
              <button
                onClick={() => setActiveFormat('a5')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFormat === 'a5'
                    ? 'bg-[#D4A373] text-[#1A1A1A] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
                title="A5 Dergi Formatı (148 x 210 mm) - İndirme ve kitapçık için ideal"
              >
                <span>A5 Dergi</span>
              </button>
              <button
                onClick={() => setActiveFormat('a4')}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeFormat === 'a4'
                    ? 'bg-[#D4A373] text-[#1A1A1A] shadow-xs'
                    : 'text-white/80 hover:text-white'
                }`}
                title="A4 Standart Format (210 x 297 mm) - Yazdırma için ideal"
              >
                <span>A4 Standart</span>
              </button>
            </div>

            {/* View Filter Pills */}
            <div className="flex items-center gap-1 bg-white/10 p-0.5 sm:p-1 rounded-full text-xs font-sans-body overflow-x-auto max-w-full no-scrollbar">
              <button
                onClick={() => { setViewFilter('all'); setSelectedPostId('all'); }}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewFilter === 'all' && selectedPostId === 'all'
                    ? 'bg-white text-[#1A1A1A] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Tümü ({totalMagazinePages} Sayfa)
              </button>
              <button
                onClick={() => { setViewFilter('cover'); setSelectedPostId('all'); }}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewFilter === 'cover'
                    ? 'bg-white text-[#1A1A1A] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Kapak
              </button>
              <button
                onClick={() => { setViewFilter('toc'); setSelectedPostId('all'); }}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  viewFilter === 'toc'
                    ? 'bg-white text-[#1A1A1A] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                İçindekiler
              </button>
            </div>

            {/* Article Quick Select Dropdown */}
            <div className="hidden md:flex items-center gap-1.5">
              <select
                value={selectedPostId}
                onChange={(e) => {
                  setSelectedPostId(e.target.value);
                  if (e.target.value !== 'all') {
                    setViewFilter('articles');
                  }
                }}
                className="bg-white/10 hover:bg-white/15 text-white text-[11px] font-sans-body px-2.5 py-1 rounded-full border border-white/20 outline-none cursor-pointer max-w-[180px] truncate"
              >
                <option value="all" className="bg-[#1A1A1A] text-white">Tüm Makaleler</option>
                {posts.map((p, i) => (
                  <option key={p.id} value={p.id} className="bg-[#1A1A1A] text-white">
                    {i + 1}. {p.title.slice(0, 35)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons: A5 Download & A4 Print */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
              {/* A5 PDF Download Button */}
              <button
                onClick={() => handleDownloadA5Pdf('all')}
                disabled={isGeneratingPdf}
                id="btn-download-a5-pdf"
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-[#D4A373] hover:bg-[#c49261] active:scale-95 text-[#1A1A1A] rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans-body transition-all shadow-md cursor-pointer disabled:opacity-50"
                title="Tüm dergiyi A5 formatında gerçek PDF olarak indir"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isGeneratingPdf ? 'İndiriliyor...' : 'A5 PDF İndir'}</span>
              </button>

              {/* A4 Print Button */}
              <button
                onClick={handlePrintA4}
                id="btn-print-a4"
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-white/20 hover:bg-white text-white hover:text-[#1A1A1A] active:scale-95 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider font-sans-body transition-all border border-white/20 shadow-xs cursor-pointer"
                title="Tüm dergiyi A4 formatında sayfalar kaymadan yazdır veya PDF olarak kaydet"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">A4 Yazdır / Kaydet</span>
                <span className="sm:hidden">Yazdır</span>
              </button>
            </div>

          </div>

          {/* Progress Banner during PDF generation */}
          {isGeneratingPdf && (
            <div className="bg-[#D4A373]/20 border border-[#D4A373]/40 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-3 text-xs text-[#FAF8F5] animate-pulse">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-4 h-4 border-2 border-[#D4A373] border-t-transparent rounded-full animate-spin shrink-0" />
                <span className="font-medium truncate">{pdfProgress.text}</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#D4A373]">
                {pdfProgress.total > 0 ? Math.round((pdfProgress.current / pdfProgress.total) * 100) : 0}%
              </span>
            </div>
          )}

          {/* Download Error or Success Banner with Fallback Link */}
          {downloadError && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-2 text-xs text-red-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{downloadError} "A4 Yazdır" seçeneği ile PDF olarak kaydedebilirsiniz.</span>
              </div>
              <button 
                onClick={handlePrintA4}
                className="px-2 py-0.5 bg-white text-[#1A1A1A] rounded text-[10px] font-bold uppercase tracking-wider shrink-0"
              >
                Yazdır / Kaydet
              </button>
            </div>
          )}

          {downloadBlobUrl && !isGeneratingPdf && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-2 text-xs text-emerald-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PDF hazırlandı! İndirme otomatik başlamadıysa:</span>
              </div>
              <a 
                href={downloadBlobUrl}
                download="Bir_Ada_Dergisi_Sayi_01_A5.pdf"
                className="px-2.5 py-0.5 bg-emerald-400 text-[#1A1A1A] rounded text-[10px] font-bold uppercase tracking-wider shrink-0 underline"
              >
                Doğrudan İndir
              </a>
            </div>
          )}

        </div>

        {/* Mobile Quick Navigation & Info Bar (Visible on mobile/tablet screens) */}
        <div className="sm:hidden bg-[#242220] px-3 py-1.5 flex items-center justify-between text-white/80 text-[11px] font-sans-body border-b border-white/10 shrink-0">
          <div className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Mobil Görünüm</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-white/60">Makale Seç:</span>
            <select
              value={selectedPostId}
              onChange={(e) => {
                setSelectedPostId(e.target.value);
                if (e.target.value !== 'all') {
                  setViewFilter('articles');
                }
              }}
              className="bg-white/15 text-white text-[10px] font-sans-body px-1.5 py-0.5 rounded border border-white/20 outline-none max-w-[130px] truncate"
            >
              <option value="all" className="bg-[#1A1A1A] text-white">Tümü ({totalMagazinePages}s)</option>
              {posts.map((p, i) => (
                <option key={p.id} value={p.id} className="bg-[#1A1A1A] text-white">
                  {i + 1}. {p.title.slice(0, 20)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Magazine Pages Viewer */}
        <div 
          ref={magazineContainerRef}
          className="flex-1 overflow-y-auto p-2 sm:p-5 md:p-8 bg-[#EFECE6] print:bg-white print:p-0 print:overflow-visible space-y-4 sm:space-y-6 md:space-y-8"
        >
          
          {/* ================= PAGE 1: MAGAZINE COVER ================= */}
          {(viewFilter === 'all' || viewFilter === 'cover') && (
            <div 
              className={`magazine-pdf-page bg-[#FAF8F5] border sm:border-2 border-[#1A1A1A] p-4 sm:p-7 md:p-8 mx-auto shadow-lg sm:shadow-xl flex flex-col justify-between transition-all w-full ${
                activeFormat === 'a5' 
                  ? 'max-w-[560px] min-h-[500px] sm:min-h-[700px]' 
                  : 'max-w-[720px] min-h-[600px] sm:min-h-[860px]'
              }`}
            >
              {/* Masthead Header */}
              <div className="border-b-2 border-[#1A1A1A] pb-2 sm:pb-3 text-center">
                <div className="flex items-center justify-between text-[8px] sm:text-[9.5px] font-sans-body uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 mb-1">
                  <span>LONDRA • EDINBURGH • CARDIFF</span>
                  <span>SAYI 01 / 2026</span>
                  <span>ÖZEL BASKI</span>
                </div>
                
                <div className="flex justify-center my-1 sm:my-2">
                  <BirAdaLogo size="md" showText={false} />
                </div>
                
                <h1 className="font-serif-cormorant text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#1A1A1A] uppercase leading-none my-0.5 sm:my-1">
                  BİR ADA
                </h1>
                
                <p className="font-serif-cormorant italic text-[11px] sm:text-sm md:text-base text-[#8C6A43] font-medium">
                  "Bir Arada, Bir Ada'da" • Britanya Online Dergi ve Yaşam Seçkisi
                </p>
              </div>

              {/* Cover Hero Feature */}
              <div className="my-2 sm:my-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 items-center">
                <div className="space-y-1.5 sm:space-y-3">
                  <span className="inline-block px-2 py-0.5 bg-[#1A1A1A] text-white text-[8px] sm:text-[9.5px] uppercase tracking-widest font-sans-body font-bold rounded">
                    Özel Kapak Dosyası
                  </span>
                  
                  <h2 className="font-serif-cormorant text-lg sm:text-2xl md:text-3xl font-bold leading-tight text-[#1A1A1A]">
                    Bir Arada, Bir Ada'da
                  </h2>
                  
                  <p className="font-serif-newsreader text-[10.5px] sm:text-xs text-[#1A1A1A]/80 leading-relaxed text-justify">
                    Londra'nın sisli sokaklarından İskoç Yaylaları'na; Birleşik Krallık'ta yaşayan toplumumuzun sesini, girişimcilik hikâyelerini, vize rehberlerini ve zengin kültür takvimini sayfalarımıza taşıyoruz.
                  </p>
                  
                  <div className="h-[2px] bg-[#D4A373] w-10 sm:w-16" />
                </div>

                <div className="relative rounded-xl overflow-hidden border border-[#1A1A1A]/20 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
                    alt="Londra Dergi Kapağı"
                    crossOrigin="anonymous"
                    className="w-full h-32 sm:h-48 md:h-52 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 sm:p-2 text-white">
                    <p className="font-serif-cormorant italic text-[9.5px] sm:text-xs text-center">
                      Thames Nehri ve Westminster • 2026 Koleksiyonu
                    </p>
                  </div>
                </div>
              </div>

              {/* Cover Bottom Teasers */}
              <div className="border-t-2 border-[#1A1A1A] pt-2 sm:pt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10px] font-sans-body">
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">01. SPONSORLUK VİZESİ</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[9.5px] sm:text-[10px] truncate">Av. Ahmet Hüsrev Analizi</p>
                </div>
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">02. UK ETKİNLİKLER</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[9.5px] sm:text-[10px] truncate">Londra Türk Konser &amp; Tiyatro</p>
                </div>
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">03. SHOREDITCH AI</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[9.5px] sm:text-[10px] truncate">Türk Yapay Zeka Girişimi</p>
                </div>
                <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
                  <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8px] sm:text-[9px]">04. ISA &amp; GAYRİMENKUL</span>
                  <p className="font-serif-newsreader text-[#1A1A1A] text-[9.5px] sm:text-[10px] truncate">Vergisiz Yatırım &amp; Konut</p>
                </div>
              </div>

              {/* Cover Running Footer */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-sans-body text-[#1A1A1A]/60 pt-1.5 sm:pt-2 border-t border-[#1A1A1A]/10">
                <span>ISSN 2814-9921 • BİRLEŞİK KRALLIK</span>
                <span className="font-serif-cormorant italic">Sayfa 1 (Kapak)</span>
              </div>
            </div>
          )}

          {/* ================= PAGE 2: TABLE OF CONTENTS & MANIFESTO ================= */}
          {(viewFilter === 'all' || viewFilter === 'toc') && (
            <div 
              className={`magazine-pdf-page bg-[#FAF8F5] border border-[#1A1A1A]/20 p-4 sm:p-7 md:p-8 mx-auto shadow-lg sm:shadow-xl flex flex-col justify-between transition-all w-full ${
                activeFormat === 'a5' 
                  ? 'max-w-[560px] min-h-[500px] sm:min-h-[700px]' 
                  : 'max-w-[720px] min-h-[600px] sm:min-h-[860px]'
              }`}
            >
              {/* Running Header */}
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-1.5 sm:pb-2 text-[8.5px] sm:text-[10px] font-sans-body uppercase tracking-wider text-[#1A1A1A]/70">
                <span className="font-bold text-[#8C6A43]">BİR ADA DERGİSİ</span>
                <span>SAYI 01 / 2026 • DERGİ DİZİNİ</span>
                <span className="font-bold">SAYFA 2</span>
              </div>

              {/* Page Title */}
              <div className="my-1.5 sm:my-2 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-cormorant text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                    İçindekiler &amp; Yayın Dizini
                  </h2>
                  <p className="font-serif-cormorant italic text-[11px] sm:text-xs text-[#8C6A43]">
                    Bu Sayıda Yer Alan Özel Dosyalar ve Makaleler
                  </p>
                </div>
                <Feather className="w-5 h-5 text-[#8C6A43]/50" />
              </div>

              {/* Editorial Note */}
              <div className="p-2.5 sm:p-3 bg-[#F4ECE1] rounded-lg border border-[#8C6A43]/20 text-[10px] sm:text-xs font-serif-newsreader text-[#1A1A1A]/85 leading-snug">
                <p className="italic">
                  "Değerli Okurlarımız; Londra'dan tüm Britanya'ya uzanan bu ilk dergi seçkimizde; göçmenlik ve sponsorluk rehberinden Shoreditch yapay zeka ekosistemine, Londra Türk etkinlik takviminden İskoçya rotalarına kadar Ada yaşamının tüm boyutlarını derledik. Keyifli okumalar dileriz."
                </p>
                <p className="text-right not-italic font-bold font-sans-body text-[8.5px] sm:text-[9px] uppercase tracking-wider text-[#1A1A1A] mt-1">
                  — Bir Ada Yayın Kurulu, Londra
                </p>
              </div>

              {/* Numbered Table of Contents List */}
              <div className="my-1.5 sm:my-2 space-y-1 sm:space-y-1.5 divide-y divide-dashed divide-[#1A1A1A]/15 overflow-hidden">
                {posts.map((post, idx) => {
                  const targetPage = postPageMapping[post.id] || (idx * 2 + 3);
                  return (
                    <div 
                      key={post.id} 
                      className="pt-1 first:pt-0 flex items-baseline justify-between gap-2"
                    >
                      <div className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
                        <span className="font-mono text-[10.5px] sm:text-xs font-bold text-[#8C6A43] shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[7.5px] sm:text-[8px] font-sans-body uppercase tracking-wider font-bold text-[#8C6A43] block">
                            {post.category}
                          </span>
                          <h4 className="font-serif-cormorant text-xs sm:text-sm font-bold text-[#1A1A1A] truncate leading-tight">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                      <span className="font-serif-cormorant italic text-[11px] sm:text-xs text-[#1A1A1A]/70 shrink-0 font-bold">
                        Sayfa {targetPage}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Running Footer */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-sans-body text-[#1A1A1A]/60 pt-1.5 sm:pt-2 border-t border-[#1A1A1A]/10">
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
                  className={`magazine-pdf-page bg-[#FAF8F5] border border-[#1A1A1A]/20 p-4 sm:p-7 md:p-8 mx-auto shadow-lg sm:shadow-xl flex flex-col justify-between transition-all w-full ${
                    activeFormat === 'a5' 
                      ? 'max-w-[560px] min-h-[500px] sm:min-h-[700px]' 
                      : 'max-w-[720px] min-h-[600px] sm:min-h-[860px]'
                  }`}
                >
                  {/* Top Running Header */}
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-1 sm:pb-1.5 text-[8px] sm:text-[9.5px] font-sans-body uppercase tracking-wider text-[#1A1A1A]/70 shrink-0">
                    <span className="font-bold text-[#8C6A43]">{post.category}</span>
                    <span className="truncate max-w-[160px] sm:max-w-[280px]">
                      BİR ADA • {post.title}
                    </span>
                    <span className="font-bold">SAYFA {overallPageNumber}</span>
                  </div>

                  {/* PAGE CONTENT CONTAINER */}
                  <div className="flex-1 my-1.5 sm:my-2 overflow-hidden flex flex-col justify-start">
                    
                    {/* If Page 1: Show Lead Header, Title, Cover Image, and Author */}
                    {pageType === 'article-lead' && (
                      <div className="space-y-1.5 sm:space-y-2">
                        <div>
                          <h2 className="font-serif-cormorant text-base sm:text-xl md:text-2xl font-bold text-[#1A1A1A] leading-tight mb-0.5 sm:mb-1">
                            {post.title}
                          </h2>
                          {post.subtitle && (
                            <p className="font-serif-cormorant italic text-[10.5px] sm:text-xs text-[#1A1A1A]/75 leading-snug mb-1.5">
                              {post.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Author byline */}
                        <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] font-sans-body text-[#1A1A1A]/65 border-y border-[#1A1A1A]/10 py-0.5 sm:py-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#1A1A1A]">{post.author.name}</span>
                            <span className="truncate max-w-[180px] sm:max-w-none">• {post.author.bio?.split('.')[0] || 'Bir Ada Yazarı'}</span>
                          </div>
                          <span className="shrink-0">{post.readTimeMinutes} dk • Londra</span>
                        </div>

                        {/* Featured Image */}
                        {post.coverImage && (
                          <div className="my-1 rounded-lg overflow-hidden border border-[#1A1A1A]/15 shadow-xs">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              crossOrigin="anonymous"
                              className="w-full h-24 sm:h-36 md:h-40 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                              }}
                            />
                          </div>
                        )}

                        {/* Lead Content */}
                        <div className="mt-1 sm:mt-2">
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
                          <div className="mt-2.5 sm:mt-3 pt-1.5 sm:pt-2 border-t border-[#1A1A1A]/15 flex items-center justify-between text-[8.5px] sm:text-[9px] font-sans-body text-[#1A1A1A]/70 bg-[#1A1A1A]/[0.02] p-1.5 sm:p-2 rounded">
                            <div className="flex items-center gap-1.5">
                              <BirAdaLogo size="sm" showText={false} />
                              <div>
                                <span className="font-bold text-[#1A1A1A] block">{post.author.name}</span>
                                <span className="text-[7.5px] sm:text-[8px] text-[#8C6A43]">Bir Ada Kültür &amp; Araştırma Masası</span>
                              </div>
                            </div>
                            <span className="italic font-serif-cormorant text-[9.5px] sm:text-[10px]">
                              "Bir Arada, Bir Ada'da"
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Bottom Running Footer */}
                  <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-sans-body text-[#1A1A1A]/60 pt-1 sm:pt-1.5 border-t border-[#1A1A1A]/10 shrink-0">
                    <span>BİR ADA DERGİSİ • SAYI 01</span>
                    <span className="font-serif-cormorant italic text-[9.5px] sm:text-[10px] font-bold">
                      Sayfa {overallPageNumber}
                    </span>
                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* Mobile Sticky Bottom Action Bar (Ensures 1-tap download & print on phones) */}
        <div className="sm:hidden bg-[#1A1A1A] border-t border-white/10 p-2.5 flex items-center justify-between gap-2 shrink-0 z-10 print:hidden">
          <button
            onClick={() => handleDownloadA5Pdf('all')}
            disabled={isGeneratingPdf}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#D4A373] text-[#1A1A1A] rounded-xl text-xs font-bold uppercase tracking-wider font-sans-body active:scale-95 shadow-md disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'İndiriliyor...' : 'A5 PDF İndir'}</span>
          </button>

          <button
            onClick={handlePrintA4}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white/20 text-white hover:bg-white hover:text-[#1A1A1A] rounded-xl text-xs font-bold uppercase tracking-wider font-sans-body active:scale-95 border border-white/20"
          >
            <Printer className="w-4 h-4" />
            <span>Kaydet / Yazdır</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* HIDDEN COMPLETE MAGAZINE BUFFER FOR 100% RELIABLE FULL A5 PDF EXPORT       */}
      {/* This renders ALL pages off-screen so clicking download always gets ALL     */}
      {/* 22+ pages even when filtered on screen                                    */}
      {/* ========================================================================= */}
      <div 
        id="pdf-full-magazine-render-container"
        ref={fullMagazineRenderRef}
        className="fixed left-[-9999px] top-[-9999px] w-[560px] opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Buffer Page 1: Cover */}
        <div className="magazine-pdf-page-full bg-[#FAF8F5] border-2 border-[#1A1A1A] p-7 w-[560px] min-h-[780px] flex flex-col justify-between mb-8">
          <div className="border-b-2 border-[#1A1A1A] pb-3 text-center">
            <div className="flex items-center justify-between text-[9px] font-sans-body uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/70 mb-1">
              <span>LONDRA • EDINBURGH • CARDIFF</span>
              <span>SAYI 01 / 2026</span>
              <span>ÖZEL BASKI</span>
            </div>
            <h1 className="font-serif-cormorant text-5xl font-bold tracking-tighter text-[#1A1A1A] uppercase leading-none my-1">
              BİR ADA
            </h1>
            <p className="font-serif-cormorant italic text-sm text-[#8C6A43] font-medium">
              "Bir Arada, Bir Ada'da" • Britanya Online Dergi ve Yaşam Seçkisi
            </p>
          </div>

          <div className="my-4 space-y-3">
            <span className="inline-block px-2 py-0.5 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest font-sans-body font-bold rounded">
              Özel Kapak Dosyası
            </span>
            <h2 className="font-serif-cormorant text-2xl font-bold leading-tight text-[#1A1A1A]">
              Bir Arada, Bir Ada'da
            </h2>
            <p className="font-serif-newsreader text-xs text-[#1A1A1A]/80 leading-relaxed text-justify">
              Londra'nın sisli sokaklarından İskoç Yaylaları'na; Birleşik Krallık'ta yaşayan toplumumuzun sesini, girişimcilik hikâyelerini, vize rehberlerini ve zengin kültür takvimini sayfalarımıza taşıyoruz.
            </p>
          </div>

          <div className="border-t-2 border-[#1A1A1A] pt-3 grid grid-cols-2 gap-2 text-[9.5px] font-sans-body">
            <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
              <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8.5px]">01. SPONSORLUK VİZESİ</span>
              <p className="font-serif-newsreader text-[#1A1A1A] text-[9.5px] truncate">Av. Ahmet Hüsrev Analizi</p>
            </div>
            <div className="bg-[#1A1A1A]/[0.03] p-1.5 rounded border border-[#1A1A1A]/10">
              <span className="text-[#8C6A43] font-bold block uppercase tracking-wider text-[8.5px]">02. UK ETKİNLİKLER</span>
              <p className="font-serif-newsreader text-[#1A1A1A] text-[9.5px] truncate">Londra Türk Kültür Sanat</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[8.5px] font-sans-body text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
            <span>ISSN 2814-9921 • BİRLEŞİK KRALLIK</span>
            <span className="font-serif-cormorant italic">Sayfa 1 (Kapak)</span>
          </div>
        </div>

        {/* Buffer Page 2: Table of Contents */}
        <div className="magazine-pdf-page-full bg-[#FAF8F5] border border-[#1A1A1A]/20 p-7 w-[560px] min-h-[780px] flex flex-col justify-between mb-8">
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2 text-[9.5px] font-sans-body uppercase tracking-wider text-[#1A1A1A]/70">
            <span className="font-bold text-[#8C6A43]">BİR ADA DERGİSİ</span>
            <span>SAYI 01 / 2026 • DERGİ DİZİNİ</span>
            <span className="font-bold">SAYFA 2</span>
          </div>

          <div className="my-2">
            <h2 className="font-serif-cormorant text-2xl font-bold text-[#1A1A1A]">
              İçindekiler &amp; Yayın Dizini
            </h2>
            <p className="font-serif-cormorant italic text-xs text-[#8C6A43]">
              Bu Sayıda Yer Alan Özel Dosyalar ve Makaleler
            </p>
          </div>

          <div className="my-2 space-y-1 divide-y divide-dashed divide-[#1A1A1A]/15 overflow-hidden">
            {posts.map((post, idx) => {
              const targetPage = postPageMapping[post.id] || (idx * 2 + 3);
              return (
                <div key={post.id} className="pt-1 first:pt-0 flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#8C6A43] shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[8px] font-sans-body uppercase tracking-wider font-bold text-[#8C6A43] block">
                        {post.category}
                      </span>
                      <h4 className="font-serif-cormorant text-xs font-bold text-[#1A1A1A] truncate leading-tight">
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

          <div className="flex items-center justify-between text-[8.5px] font-sans-body text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
            <span>BİR ADA • BİRLEŞİK KRALLIK BAĞIMSIZ YAYINCILIK</span>
            <span className="font-serif-cormorant italic">Sayfa 2</span>
          </div>
        </div>

        {/* Buffer Pages 3+: All Articles in full sequence */}
        {allArticlePages.map((page) => {
          const { post, articlePageIndex, totalArticlePages, overallPageNumber, pageType } = page;
          return (
            <div
              key={`buffer-${post.id}-page-${articlePageIndex}`}
              className="magazine-pdf-page-full bg-[#FAF8F5] border border-[#1A1A1A]/20 p-7 w-[560px] min-h-[780px] flex flex-col justify-between mb-8"
            >
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-1.5 text-[9px] font-sans-body uppercase tracking-wider text-[#1A1A1A]/70 shrink-0">
                <span className="font-bold text-[#8C6A43]">{post.category}</span>
                <span className="truncate max-w-[280px]">BİR ADA • {post.title}</span>
                <span className="font-bold">SAYFA {overallPageNumber}</span>
              </div>

              <div className="flex-1 my-2 overflow-hidden flex flex-col justify-start">
                {pageType === 'article-lead' && (
                  <div className="space-y-2">
                    <div>
                      <h2 className="font-serif-cormorant text-xl font-bold text-[#1A1A1A] leading-tight mb-1">
                        {post.title}
                      </h2>
                      {post.subtitle && (
                        <p className="font-serif-cormorant italic text-xs text-[#1A1A1A]/75 leading-snug mb-1.5">
                          {post.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-sans-body text-[#1A1A1A]/65 border-y border-[#1A1A1A]/10 py-1">
                      <span className="font-bold text-[#1A1A1A]">{post.author.name}</span>
                      <span>{post.readTimeMinutes} dk • Londra</span>
                    </div>

                    <div className="mt-1">
                      {renderMagazineMarkdownChunk(page.leadContent || '', `buf-${post.id}-lead`)}
                    </div>
                  </div>
                )}

                {pageType !== 'article-lead' && (
                  <div className="space-y-1">
                    {renderMagazineMarkdownChunk(page.bodyContent || '', `buf-${post.id}-body-${articlePageIndex}`)}

                    {articlePageIndex === totalArticlePages && (
                      <div className="mt-3 pt-2 border-t border-[#1A1A1A]/15 flex items-center justify-between text-[9px] font-sans-body text-[#1A1A1A]/70 bg-[#1A1A1A]/[0.02] p-1.5 rounded">
                        <span className="font-bold text-[#1A1A1A]">{post.author.name}</span>
                        <span className="italic font-serif-cormorant text-[10px]">
                          "Bir Arada, Bir Ada'da"
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[8.5px] font-sans-body text-[#1A1A1A]/60 pt-1.5 border-t border-[#1A1A1A]/10 shrink-0">
                <span>BİR ADA DERGİSİ • SAYI 01</span>
                <span className="font-serif-cormorant italic text-[10px] font-bold">
                  Sayfa {overallPageNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
