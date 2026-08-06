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
        <div className="lg:col-span-7 relative overflow-hidden min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] flex flex-col justify-between">
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80';
            }}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Natural Editorial Magazine Cover Presentation */}
          {post.id === 'post-pin-manifesto' || post.category === 'Dergi Tanıtımı' || post.pinned ? (
            <>
              {/* Soft, natural gradient only at the top and bottom edges for effortless readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

              {/* Natural Editorial Masthead (Top) */}
              <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-white/90 text-[10px] sm:text-xs font-sans-inter uppercase tracking-[0.2em] font-semibold drop-shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#D4A373]" />
                    <span>Britanya - Türk Toplumu Dergisi</span>
                  </div>
                  <h1 className="font-serif-playfair text-2xl sm:text-4xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-md mt-1">
                    BİR ADA
                  </h1>
                </div>

                <span className="bg-[#1A1A1A]/80 backdrop-blur-xs text-white border border-white/20 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold font-sans-inter uppercase tracking-wider shadow-sm">
                  1. Sayı
                </span>
              </div>

              {/* Natural Editorial Lower Tag (Bottom) */}
              <div className="relative z-10 p-4 sm:p-6 text-white">
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/80 font-sans-inter border-t border-white/20 pt-2 drop-shadow-sm">
                  <span className="font-medium tracking-wider uppercase">İlk Baskı &amp; Özel Sayı</span>
                  <span className="tracking-widest">Londra • 2026</span>
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

        <div className="lg:col-span-5 p-7 lg:p-9 flex flex-col justify-between bg-[#FAF8F5]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className={`text-[10px] font-bold font-sans-inter uppercase tracking-[0.18em] px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                post.pinned || post.category === 'Dergi Tanıtımı'
                  ? 'bg-[#1A1A1A] text-[#D4A373] border-[#D4A373]/30 shadow-xs'
                  : 'text-[#D4A373] bg-white border-[#1A1A1A]/10'
              }`}>
                {post.pinned && <Pin className="w-3 h-3 text-[#D4A373] fill-current" />}
                <span>{post.pinned || post.category === 'Dergi Tanıtımı' ? '1. Sayı • Dergi Tanıtımı' : post.category}</span>
              </span>
              <div className="flex items-center gap-1 text-xs font-sans-inter text-[#1A1A1A]/50">
                <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{post.readTimeMinutes} dk okuma</span>
              </div>
            </div>

            <h2 className="font-serif-playfair text-2xl lg:text-3xl font-bold text-[#1A1A1A] group-hover:text-[#8C6D4F] transition-colors leading-snug mb-3">
              {post.title}
            </h2>

            {post.subtitle && (
              <p className="text-sm font-serif-playfair italic text-[#1A1A1A]/75 mb-3.5 line-clamp-2 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            <p className="text-xs sm:text-[13px] font-sans-inter text-[#1A1A1A]/70 leading-relaxed line-clamp-3 mb-6">
              {post.excerpt}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between pt-5 border-t border-[#1A1A1A]/10">
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
