import React, { useState } from 'react';
import { Clock, Heart, Bookmark, Eye, ArrowUpRight, Sparkles, Pin, Share2, Check } from 'lucide-react';
import { BlogPost } from '../types';
import { getAuthorInitials } from '../utils/authorUtils';
import { getArticleShareUrl } from '../utils/urlUtils';

interface BlogCardProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
  onToggleBookmark: (postId: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
  featured?: boolean;
  onSelectAuthor?: (authorName: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  onSelectPost,
  onToggleBookmark,
  isBookmarked,
  featured = false,
  onSelectAuthor,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleAuthorClick = (e: React.MouseEvent) => {
    if (onSelectAuthor) {
      e.stopPropagation();
      onSelectAuthor(post.author.name);
    }
  };

  const handleQuickShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getArticleShareUrl(post.id);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.title} - Bir Ada`,
          text: post.subtitle || post.excerpt || post.title,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  if (featured) {
    return (
      <article 
        onClick={() => onSelectPost(post)}
        id={`post-card-featured-${post.id}`}
        className={`group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 mb-12 ${
          post.pinned ? 'border-2 border-[#D4A373]/40 ring-1 ring-[#D4A373]/20' : 'border border-[#1A1A1A]/10'
        }`}
      >
        <div className="lg:col-span-7 relative overflow-hidden min-h-[360px] lg:min-h-[460px] flex flex-col justify-between">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Magazine Cover Overlay for Manifesto / 1. Sayı Dergi */}
          {post.id === 'post-pin-manifesto' || post.category === 'Dergi Tanıtımı' || post.pinned ? (
            <>
              {/* Balanced Editorial Contrast Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/85 pointer-events-none" />

              {/* Magazine Framing Passepartout Border */}
              <div className="absolute inset-3 sm:inset-4 border border-white/40 sm:border-white/50 rounded-2xl pointer-events-none z-10 flex flex-col justify-between p-3.5 sm:p-5">
                
                {/* Top Masthead Header */}
                <div>
                  <div className="flex items-center justify-between text-white/90 pb-2 border-b border-white/30 text-[9px] sm:text-[11px] font-sans-inter uppercase tracking-[0.18em] font-bold">
                    <span className="text-[#FCD34D] drop-shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D] animate-pulse" />
                      BRİTANYA - TÜRK TOPLUMU DERGİSİ
                    </span>
                    <span className="bg-[#D4A373] text-[#1A1A1A] px-2 sm:px-2.5 py-0.5 rounded text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider shadow-xs">
                      1. SAYI
                    </span>
                  </div>

                  {/* Main Magazine Title */}
                  <div className="pt-2 sm:pt-3 text-center sm:text-left">
                    <h1 className="font-serif-playfair text-3xl sm:text-5xl lg:text-5xl font-black tracking-[0.14em] text-white uppercase drop-shadow-lg leading-none">
                      BİR ADA
                    </h1>
                    <p className="font-serif-playfair italic text-white/90 text-[11px] sm:text-xs tracking-wide mt-1.5 drop-shadow-sm">
                      "Bir Arada, Bir Ada'da" • İlk Baskı &amp; Özel Sayı
                    </p>
                  </div>
                </div>

                {/* Bottom Cover Headlines & Barcode / Issue details */}
                <div>
                  <div className="bg-black/45 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-white/20 mb-2">
                    <span className="text-[#FCD34D] text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest block font-sans-inter mb-0.5">
                      ÖZEL KAPAK DOSYASI
                    </span>
                    <h3 className="font-serif-playfair text-white text-sm sm:text-base lg:text-lg font-bold leading-snug drop-shadow-sm">
                      Britanya'da Yaşayan Türk Toplumunun Bağımsız Sesi
                    </h3>
                    <p className="text-white/80 text-[10px] sm:text-[11px] font-sans-inter line-clamp-1 mt-0.5">
                      Londra, Edinburgh, Cardiff • Göç, Yaşam, Sanat ve Toplum
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-white/70 text-[8px] sm:text-[9.5px] font-sans-inter pt-1 border-t border-white/20">
                    <span className="font-mono tracking-wider">ISSN 2814-9921 • SAYI: 01</span>
                    <span className="uppercase tracking-widest font-semibold text-white/90">LONDRA • AĞUSTOS 2026</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
              <span className="absolute top-4 left-4 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest font-sans-inter px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-[#D4A373]/40 z-10">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" /> Öne Çıkan Makale
              </span>
            </>
          )}
        </div>

        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-[#F9F7F2]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className={`text-[10px] font-bold font-sans-inter uppercase tracking-[0.2em] px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                post.pinned || post.category === 'Dergi Tanıtımı'
                  ? 'bg-[#1A1A1A] text-[#D4A373] border-[#D4A373]/40 shadow-xs'
                  : 'text-[#D4A373] bg-white border-[#1A1A1A]/10'
              }`}>
                {post.pinned && <Pin className="w-3 h-3 text-[#D4A373] fill-current" />}
                <span>{post.pinned || post.category === 'Dergi Tanıtımı' ? 'Dergi Tanıtımı' : post.category}</span>
              </span>
              <div className="flex items-center gap-1 text-xs font-sans-inter text-[#1A1A1A]/50">
                <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{post.readTimeMinutes} dk okuma</span>
              </div>
            </div>

            <h2 className="font-serif-playfair text-2xl lg:text-3xl font-bold text-[#1A1A1A] group-hover:text-[#D4A373] transition-colors leading-tight mb-3">
              {post.title}
            </h2>

            {post.subtitle && (
              <p className="text-sm font-serif-playfair italic text-[#1A1A1A]/70 mb-4 line-clamp-2">
                {post.subtitle}
              </p>
            )}

            <p className="text-xs font-sans-inter text-[#1A1A1A]/70 leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between pt-6 border-t border-[#1A1A1A]/10">
              <div 
                onClick={handleAuthorClick}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group/author"
                title={`${post.author.name} profiline git`}
              >
                <div className="w-9 h-9 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-xs flex items-center justify-center border border-[#1A1A1A]/10 shrink-0 shadow-xs">
                  {getAuthorInitials(post.author.name)}
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans-inter text-[#1A1A1A] group-hover/author:text-[#C8102E] transition-colors">
                    {post.author.name}
                  </h4>
                  <time className="text-[10px] font-sans-inter text-[#1A1A1A]/50">{formattedDate}</time>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuickShare}
                  id={`share-btn-${post.id}`}
                  className={`p-2.5 rounded-full transition-all ${
                    copied
                      ? 'bg-green-700 text-white shadow-xs'
                      : 'bg-white text-[#1A1A1A]/60 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
                  }`}
                  title={copied ? 'Bağlantı kopyalandı!' : 'Makaleyi Paylaş'}
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => onToggleBookmark(post.id, e)}
                  id={`bookmark-btn-${post.id}`}
                  className={`p-2.5 rounded-full transition-colors ${
                    isBookmarked
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-[#1A1A1A]/60 hover:text-[#1A1A1A] border border-[#1A1A1A]/10'
                  }`}
                  title={isBookmarked ? 'Kaydedildi' : 'Kaydet'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <div className="w-9 h-9 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:bg-[#D4A373] transition-colors shadow-xs">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article 
      onClick={() => onSelectPost(post)}
      id={`post-card-${post.id}`}
      className={`group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
        post.pinned ? 'border-2 border-[#D4A373]/50 ring-1 ring-[#D4A373]/20 shadow-sm' : 'border border-[#1A1A1A]/10'
      }`}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#EBE8E0]">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className={`absolute top-3 left-3 text-[10px] font-bold font-sans-inter uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-md ${
            post.pinned || post.category === 'Dergi Tanıtımı'
              ? 'bg-[#1A1A1A]/95 text-[#D4A373] border border-[#D4A373]/40'
              : 'bg-white/95 text-[#1A1A1A] border border-[#1A1A1A]/10'
          }`}>
            {post.pinned && <Pin className="w-3 h-3 text-[#D4A373] fill-current" />}
            <span>{post.pinned || post.category === 'Dergi Tanıtımı' ? 'Dergi Tanıtımı' : post.category}</span>
          </div>
          <button
            onClick={(e) => onToggleBookmark(post.id, e)}
            id={`bookmark-card-btn-${post.id}`}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-[#1A1A1A] text-white shadow-md'
                : 'bg-white/80 text-[#1A1A1A] hover:bg-white hover:text-[#D4A373]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs font-sans-inter text-[#1A1A1A]/50 mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D4A373]" />
              {post.readTimeMinutes} dk
            </span>
            <span>•</span>
            <time>{formattedDate}</time>
          </div>

          <h3 className="font-serif-playfair text-xl font-bold text-[#1A1A1A] group-hover:text-[#D4A373] transition-colors line-clamp-2 mb-2 leading-snug">
            {post.title}
          </h3>

          <p className="text-xs font-sans-inter text-[#1A1A1A]/70 leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 border-t border-transparent group-hover:border-[#1A1A1A]/5 transition-colors">
        <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/5">
          <div 
            onClick={handleAuthorClick}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer group/author"
            title={`${post.author.name} profiline git`}
          >
            <div className="w-7 h-7 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-[10px] flex items-center justify-center border border-[#1A1A1A]/10 shrink-0 shadow-xs">
              {getAuthorInitials(post.author.name)}
            </div>
            <span className="text-xs font-bold font-sans-inter text-[#1A1A1A] group-hover/author:text-[#C8102E] transition-colors">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-sans-inter text-[#1A1A1A]/50">
            <button
              onClick={handleQuickShare}
              className={`p-1.5 rounded-full transition-all hover:text-[#1A1A1A] ${
                copied ? 'text-green-700 font-bold' : ''
              }`}
              title={copied ? 'Bağlantı kopyalandı!' : 'Makaleyi Paylaş'}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#D4A373]" />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
