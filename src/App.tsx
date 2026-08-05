import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BlogCard } from './components/BlogCard';
import { ArticleReader } from './components/ArticleReader';
import { FocusEditor } from './components/FocusEditor';
import { BookmarkDrawer } from './components/BookmarkDrawer';
import { WriterStatsModal } from './components/WriterStatsModal';
import { PdfMagazineModal } from './components/PdfMagazineModal';
import { SubmitArticleModal } from './components/SubmitArticleModal';
import { AuthorsView } from './components/AuthorsView';
import { BlogPost, CategoryName } from './types';
import { INITIAL_POSTS, CATEGORIES } from './data/initialPosts';
import { PenTool, BookOpen, Send, Users } from 'lucide-react';
import { BirAdaLogo } from './components/BirAdaLogo';
import { getArticleShareUrl, getAuthorShareUrl, getCleanHomeUrl } from './utils/urlUtils';

export default function App() {
  // Posts state initialized with INITIAL_POSTS or updated local storage
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('bir_ada_posts_v27');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge initial posts so code updates (authors, titles, images) override stale cache
          const initialIds = new Set(INITIAL_POSTS.map((p) => p.id));
          const customPosts = parsed.filter((p: BlogPost) => !initialIds.has(p.id));
          return [...INITIAL_POSTS, ...customPosts];
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_POSTS;
  });

  // Bookmarked post IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('bir_ada_bookmarks_v5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['post-pin-manifesto', 'post-oxford-martyrs', 'post-tate-modern'];
  });

  // Navigation & View state
  const [activeView, setActiveView] = useState<'feed' | 'reader' | 'editor' | 'authors'>('feed');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'Tümü'>('Tümü');

  // Drawers / Modals
  const [isBookmarkOpen, setIsBookmarkOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState<boolean>(false);
  const [isSubmitArticleOpen, setIsSubmitArticleOpen] = useState<boolean>(false);

  // Deep-link / Shared URL handler on initial mount & browser Back/Forward (popstate)
  useEffect(() => {
    const parseUrlRoute = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const yaziParam = urlParams.get('yazi') || urlParams.get('post') || urlParams.get('article') || urlParams.get('id');
        const hash = window.location.hash.replace(/^#/, '');
        const targetPostId = yaziParam || (hash.startsWith('post-') ? hash : null);

        if (targetPostId) {
          const found = posts.find(
            (p) => p.id === targetPostId || p.id.toLowerCase() === targetPostId.toLowerCase()
          );
          if (found) {
            setSelectedPost(found);
            setActiveView('reader');
            return;
          }
        }

        const yazarParam = urlParams.get('yazar') || urlParams.get('author');
        if (yazarParam) {
          const decodedAuthor = decodeURIComponent(yazarParam);
          setSelectedAuthorName(decodedAuthor);
          setActiveView('authors');
          return;
        }

        const kategoriParam = urlParams.get('kategori') || urlParams.get('category');
        if (kategoriParam) {
          const decodedCategory = decodeURIComponent(kategoriParam);
          if (CATEGORIES.some((c) => c.id === decodedCategory)) {
            setSelectedCategory(decodedCategory as CategoryName);
          }
          setActiveView('feed');
          return;
        }

        // If on root without article parameter
        if (window.location.search === '' && !targetPostId && !yazarParam) {
          if (activeView === 'reader') {
            setActiveView('feed');
            setSelectedPost(null);
          }
        }
      } catch (err) {
        console.error('URL parse error:', err);
      }
    };

    parseUrlRoute();
    window.addEventListener('popstate', parseUrlRoute);
    return () => window.removeEventListener('popstate', parseUrlRoute);
  }, [posts]);

  // Sync posts to LocalStorage
  useEffect(() => {
    localStorage.setItem('bir_ada_posts_v27', JSON.stringify(posts));
  }, [posts]);

  // Sync bookmarks to LocalStorage
  useEffect(() => {
    localStorage.setItem('bir_ada_bookmarks_v5', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Select article post with URL update
  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setActiveView('reader');
    try {
      const shareUrl = getArticleShareUrl(post.id);
      window.history.pushState({ postId: post.id, view: 'reader' }, '', shareUrl);
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to home handler (Clicking logo anywhere)
  const handleNavigateHome = () => {
    setActiveView('feed');
    setSelectedPost(null);
    setSelectedAuthorName(null);
    setSelectedCategory('Tümü');
    setSearchQuery('');
    setIsSubmitArticleOpen(false);
    setIsMagazineOpen(false);
    setIsStatsOpen(false);
    setIsBookmarkOpen(false);
    try {
      const cleanUrl = getCleanHomeUrl();
      window.history.pushState({ view: 'feed' }, '', cleanUrl);
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select author with URL update
  const handleSelectAuthor = (authorName: string) => {
    setSelectedAuthorName(authorName);
    setActiveView('authors');
    try {
      const authorUrl = getAuthorShareUrl(authorName);
      window.history.pushState({ authorName, view: 'authors' }, '', authorUrl);
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bookmark toggle handler
  const handleToggleBookmark = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  // Like handler
  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
    }
  };

  // Add Comment handler
  const handleAddComment = (postId: string, content: string, authorName: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName,
      authorAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      content,
      createdAt: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [newComment, ...p.comments] } : p))
    );

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) =>
        prev ? { ...prev, comments: [newComment, ...prev.comments] } : null
      );
    }
  };

  // Save new or edited post
  const handleSavePost = (postData: Partial<BlogPost>) => {
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === postData.id);
      if (exists) {
        return prev.map((p) => (p.id === postData.id ? ({ ...p, ...postData } as BlogPost) : p));
      } else {
        return [(postData as BlogPost), ...prev];
      }
    });
    setEditingPost(null);
    setActiveView('feed');
  };

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const bookmarkedPostsList = posts.filter((p) => bookmarkedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans-inter selection:bg-[#EBE8E0] pb-24 lg:pb-0">
      
      {/* Top Header Navigation */}
      {activeView !== 'editor' && (
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenSubmitArticle={() => setIsSubmitArticleOpen(true)}
          onOpenAuthors={() => {
            setSelectedAuthorName(null);
            setActiveView('authors');
          }}
          onOpenBookmarks={() => setIsBookmarkOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenMagazine={() => setIsMagazineOpen(true)}
          bookmarksCount={bookmarkedIds.length}
          categories={CATEGORIES}
          activeView={activeView}
          onNavigateHome={handleNavigateHome}
        />
      )}

      {/* VIEW 1: Editor View */}
      {activeView === 'editor' && (
        <FocusEditor
          editingPost={editingPost}
          onSavePost={handleSavePost}
          onClose={() => setActiveView('feed')}
        />
      )}

      {/* VIEW 2: Reader View */}
      {activeView === 'reader' && selectedPost && (
        <ArticleReader
          post={selectedPost}
          onBack={handleNavigateHome}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.includes(selectedPost.id)}
          onLikePost={handleLikePost}
          onAddComment={handleAddComment}
          relatedPosts={posts.filter((p) => p.id !== selectedPost.id && p.category === selectedPost.category).slice(0, 2)}
          onSelectRelated={(p) => handleSelectPost(p)}
          onSelectAuthor={handleSelectAuthor}
        />
      )}

      {/* VIEW 3: Authors Page */}
      {activeView === 'authors' && (
        <AuthorsView
          posts={posts}
          selectedAuthorName={selectedAuthorName}
          onSelectAuthorName={(name) => setSelectedAuthorName(name)}
          onSelectPost={(p) => handleSelectPost(p)}
          onToggleBookmark={handleToggleBookmark}
          bookmarkedIds={bookmarkedIds}
          onNavigateHome={handleNavigateHome}
          onOpenSubmitArticle={() => setIsSubmitArticleOpen(true)}
        />
      )}

      {/* VIEW 4: Feed / Home View */}
      {activeView === 'feed' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Editorial Banner Hero */}
          {selectedCategory === 'Tümü' && !searchQuery && (
            <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 bg-white p-8 sm:p-12 rounded-3xl border border-[#1A1A1A]/10 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 w-32 h-32 rounded-full bg-[#D4A373]/10 blur-xl pointer-events-none" />
              
              <button 
                onClick={handleNavigateHome}
                className="flex justify-center mx-auto mb-4 hover:opacity-90 transition-opacity"
                title="Anasayfa"
              >
                <BirAdaLogo size="lg" showText={false} />
              </button>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBE8E0] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest mb-4 border border-[#1A1A1A]/10">
                BRİTANYA ONLİNE DERGİ &amp; YAŞAM PLATFORMU
              </span>

              <h1 className="font-serif-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight mb-4 leading-tight">
                Bir Ada
              </h1>

              <p className="font-serif-playfair italic text-lg sm:text-2xl text-[#1A1A1A]/70 leading-relaxed max-w-3xl mx-auto mb-8">
                "Bir Arada, Bir Ada'da... Britanya'da yaşayan tüm toplumumuzu kucaklayan bağımsız haber, kültür, iş dünyası ve yaşam buluşması."
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsMagazineOpen(true)}
                  id="hero-magazine-btn"
                  className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#D4A373] text-white rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-all duration-300 shadow-sm flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#D4A373]" />
                  <span>PDF Dergi Sayısını Gör &amp; İndir</span>
                </button>
                <button
                  onClick={() => setIsSubmitArticleOpen(true)}
                  id="hero-submit-btn"
                  className="px-6 py-3 bg-[#EBE8E0] hover:bg-[#C8102E] text-[#1A1A1A] hover:text-white rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-all duration-300 border border-[#1A1A1A]/10 flex items-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4 text-[#D4A373]" />
                  <span>Yazı Gönder (Editör E-Posta)</span>
                </button>
              </div>
            </div>
          )}

          {/* Featured Post Card (If Tümü and no search) */}
          {selectedCategory === 'Tümü' && !searchQuery && featuredPost && (
            <section className="mb-12">
              <BlogCard
                post={featuredPost}
                onSelectPost={handleSelectPost}
                onToggleBookmark={handleToggleBookmark}
                isBookmarked={bookmarkedIds.includes(featuredPost.id)}
                featured={true}
                onSelectAuthor={handleSelectAuthor}
              />
            </section>
          )}

          {/* Section Header for Article List */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1A1A1A]/10">
            <div>
              <h2 className="font-serif-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {selectedCategory === 'Tümü' ? 'Tüm Dergi & Blog Yazıları' : selectedCategory}
              </h2>
              <p className="text-xs font-sans-inter text-[#1A1A1A]/50 mt-1">
                {filteredPosts.length} adet yayın listeleniyor
              </p>
            </div>

            <button
              onClick={() => setIsSubmitArticleOpen(true)}
              className="hidden sm:flex items-center gap-2 text-xs font-bold font-sans-inter uppercase tracking-widest text-[#1A1A1A] hover:text-[#C8102E] transition-colors"
            >
              <Send className="w-4 h-4 text-[#D4A373]" /> Yazı Gönder
            </button>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#1A1A1A]/10 p-8">
              <BookOpen className="w-12 h-12 text-[#D4A373] mx-auto mb-3 opacity-50" />
              <h3 className="font-serif-playfair text-xl font-bold mb-1 text-[#1A1A1A]">
                Bu kategoride henüz yazı bulunamadı
              </h3>
              <p className="text-xs font-sans-inter text-[#1A1A1A]/50 mb-6">
                Farklı bir kategori seçebilir veya editörümüze kendi makalenizi gönderebilirsiniz.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tümü');
                }}
                className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold font-sans-inter uppercase tracking-widest rounded-full hover:bg-[#D4A373] transition-colors"
              >
                Tüm Konuları Göster
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'Tümü' && !searchQuery ? regularPosts : filteredPosts).map(
                (post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onSelectPost={handleSelectPost}
                    onToggleBookmark={handleToggleBookmark}
                    isBookmarked={bookmarkedIds.includes(post.id)}
                    onSelectAuthor={handleSelectAuthor}
                  />
                )
              )}
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <button
            onClick={() => setIsSubmitArticleOpen(true)}
            id="mobile-submit-fab"
            className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#1A1A1A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 border border-white/20"
            title="Yazı Gönder"
          >
            <Send className="w-6 h-6 text-[#D4A373]" />
          </button>
        </main>
      )}

      {/* Footer */}
      {activeView !== 'editor' && (
        <footer className="mt-20 border-t border-[#1A1A1A]/10 bg-white py-12 text-center text-xs font-sans-inter text-[#1A1A1A]/60">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <button 
              onClick={handleNavigateHome} 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BirAdaLogo size="sm" showText={true} />
            </button>
            <p className="font-serif-playfair italic text-sm text-[#1A1A1A]/80">
              "Bir Arada, Bir Ada'da... Her hikâyeyi daha anlamlı kılar."
            </p>
            <p>© 2026 Bir Ada. Birleşik Krallık Online Dergi &amp; Yaşam Platformu.</p>
          </div>
        </footer>
      )}

      {/* Saved Bookmarks Drawer */}
      <BookmarkDrawer
        isOpen={isBookmarkOpen}
        onClose={() => setIsBookmarkOpen(false)}
        bookmarkedPosts={bookmarkedPostsList}
        onSelectPost={handleSelectPost}
        onRemoveBookmark={handleToggleBookmark}
      />

      {/* Writer Stats Modal */}
      <WriterStatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        posts={posts}
      />

      {/* PDF Magazine Modal Generator */}
      <PdfMagazineModal
        isOpen={isMagazineOpen}
        onClose={() => setIsMagazineOpen(false)}
        posts={posts}
      />

      {/* Submit Article Modal (eaydogan111@gmail.com) */}
      <SubmitArticleModal
        isOpen={isSubmitArticleOpen}
        onClose={() => setIsSubmitArticleOpen(false)}
      />
    </div>
  );
}
