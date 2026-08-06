import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Clock, 
  Eye, 
  MessageSquare, 
  Check, 
  Type, 
  Palette, 
  Sparkles,
  Send,
  Copy,
  Link,
  Printer,
  Download,
  Pin
} from 'lucide-react';
import { BlogPost, BlogTheme, FontStyle, Comment } from '../types';
import { getAuthorInitials } from '../utils/authorUtils';
import { getArticleShareUrl } from '../utils/urlUtils';

interface ArticleReaderProps {
  post: BlogPost;
  onBack: () => void;
  onToggleBookmark: (postId: string) => void;
  isBookmarked: boolean;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string, authorName: string) => void;
  onEditPost?: (post: BlogPost) => void;
  relatedPosts: BlogPost[];
  onSelectRelated: (post: BlogPost) => void;
  onSelectAuthor?: (authorName: string) => void;
}

// Helper to parse inline markdown (**bold**, *italic*, `code`) safely into React elements
const parseInlineMarkdown = (text: string): React.ReactNode => {
  if (!text) return '';
  
  // Strip any accidental leading markdown heading hashes
  const cleanSource = text.replace(/^#{1,6}\s+/, '');
  
  // Regex to match **bold**, *italic*, `code`
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
        <strong key={`b-${key++}`} className="font-bold text-[#1A1A1A] dark:text-white">
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
        <code key={`c-${key++}`} className="bg-[#EBE8E0] dark:bg-[#272422] px-1.5 py-0.5 rounded text-xs font-mono">
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

// Robust tokenizer to split markdown into clean semantic blocks
const splitMarkdownIntoBlocks = (rawContent: string): string[] => {
  if (!rawContent) return [];
  
  const text = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = text.split('\n');
  const blocks: string[] = [];
  let currentBlock: string[] = [];
  let inTable = false;
  let inList: 'ul' | 'ol' | false = false;

  const flush = () => {
    if (currentBlock.length > 0) {
      const blockStr = currentBlock.join('\n').trim();
      if (blockStr) {
        blocks.push(blockStr);
      }
      currentBlock = [];
    }
    inTable = false;
    inList = false;
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flush();
      return;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      flush();
      blocks.push(trimmed);
      return;
    }

    // Markdown Image
    if (trimmed.startsWith('![') && trimmed.includes('](') && trimmed.endsWith(')')) {
      flush();
      blocks.push(trimmed);
      return;
    }

    // Headings (#, ##, ###, ####, #####, ######)
    if (/^#{1,6}\s+/.test(trimmed)) {
      flush();
      blocks.push(trimmed);
      return;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      if (inTable || inList) flush();
      currentBlock.push(trimmed);
      return;
    }

    // Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (!inTable) {
        flush();
        inTable = true;
      }
      currentBlock.push(trimmed);
      return;
    } else if (inTable) {
      flush();
    }

    // Unordered list item
    if (/^[-*]\s+/.test(trimmed)) {
      if (inList !== 'ul') {
        flush();
        inList = 'ul';
      }
      currentBlock.push(trimmed);
      return;
    }

    // Ordered list item
    if (/^\d+\.\s+/.test(trimmed)) {
      if (inList !== 'ol') {
        flush();
        inList = 'ol';
      }
      currentBlock.push(trimmed);
      return;
    }

    if (inList) {
      flush();
    }

    currentBlock.push(trimmed);
  });

  flush();
  return blocks;
};

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  post,
  onBack,
  onToggleBookmark,
  isBookmarked,
  onLikePost,
  onAddComment,
  onEditPost,
  relatedPosts,
  onSelectRelated,
  onSelectAuthor,
}) => {
  const [theme, setTheme] = useState<BlogTheme>(post.themePreference || 'warm');
  const [font, setFont] = useState<FontStyle>('serif-cormorant');
  const [fontSize, setFontSize] = useState<number>(() =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? 17 : 19
  );
  const [dropCap, setDropCap] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  
  // Audio Read Aloud state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Comment form state
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // Scroll listener for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pre-fetch voices for Web Speech API
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      return () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, []);

  // Stop audio on unmount or post change
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [post.id]);

  const cleanTextForSpeech = (text: string) => {
    return text
      .replace(/!\[.*?\]\(.*?\)/g, '') // remove images
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // replace markdown links with label text
      .replace(/<[^>]*>/g, '') // remove html tags
      .replace(/[\#\*_`\>~]/g, '') // remove markdown symbols
      .replace(/---+/g, ' ') // remove dividers
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim();
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Tarayıcınız sesli okuma özelliğini desteklemiyor.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();

      const titleText = cleanTextForSpeech(post.title);
      const subtitleText = post.subtitle ? cleanTextForSpeech(post.subtitle) : '';
      const bodyText = cleanTextForSpeech(post.content);

      const fullTextToRead = `${titleText}. ${subtitleText ? subtitleText + '. ' : ''}${bodyText}`;

      const utterance = new SpeechSynthesisUtterance(fullTextToRead);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Select Turkish voice if available in browser
      const voices = window.speechSynthesis.getVoices();
      const trVoice = voices.find(
        (v) => v.lang.toLowerCase().startsWith('tr') || v.lang.toLowerCase().includes('turkish')
      );
      if (trVoice) {
        utterance.voice = trVoice;
      }

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };
      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setSpeechUtterance(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopyShare = async () => {
    const url = getArticleShareUrl(post.id);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = getArticleShareUrl(post.id);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.title} - Bir Ada`,
          text: post.subtitle || post.excerpt || post.title,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or failed
      }
    }
    handleCopyShare();
  };

  const handleLike = () => {
    if (!hasLiked) {
      onLikePost(post.id);
      setHasLiked(true);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const author = commentAuthor.trim() || 'Gizli Okur';
    onAddComment(post.id, newCommentText, author);
    setNewCommentText('');
  };

  const getThemeClasses = () => {
    return 'bg-[#FAF8F5] text-[#2C2825] border-[#E8E2D9] dark:bg-[#141312] dark:text-[#ECE8E3] dark:border-[#2A2723]';
  };

  const getFontClass = () => {
    return 'font-serif-cormorant';
  };

  const formattedDate = new Date(post.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-black/10">
        <div 
          className="h-full bg-[#8C6A43] transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Reader Toolbar */}
      <div className="sticky top-2 sm:top-4 z-40 max-w-4xl mx-auto px-2.5 sm:px-4 mb-4 sm:mb-8">
        <div className="bg-white/95 dark:bg-[#1D1B1A]/95 backdrop-blur-md border border-[#E8E2D9] dark:border-[#332F2C] rounded-full px-2.5 py-1.5 sm:p-2 shadow-md sm:shadow-lg flex items-center justify-between gap-1.5 sm:gap-2">
          <button
            onClick={onBack}
            id="reader-back-btn"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-[#736C65] dark:text-[#9E968F] hover:bg-[#F3EFEA] dark:hover:bg-[#272422] transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri</span>
          </button>

          {/* Font Size & Audio Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Font Size Adjusters */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="px-2 py-1 rounded hover:bg-[#F3EFEA] dark:hover:bg-[#272422]"
                title="Yazıyı Küçült"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                className="px-2 py-1 rounded hover:bg-[#F3EFEA] dark:hover:bg-[#272422]"
                title="Yazıyı Büyüt"
              >
                A+
              </button>
            </div>

            {/* Audio Read-Aloud */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-full transition-colors ${
                isPlayingAudio ? 'bg-[#8C6A43] text-white animate-pulse' : 'text-[#736C65] hover:bg-[#F3EFEA] dark:hover:bg-[#272422]'
              }`}
              title={isPlayingAudio ? 'Sesli Okumayı Durdur' : 'Sesli Oku'}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrintPdf}
              id="article-pdf-btn"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#8C6A43] hover:bg-[#8C6A43]/10 dark:hover:bg-[#8C6A43]/20 transition-colors"
              title="Makaleyi PDF İndir / Yazdır"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF / Yazdır</span>
            </button>
            <button
              onClick={handleCopyShare}
              className={`p-2 rounded-full transition-colors ${
                copiedLink ? 'text-green-600 bg-green-50 dark:bg-green-950/30' : 'text-[#736C65] hover:bg-[#F3EFEA] dark:hover:bg-[#272422]'
              }`}
              title={copiedLink ? 'Bağlantı kopyalandı!' : 'Bağlantıyı Kopyala'}
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleBookmark(post.id)}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? 'text-[#8C6A43]' : 'text-[#736C65] hover:bg-[#F3EFEA] dark:hover:bg-[#272422]'
              }`}
              title="Kaydet"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Canvas */}
      <article className="max-w-3xl mx-auto px-3.5 sm:px-6 pt-2 sm:pt-6 pb-20">
        
        {/* Header Metadata */}
        <header className="mb-6 sm:mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 bg-[#8C6A43]/10 text-[#8C6A43] dark:text-[#D4A373] text-[11px] sm:text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 sm:mb-4 border border-[#8C6A43]/20">
            {post.pinned || post.category === 'Dergi Tanıtımı' ? (
              <>
                <Pin className="w-3.5 h-3.5 fill-current text-[#8C6A43] dark:text-[#D4A373]" />
                <span>Sabitlenmiş Yazı • Dergi Tanıtımı</span>
              </>
            ) : (
              <span>{post.category}</span>
            )}
          </div>

          <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug sm:leading-tight mb-3 sm:mb-4 tracking-tight px-1 ${getFontClass()}`}>
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-base sm:text-xl font-serif-cormorant italic text-[#736C65] dark:text-[#9E968F] max-w-2xl mx-auto mb-4 sm:mb-6 leading-relaxed px-1">
              {post.subtitle}
            </p>
          )}

          {/* Author info & Read stats */}
          <div className="flex items-center justify-center gap-4 py-3 sm:py-4 border-y border-[#E8E2D9] dark:border-[#332F2C]">
            <div 
              onClick={() => onSelectAuthor && onSelectAuthor(post.author.name)}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              title={`${post.author.name} profiline git`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-xs sm:text-sm flex items-center justify-center border-2 border-[#8C6A43] shrink-0 shadow-xs">
                {getAuthorInitials(post.author.name)}
              </div>
              <div className="text-left">
                <h3 className="text-xs sm:text-sm font-semibold hover:underline">{post.author.name}</h3>
                <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#736C65] dark:text-[#9E968F]">
                  <time>{formattedDate}</time>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTimeMinutes} dk okuma
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image Banner */}
        {post.coverImage && (
          <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';
              }}
              className="w-full max-h-[280px] sm:max-h-[480px] object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div 
          className={`prose max-w-none leading-relaxed ${getFontClass()} ${dropCap ? 'drop-cap' : ''}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {splitMarkdownIntoBlocks(post.content).map((block, index) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
              return <hr key={index} className="my-6 sm:my-8 border-t border-[#E8E2D9] dark:border-[#332F2C]" />;
            }

            // Markdown Image Parser ![alt](url)
            if (trimmed.startsWith('![') && trimmed.includes('](') && trimmed.endsWith(')')) {
              const match = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
              if (match) {
                const alt = match[1];
                const src = match[2];
                return (
                  <figure key={index} className="my-6 sm:my-8 rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E2D9] dark:border-[#332F2C] bg-[#F3EFEA] dark:bg-[#272422] shadow-xs">
                    <img
                      src={src}
                      alt={alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover max-h-[460px]"
                    />
                    {alt && (
                      <figcaption className="px-4 py-2.5 text-xs font-sans-inter text-center text-[#736C65] dark:text-[#9E968F] italic border-t border-[#E8E2D9] dark:border-[#332F2C] bg-[#FAF8F5] dark:bg-[#1D1B1A]">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }
            }

            // Headings (# h1, ## h2, ### h3, #### h4, ##### h5, ###### h6)
            if (/^#\s+/.test(trimmed)) {
              const cleanHeading = trimmed.replace(/^#\s*/, '');
              return (
                <h1 key={index} className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-10 mb-3 sm:mb-4 text-[#1A1A1A] dark:text-[#F3EFEA] leading-tight tracking-tight">
                  {parseInlineMarkdown(cleanHeading)}
                </h1>
              );
            }

            if (/^##\s+/.test(trimmed)) {
              const cleanHeading = trimmed.replace(/^##\s*/, '');
              return (
                <h2 key={index} className="text-xl sm:text-2xl font-bold mt-6 sm:mt-9 mb-2.5 sm:mb-4 text-[#1A1A1A] dark:text-[#F3EFEA] leading-tight tracking-tight">
                  {parseInlineMarkdown(cleanHeading)}
                </h2>
              );
            }

            if (/^###\s+/.test(trimmed)) {
              const cleanHeading = trimmed.replace(/^###\s*/, '');
              return (
                <h3 key={index} className="text-lg sm:text-xl font-bold mt-5 sm:mt-8 mb-2 sm:mb-3 text-[#8C6A43] dark:text-[#D4A373] leading-snug">
                  {parseInlineMarkdown(cleanHeading)}
                </h3>
              );
            }

            if (/^####\s+/.test(trimmed)) {
              const cleanHeading = trimmed.replace(/^####\s*/, '');
              return (
                <h4 key={index} className="text-base sm:text-lg font-bold mt-4 sm:mt-6 mb-2 sm:mb-2.5 text-[#1A1A1A] dark:text-[#F3EFEA] leading-snug flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A43] dark:bg-[#D4A373] shrink-0" />
                  <span>{parseInlineMarkdown(cleanHeading)}</span>
                </h4>
              );
            }

            if (/^#####\s+/.test(trimmed)) {
              const cleanHeading = trimmed.replace(/^#####\s*/, '');
              return (
                <h5 key={index} className="text-sm sm:text-base font-semibold mt-3.5 sm:mt-5 mb-1.5 sm:mb-2 text-[#59524B] dark:text-[#C5BEB8] leading-snug">
                  {parseInlineMarkdown(cleanHeading)}
                </h5>
              );
            }

            if (/^######\s+/.test(trimmed)) {
              const cleanHeading = trimmed.replace(/^######\s*/, '');
              return (
                <h6 key={index} className="text-xs sm:text-sm font-semibold uppercase tracking-wider mt-3 sm:mt-4 mb-1 text-[#8C6A43] dark:text-[#D4A373]">
                  {parseInlineMarkdown(cleanHeading)}
                </h6>
              );
            }

            if (trimmed.startsWith('>')) {
              const cleanQuote = trimmed.replace(/^>\s*/, '');
              return (
                <blockquote key={index} className="my-5 sm:my-8 pl-3.5 sm:pl-6 border-l-3 sm:border-l-4 border-[#8C6A43] italic font-serif-cormorant text-base sm:text-xl text-[#59524B] dark:text-[#C5BEB8] leading-relaxed">
                  {parseInlineMarkdown(cleanQuote)}
                </blockquote>
              );
            }

            // Markdown Table Parser
            if (trimmed.includes('|') && trimmed.split('\n').some((l) => l.trim().startsWith('|'))) {
              const lines = trimmed.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('|') && l.endsWith('|'));
              if (lines.length >= 2) {
                const isSep = (l: string) => /^\|[\s-:|]+\|$/.test(l);
                const headerLine = lines[0];
                const dataLines = lines.slice(1).filter((l) => !isSep(l));
                const headerCells = headerLine.split('|').slice(1, -1).map((c) => c.trim());
                
                return (
                  <div key={index} className="my-6 sm:my-8 overflow-x-auto rounded-xl border border-[#E8E2D9] dark:border-[#332F2C] shadow-xs">
                    <table className="w-full text-left text-xs sm:text-sm font-sans-inter border-collapse">
                      <thead className="bg-[#F3EFEA] dark:bg-[#272422] text-[#1A1A1A] dark:text-white font-bold border-b border-[#E8E2D9] dark:border-[#332F2C]">
                        <tr>
                          {headerCells.map((cell, cIdx) => (
                            <th key={cIdx} className="px-3.5 py-2.5 sm:px-4 sm:py-3 whitespace-nowrap">
                              {parseInlineMarkdown(cell)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E2D9] dark:divide-[#332F2C] bg-white dark:bg-[#1D1B1A]">
                        {dataLines.map((row, rIdx) => {
                          const cells = row.split('|').slice(1, -1).map((c) => c.trim());
                          return (
                            <tr key={rIdx} className="hover:bg-[#FAF8F5] dark:hover:bg-[#252220] transition-colors">
                              {cells.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-[#2C2825] dark:text-[#E0DDD8]">
                                  {parseInlineMarkdown(cell)}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
            }

            // Lists Parser
            const pLines = trimmed.split('\n');
            if (pLines.some((l) => /^[-*]\s+/.test(l.trim()) || /^\d+\.\s+/.test(l.trim()))) {
              const isOrdered = /^\d+\.\s/.test(pLines[0].trim());
              if (isOrdered) {
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 mb-5 sm:mb-7 text-[#1A1A1A]/95 dark:text-gray-100 font-sans-inter text-sm sm:text-base leading-relaxed pl-1">
                    {pLines.map((line, lIdx) => (
                      <li key={lIdx} className="pl-1">
                        {parseInlineMarkdown(line.trim().replace(/^\d+\.\s*/, ''))}
                      </li>
                    ))}
                  </ol>
                );
              } else {
                return (
                  <ul key={index} className="space-y-2.5 mb-5 sm:mb-7 text-[#1A1A1A]/95 dark:text-gray-100 font-sans-inter text-sm sm:text-base leading-relaxed pl-1">
                    {pLines.map((line, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A43] mt-2.5 shrink-0" />
                        <span>{parseInlineMarkdown(line.trim().replace(/^[-*]\s*/, ''))}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
            }

            return (
              <p key={index} className="mb-4 sm:mb-6 leading-relaxed sm:leading-loose text-[#1A1A1A]/95 dark:text-gray-100 break-words hyphens-auto tracking-normal">
                {parseInlineMarkdown(trimmed)}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 my-8 sm:my-10 pt-5 sm:pt-6 border-t border-[#E8E2D9] dark:border-[#332F2C]">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-[#F3EFEA] dark:bg-[#272422] text-[#736C65] dark:text-[#9E968F] text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio Box */}
        <div 
          onClick={() => onSelectAuthor && onSelectAuthor(post.author.name)}
          className="bg-[#F3EFEA] dark:bg-[#1D1B1A] p-4 sm:p-6 rounded-xl sm:rounded-2xl my-6 sm:my-10 border border-[#E8E2D9] dark:border-[#332F2C] flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 cursor-pointer hover:border-[#8C6A43] transition-colors"
          title={`${post.author.name} profiline git`}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-sm sm:text-base flex items-center justify-center border-2 border-[#8C6A43] shrink-0 shadow-xs">
            {getAuthorInitials(post.author.name)}
          </div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base mb-1">{post.author.name} Hakkında</h4>
            <p className="text-xs text-[#736C65] dark:text-[#9E968F] leading-relaxed">
              {post.author.bio}
            </p>
          </div>
        </div>

        {/* Interaction Bar (Likes, Social Share, Comments count) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-6 border-y border-[#E8E2D9] dark:border-[#332F2C] my-10">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Like button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all transform active:scale-95 ${
                hasLiked 
                  ? 'bg-[#8C6A43] text-white shadow-md' 
                  : 'bg-[#F3EFEA] dark:bg-[#272422] text-[#2C2825] dark:text-white hover:bg-[#E8E2D9] dark:hover:bg-[#332F2C]'
              }`}
            >
              <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{post.likes + (hasLiked ? 1 : 0)} Beğeni</span>
            </button>

            {/* Copy Link button */}
            <button
              onClick={handleCopyShare}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all transform active:scale-95 ${
                copiedLink
                  ? 'bg-green-700 text-white shadow-md'
                  : 'bg-[#F3EFEA] dark:bg-[#272422] text-[#2C2825] dark:text-white hover:bg-[#E8E2D9] dark:hover:bg-[#332F2C]'
              }`}
              title="Makale bağlantısını kopyala"
            >
              {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Bağlantı Kopyalandı!' : 'Bağlantıyı Kopyala'}</span>
            </button>
          </div>

          {/* Social Media Share Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8E2D9]/60 dark:border-[#332F2C]/60">
            <span className="text-xs font-semibold text-[#736C65] dark:text-[#9E968F] mr-1">Paylaş:</span>
            
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' — Bir Ada Dergi\n' + getArticleShareUrl(post.id))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-xs"
              title="WhatsApp'ta Paylaş"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.396C8.423 21.493 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.63 0-3.17-.432-4.507-1.189l-.323-.182-2.96.83.829-2.887-.202-.328A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(getArticleShareUrl(post.id))}&text=${encodeURIComponent(post.title + ' — Bir Ada Dergi')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all shadow-xs"
              title="Telegram'da Paylaş"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + ' — Bir Ada')}&url=${encodeURIComponent(getArticleShareUrl(post.id))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all shadow-xs"
              title="X (Twitter)'da Paylaş"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getArticleShareUrl(post.id))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-xs"
              title="Facebook'ta Paylaş"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getArticleShareUrl(post.id))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shadow-xs"
              title="LinkedIn'de Paylaş"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
              </svg>
            </a>

            {/* Native Share button (for Mobile devices) */}
            <button
              onClick={handleNativeShare}
              className="p-2.5 rounded-full bg-[#8C6A43]/10 text-[#8C6A43] hover:bg-[#8C6A43] hover:text-white transition-all shadow-xs"
              title="Diğer Seçeneklerle Paylaş"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-1 text-xs text-[#736C65] dark:text-[#9E968F] ml-3 pl-3 border-l border-[#E8E2D9] dark:border-[#332F2C]">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <section className="my-12">
          <h3 className="font-serif-newsreader text-2xl font-bold mb-6">
            Okur Yorumları ({post.comments.length})
          </h3>

          {/* New Comment Input Form */}
          <form onSubmit={handleSubmitComment} className="mb-8 bg-[#F3EFEA] dark:bg-[#1D1B1A] p-4 rounded-2xl border border-[#E8E2D9] dark:border-[#332F2C]">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Adınız (İsteğe bağlı)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#272422] border border-[#E8E2D9] dark:border-[#332F2C] rounded-lg text-xs focus:outline-none focus:border-[#8C6A43]"
              />
            </div>
            <div className="mb-3">
              <textarea
                rows={3}
                placeholder="Düşüncelerinizi zarif bir dille paylaşın..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-[#272422] border border-[#E8E2D9] dark:border-[#332F2C] rounded-lg text-xs focus:outline-none focus:border-[#8C6A43]"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#8C6A43] hover:bg-[#735332] text-white rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Yorum Yap
              </button>
            </div>
          </form>

          {/* Existing Comments List */}
          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <p className="text-xs italic text-[#736C65] text-center py-6">
                Henüz yorum yapılmamış. İlk düşünceyi siz paylaşın.
              </p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-xl bg-white/50 dark:bg-[#1D1B1A]/50 border border-[#E8E2D9] dark:border-[#332F2C]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">{comment.authorName}</span>
                    <time className="text-[10px] text-[#736C65]">{comment.createdAt}</time>
                  </div>
                  <p className="text-xs leading-relaxed text-[#59524B] dark:text-[#C5BEB8]">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t border-[#E8E2D9] dark:border-[#332F2C]">
            <h3 className="font-serif-newsreader text-2xl font-bold mb-6">
              İlginizi Çekebilecek Diğer Yazılar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <div 
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="p-4 rounded-xl bg-[#F3EFEA] dark:bg-[#1D1B1A] border border-[#E8E2D9] dark:border-[#332F2C] cursor-pointer hover:border-[#8C6A43] transition-all group"
                >
                  <span className="text-[10px] font-semibold text-[#8C6A43] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-serif-newsreader font-bold text-base group-hover:text-[#8C6A43] transition-colors leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
