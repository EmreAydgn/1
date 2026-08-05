import React, { useState } from 'react';
import { X, Printer, Download, BookOpen, Crown, Sparkles, Feather, ArrowRight, Share2 } from 'lucide-react';
import { BlogPost } from '../types';
import { getAuthorInitials } from '../utils/authorUtils';
import { BirAdaLogo } from './BirAdaLogo';

interface PdfMagazineModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
}

// Helper to parse inline markdown (**bold**, *italic*, `code`) safely into React elements
const parseInlineMarkdown = (text: string): React.ReactNode => {
  if (!text) return '';
  
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
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
        <code key={`c-${key++}`} className="bg-[#EBE8E0] px-1.5 py-0.5 rounded text-xs font-mono">
          {content}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const renderFormattedContent = (content: string) => {
  if (!content) return null;
  return content.split('\n\n').map((rawParagraph, index) => {
    const paragraph = rawParagraph.trim();
    if (!paragraph) return null;

    if (paragraph.startsWith('# ')) {
      return (
        <h2 key={index} className="text-2xl font-serif-playfair font-bold mt-6 mb-3 text-[#1A1A1A]">
          {parseInlineMarkdown(paragraph.replace(/^#\s*/, ''))}
        </h2>
      );
    }

    if (paragraph.startsWith('## ')) {
      return (
        <h3 key={index} className="text-xl font-serif-playfair font-bold mt-5 mb-2 text-[#1A1A1A]">
          {parseInlineMarkdown(paragraph.replace(/^##\s*/, ''))}
        </h3>
      );
    }

    if (paragraph.startsWith('### ')) {
      return (
        <h4 key={index} className="text-lg font-serif-playfair font-bold mt-4 mb-2 text-[#D4A373]">
          {parseInlineMarkdown(paragraph.replace(/^###\s*/, ''))}
        </h4>
      );
    }

    if (paragraph.startsWith('> ')) {
      return (
        <blockquote key={index} className="my-4 pl-4 border-l-4 border-[#D4A373] italic font-serif-playfair text-base text-[#1A1A1A]/80">
          {parseInlineMarkdown(paragraph.replace(/^>\s*/, ''))}
        </blockquote>
      );
    }

    return (
      <p key={index} className="mb-4 leading-relaxed font-serif-playfair text-base sm:text-lg text-[#1A1A1A]/90">
        {parseInlineMarkdown(paragraph)}
      </p>
    );
  });
};

export const PdfMagazineModal: React.FC<PdfMagazineModalProps> = ({
  isOpen,
  onClose,
  posts,
}) => {
  const [activeTab, setActiveTab] = useState<'cover' | 'toc' | 'articles'>('articles');
  const [isPreparingPrint, setIsPreparingPrint] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrintPdf = () => {
    setIsPreparingPrint(true);
    setTimeout(() => {
      window.print();
      setIsPreparingPrint(false);
    }, 100);
  };

  return (
    <div className="pdf-modal-wrapper fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-1 sm:p-4 overflow-y-auto print:bg-white print:p-0 print:static print:block print:overflow-visible">
      
      {/* Container - Printable element */}
      <div className="bg-[#F9F7F2] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-[#1A1A1A]/20 shadow-2xl overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none">
        
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="bg-[#1A1A1A] text-white px-3 sm:px-6 py-3 sm:py-4 flex flex-col gap-3 print:hidden border-b border-white/10">
          
          {/* Top Row: Title & Close */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <BirAdaLogo size="sm" showText={false} />
              <div className="min-w-0">
                <h3 className="font-serif-playfair text-base sm:text-lg font-bold tracking-tight text-white truncate">
                  Bir Ada — PDF Dergi Sayısı
                </h3>
                <p className="text-[9px] sm:text-[10px] font-sans-inter text-white/60 uppercase tracking-widest sm:tracking-[0.2em] truncate">
                  Sayı 01 / 2026 • Britanya Online Dergi &amp; Yaşam Seçkisi
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

          {/* Controls Row: View Tabs & Print/Download button */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
            
            {/* View Tabs */}
            <div className="flex items-center bg-white/10 p-0.5 sm:p-1 rounded-full text-xs font-sans-inter font-medium overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer ${
                  activeTab === 'articles' ? 'bg-[#D4A373] text-[#1A1A1A] font-bold shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Tüm Dergi (Bütün Sayfalar)
              </button>
              <button
                onClick={() => setActiveTab('cover')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer ${
                  activeTab === 'cover' ? 'bg-[#D4A373] text-[#1A1A1A] font-bold shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Kapak
              </button>
              <button
                onClick={() => setActiveTab('toc')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all text-[11px] sm:text-xs whitespace-nowrap cursor-pointer ${
                  activeTab === 'toc' ? 'bg-[#D4A373] text-[#1A1A1A] font-bold shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                İçindekiler
              </button>
            </div>

            {/* Print / Download Button */}
            <button
              onClick={handlePrintPdf}
              id="pdf-download-btn"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-[#D4A373] hover:bg-white text-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-wider font-sans-inter transition-all shadow-md ml-auto cursor-pointer active:scale-95"
              title="PDF Olarak Kaydet veya Yazdır (Açılan pencerede 'PDF Olarak Kaydet' seçeneğini belirleyebilirsiniz)"
            >
              <Printer className="w-3.5 h-3.5" />
              <Download className="w-3.5 h-3.5" />
              <span>{isPreparingPrint ? 'Pencere Açılıyor...' : 'PDF Yazdır / İndir'}</span>
            </button>

          </div>
        </div>

        {/* Printable Magazine Content Page Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-8 md:p-12 print:p-0 print:overflow-visible">
          
          {/* MAGAZINE COVER SPREAD (Visible if cover or articles) */}
          {(activeTab === 'cover' || activeTab === 'articles') && (
            <div className="magazine-page bg-[#F9F7F2] border-2 sm:border-4 border-[#1A1A1A] p-4 sm:p-8 md:p-12 mb-8 sm:mb-12 relative min-h-[500px] sm:min-h-[600px] flex flex-col justify-between shadow-lg print:mb-0 print:border-2 print:page-break-after-always">
              
              {/* Top Banner Header */}
              <div className="border-b-2 border-[#1A1A1A] pb-4 sm:pb-6 text-center">
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-sans-inter uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-[#1A1A1A]/60 mb-2">
                  <span>LONDRA • EDINBURGH</span>
                  <span>ÖZEL YAYIN • SAYI 01</span>
                  <span>TEMMUZ 2026</span>
                </div>
                <div className="flex justify-center my-3">
                  <BirAdaLogo size="lg" showText={false} />
                </div>
                <h1 className="font-serif-playfair text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-[#1A1A1A] uppercase leading-none my-2">
                  BİR ADA
                </h1>
                <p className="font-serif-playfair italic text-sm sm:text-lg text-[#D4A373]">
                  "Bir Arada, Bir Ada'da" • Haberler, İş Dünyası, Toplum ve Yaşam Dergisi
                </p>
              </div>

              {/* Cover Main Feature */}
              <div className="my-6 sm:my-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div className="space-y-3 sm:space-y-4">
                  <span className="inline-block px-3 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest font-sans-inter font-bold">
                    Kapak Konusu &amp; Manifesto
                  </span>
                  <h2 className="font-serif-playfair text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#1A1A1A]">
                    Bir Arada, Bir Ada'da
                  </h2>
                  <p className="font-serif-playfair text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed">
                    Britanya'da yaşayan tüm toplumumuzu kucaklayan bağımsız online dergi ve yaşam mecramızın açılış manifestosu ve özel seçkileri.
                  </p>
                  <div className="h-[2px] bg-[#1A1A1A] w-16 sm:w-20" />
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-[#1A1A1A]/20 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
                    alt="Londra Dergi Kapağı"
                    className="w-full h-48 sm:h-64 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 text-white">
                    <p className="font-serif-playfair italic text-xs">"Thames kıyılarından süzülen ilham..."</p>
                  </div>
                </div>
              </div>

              {/* Cover Footer Section Teasers */}
              <div className="border-t-2 border-[#1A1A1A] pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs font-sans-inter font-medium">
                <div>
                  <span className="text-[#D4A373] font-bold block uppercase tracking-wider text-[9px] sm:text-[10px]">01. HABERLER</span>
                  <p className="font-serif-playfair text-[#1A1A1A] truncate text-xs">Britanya Son Dakika</p>
                </div>
                <div>
                  <span className="text-[#D4A373] font-bold block uppercase tracking-wider text-[9px] sm:text-[10px]">02. İŞ DÜNYASI</span>
                  <p className="font-serif-playfair text-[#1A1A1A] truncate text-xs">Girişimcilik &amp; FinTech</p>
                </div>
                <div>
                  <span className="text-[#D4A373] font-bold block uppercase tracking-wider text-[9px] sm:text-[10px]">03. SİYASET</span>
                  <p className="font-serif-playfair text-[#1A1A1A] truncate text-xs">Westminster &amp; Gündem</p>
                </div>
                <div>
                  <span className="text-[#D4A373] font-bold block uppercase tracking-wider text-[9px] sm:text-[10px]">04. YATIRIM</span>
                  <p className="font-serif-playfair text-[#1A1A1A] truncate text-xs">ISA &amp; Gayrimenkul</p>
                </div>
              </div>
            </div>
          )}

          {/* TABLE OF CONTENTS PAGE */}
          {(activeTab === 'toc' || activeTab === 'articles') && (
            <div className="bg-white border border-[#1A1A1A]/10 rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12 shadow-sm print:mb-0 print:border-none print:shadow-none print:page-break-after-always">
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 sm:pb-4 mb-4 sm:mb-6">
                <div>
                  <span className="text-[10px] font-sans-inter uppercase tracking-[0.2em] text-[#D4A373] font-bold block">
                    BİR ADA
                  </span>
                  <h2 className="font-serif-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                    İçindekiler &amp; Dergi Dizini
                  </h2>
                </div>
                <Feather className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A]/40" />
              </div>

              {/* Editorial Note */}
              <div className="p-4 sm:p-6 bg-[#F9F7F2] rounded-xl border border-[#1A1A1A]/10 mb-6 sm:mb-8 italic font-serif-playfair text-xs sm:text-sm text-[#1A1A1A]/80 leading-relaxed">
                "Değerli Okurlarımız, Londra'dan tüm Birleşik Krallık'a seslenen bu ilk dergi sayımızda; finans dünyasından Britanya'nın zengin tarihine, edebi sohbetlerden sisli gezi rotalarına kadar geniş bir yelpazeyi derledik. Keyifli okumalar dileriz."
                <div className="mt-2 text-right not-italic font-bold text-[10px] sm:text-xs uppercase tracking-widest font-sans-inter text-[#1A1A1A]">
                  — Editörün Notu, Londra
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-4 sm:space-y-6">
                {posts.map((post, idx) => (
                  <div key={post.id} className="flex items-baseline justify-between border-b border-dashed border-[#1A1A1A]/20 pb-3 gap-2">
                    <div className="flex items-baseline gap-2 sm:gap-4 max-w-xl min-w-0">
                      <span className="font-sans-inter text-xs font-bold text-[#D4A373] shrink-0">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[9px] sm:text-[10px] font-sans-inter uppercase tracking-widest font-bold text-[#1A1A1A]/50 block">
                          {post.category}
                        </span>
                        <h4 className="font-serif-playfair text-sm sm:text-base font-bold text-[#1A1A1A] truncate">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                    <span className="font-serif-playfair italic text-xs text-[#1A1A1A]/60 shrink-0">
                      Sayfa {idx * 2 + 3}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ARTICLES SPREAD (When reading all) */}
          {(activeTab === 'articles') && (
            <div className="space-y-8 sm:space-y-12">
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white border border-[#1A1A1A]/10 rounded-2xl p-4 sm:p-8 shadow-xs print:page-break-before-always print:border-none print:p-0"
                >
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-sans-inter uppercase tracking-[0.2em] font-bold text-[#D4A373] mb-3 border-b border-[#1A1A1A]/10 pb-2">
                    <span>{post.category}</span>
                    <span>BİR ADA • SAYFA {index * 2 + 3}</span>
                  </div>

                  <h2 className="font-serif-playfair text-xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 leading-tight">
                    {post.title}
                  </h2>
                  {post.subtitle && (
                    <p className="font-serif-playfair italic text-sm sm:text-base text-[#1A1A1A]/70 mb-4">
                      {post.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mb-6 text-xs font-sans-inter text-[#1A1A1A]/60">
                    <div className="w-8 h-8 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-xs flex items-center justify-center border border-[#1A1A1A]/10 shrink-0 shadow-xs">
                      {getAuthorInitials(post.author.name)}
                    </div>
                    <div>
                      <span className="font-bold text-[#1A1A1A] block">{post.author.name}</span>
                      <span>{post.readTimeMinutes} dakika okuma • Londra</span>
                    </div>
                  </div>

                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-48 sm:h-64 object-cover rounded-xl mb-6 border border-[#1A1A1A]/10"
                    />
                  )}

                  <div className="font-serif-playfair text-sm sm:text-lg leading-relaxed text-[#1A1A1A]/90 space-y-2">
                    {renderFormattedContent(post.content)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Printable CSS style tag */}
        <style>{`
          @media print {
            body {
              background-color: white !important;
              color: black !important;
            }
            .print\\:hidden {
              display: none !important;
            }
            .magazine-page {
              min-height: auto !important;
              box-shadow: none !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
