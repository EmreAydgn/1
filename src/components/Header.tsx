import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  Bookmark, 
  BarChart2, 
  BookOpen,
  Users,
  Menu,
  X,
  ChevronRight,
  Home,
  Sparkles,
  PenTool
} from 'lucide-react';
import { CategoryName } from '../types';
import { BirAdaLogo } from './BirAdaLogo';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryName | 'Tümü';
  setSelectedCategory: (cat: CategoryName | 'Tümü') => void;
  onOpenSubmitArticle: () => void;
  onOpenAuthors: () => void;
  onOpenBookmarks: () => void;
  onOpenStats: () => void;
  onOpenMagazine: () => void;
  bookmarksCount: number;
  categories: { id: CategoryName; label: string }[];
  activeView: 'feed' | 'reader' | 'editor' | 'authors';
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenSubmitArticle,
  onOpenAuthors,
  onOpenBookmarks,
  onOpenStats,
  onOpenMagazine,
  bookmarksCount,
  categories,
  activeView,
  onNavigateHome,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleMobileNavigateHome = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    onNavigateHome();
  };

  return (
    <>
      {/* ==================== STICKY TOP HEADER ==================== */}
      <header className="sticky top-0 z-30 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Row */}
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Brand - Click goes home */}
            <div className="flex items-center gap-4">
              <button 
                type="button"
                onClick={handleMobileNavigateHome} 
                className="group text-left focus:outline-none cursor-pointer hover:opacity-80 active:scale-[0.98] transition-all duration-200 flex items-center"
                id="header-logo-btn"
                title="Anasayfaya Git"
                aria-label="Anasayfaya Git"
              >
                <BirAdaLogo showText={true} size="md" />
              </button>
            </div>

            {/* ==================== DESKTOP NAVIGATION (lg+) ==================== */}
            {/* Search bar (desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                <input
                  type="text"
                  placeholder="Yazı, konu veya yazar ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="header-search-input"
                  className="w-full pl-9 pr-4 py-2 bg-[#EBE8E0] border border-transparent rounded-full text-xs font-sans-inter text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:bg-white focus:border-[#1A1A1A] focus:outline-none transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              
              {/* Yazarlarımız Navigation Link */}
              <button
                onClick={onOpenAuthors}
                id="header-authors-btn"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold font-sans-inter uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeView === 'authors'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-[#EBE8E0] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A]/10'
                }`}
                title="Bir Ada Yazarlar Kadrosu"
              >
                <Users className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Yazarlarımız</span>
              </button>

              {/* PDF Magazine Action Trigger */}
              <button
                onClick={onOpenMagazine}
                id="header-magazine-btn"
                className="flex items-center gap-2 px-3.5 py-2 bg-[#EBE8E0] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white rounded-full text-xs font-bold font-sans-inter uppercase tracking-wider transition-all duration-300 border border-[#1A1A1A]/10 shadow-xs group cursor-pointer"
                title="Dergi Sayılarını İncele & PDF İndir"
              >
                <BookOpen className="w-4 h-4 text-[#D4A373] group-hover:text-[#D4A373]" />
                <span>PDF Dergi</span>
                <span className="bg-[#D4A373] text-[#1A1A1A] text-[9px] font-bold px-1.5 py-0.5 rounded-full">Sayı 01</span>
              </button>

              {/* Writer Stats Button */}
              <button
                onClick={onOpenStats}
                id="header-stats-btn"
                title="Yazar İstatistikleri"
                className="p-2.5 rounded-full text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EBE8E0] transition-colors cursor-pointer"
              >
                <BarChart2 className="w-5 h-5" />
              </button>

              {/* Bookmarks Drawer Button */}
              <button
                onClick={onOpenBookmarks}
                id="header-bookmarks-btn"
                title="Kaydedilenler"
                className="relative p-2.5 rounded-full text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EBE8E0] transition-colors cursor-pointer"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarksCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4A373] text-[#1A1A1A] text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {bookmarksCount}
                  </span>
                )}
              </button>

              {/* Primary Action: Yazı Gönder */}
              <button
                onClick={onOpenSubmitArticle}
                id="header-submit-article-btn"
                className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8102E] text-white rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-all duration-300 shadow-sm cursor-pointer"
                title="Yazınızı Editörümüze İletin"
              >
                <Send className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Yazı Gönder</span>
              </button>
            </div>

            {/* ==================== PHONE & TABLET TOP ACTION BAR (< lg) ==================== */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
              
              {/* Quick Search Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isMobileSearchOpen 
                    ? 'bg-[#1A1A1A] text-white' 
                    : 'text-[#1A1A1A] hover:bg-[#EBE8E0]'
                }`}
                title="Arama Yap"
                aria-label="Arama"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Quick Writer Stats */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileSearchOpen(false);
                  onOpenStats();
                }}
                className="p-2 rounded-full text-[#1A1A1A] hover:bg-[#EBE8E0] transition-all cursor-pointer"
                title="İstatistikler"
                aria-label="İstatistikler"
              >
                <BarChart2 className="w-4 h-4" />
              </button>

              {/* Menu Drawer Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  if (isMobileSearchOpen) setIsMobileSearchOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-sans-inter uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs ${
                  isMobileMenuOpen
                    ? 'bg-[#C8102E] text-white'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]'
                }`}
                aria-expanded={isMobileMenuOpen}
                aria-label="Menü"
              >
                {isMobileMenuOpen ? (
                  <>
                    <X className="w-3.5 h-3.5" />
                    <span>KAPAT</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>MENÜ</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Expandable Search Input for Phone/Tablet */}
          {isMobileSearchOpen && (
            <div className="lg:hidden py-3 border-t border-[#1A1A1A]/10 animate-fadeIn">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                <input
                  type="text"
                  placeholder="Yazı, konu veya yazar ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-9 py-2.5 bg-[#EBE8E0] border border-[#1A1A1A]/15 rounded-xl text-xs font-sans-inter text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:bg-white focus:border-[#1A1A1A] focus:outline-none shadow-inner"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1A1A1A]/50 p-1"
                  >
                    ✕
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                  >
                    Kapat
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Sub-header Category Filter Scrollbar */}
          {activeView === 'feed' && !isMobileMenuOpen && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 sm:py-3 border-t border-[#1A1A1A]/10">
              <button
                onClick={() => setSelectedCategory('Tümü')}
                id="cat-btn-all"
                className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold font-sans-inter uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === 'Tümü'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'bg-[#EBE8E0] text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/10 hover:text-[#1A1A1A]'
                }`}
              >
                Tüm Kategoriler
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`cat-btn-${cat.id}`}
                  className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold font-sans-inter uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'bg-[#EBE8E0] text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/10 hover:text-[#1A1A1A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

        </div>
      </header>

      {/* ==================== EXPANDABLE MOBILE / TABLET MENU DRAWER ==================== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Dark Backdrop Overlay with click-to-close */}
          <div 
            className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Box anchored below top bar */}
          <div className="relative z-50 top-16 sm:top-20 bg-[#FAF8F5] border-b border-[#1A1A1A]/15 shadow-2xl rounded-b-3xl p-5 max-w-lg mx-auto w-11/12 sm:w-full space-y-5 max-h-[calc(100vh-100px)] overflow-y-auto pb-28 animate-fadeIn">
            
            {/* Drawer Header & Close Row */}
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] block">
                  BİR ADA — DİJİTAL DERGİ
                </span>
                <p className="text-xs text-[#1A1A1A]/70 font-serif-newsreader italic">
                  Britanya Online Haber, Dergi & Yaşam Platformu
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-[#EBE8E0] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                aria-label="Menüyü Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search in Drawer */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
              <input
                type="text"
                placeholder="Yazı, yazar veya konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-white border border-[#1A1A1A]/15 rounded-xl text-xs font-sans-inter text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1A1A1A]/40"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Featured PDF Magazine Highlight Card */}
            <div 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMagazine();
              }}
              className="bg-[#1A1A1A] text-white p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#2A2A2A] transition-all group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] border border-white/10 flex items-center justify-center text-[#D4A373]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white">PDF Dergi Sayıları</span>
                    <span className="bg-[#D4A373] text-[#1A1A1A] text-[9px] font-bold px-1.5 py-0.2 rounded-full">Sayı 01</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-sans-inter mt-0.5">
                    Son sayıyı dijital formatta oku ve indir
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D4A373] group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Primary Action Links Grid */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Yazarlarımız */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuthors();
                }}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between h-24 ${
                  activeView === 'authors'
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Users className={`w-5 h-5 ${activeView === 'authors' ? 'text-[#D4A373]' : 'text-[#8C6A43]'}`} />
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">Yazarlarımız</span>
                  <span className="text-[10px] opacity-60">Geniş Yazar Kadrosu</span>
                </div>
              </button>

              {/* Yazı Gönder */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSubmitArticle();
                }}
                className="p-3.5 rounded-xl text-left bg-gradient-to-br from-[#1A1A1A] to-[#2C2825] text-white border border-[#1A1A1A] hover:opacity-95 transition-all cursor-pointer flex flex-col justify-between h-24 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Send className="w-5 h-5 text-[#D4A373]" />
                  <span className="bg-[#C8102E] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">İlet</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block text-white">Yazı Gönder</span>
                  <span className="text-[10px] text-white/60">Makalenizi Gönderin</span>
                </div>
              </button>

              {/* Yazar İstatistikleri */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenStats();
                }}
                className="p-3.5 rounded-xl text-left bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 transition-all cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="flex items-center justify-between">
                  <BarChart2 className="w-5 h-5 text-[#8C6A43]" />
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">İstatistikler</span>
                  <span className="text-[10px] text-[#1A1A1A]/60">Okunma Verileri</span>
                </div>
              </button>

              {/* Kaydedilenler */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBookmarks();
                }}
                className="p-3.5 rounded-xl text-left bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 transition-all cursor-pointer flex flex-col justify-between h-24 relative"
              >
                <div className="flex items-center justify-between">
                  <Bookmark className="w-5 h-5 text-[#8C6A43]" />
                  {bookmarksCount > 0 ? (
                    <span className="bg-[#D4A373] text-[#1A1A1A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {bookmarksCount} Kayıt
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">Kaydedilenler</span>
                  <span className="text-[10px] text-[#1A1A1A]/60">Okuma Listeniz</span>
                </div>
              </button>

            </div>

            {/* Categories Navigation List */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50 block mb-2.5">
                Kategori Seçimi
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('Tümü');
                    setIsMobileMenuOpen(false);
                    if (activeView !== 'feed') onNavigateHome();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === 'Tümü'
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-[#1A1A1A]/70 border border-[#1A1A1A]/10 hover:bg-[#EBE8E0]'
                  }`}
                >
                  Tümü
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsMobileMenuOpen(false);
                      if (activeView !== 'feed') onNavigateHome();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-white text-[#1A1A1A]/70 border border-[#1A1A1A]/10 hover:bg-[#EBE8E0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#1A1A1A]/10 text-center">
              <p className="text-[11px] font-serif-newsreader italic text-[#1A1A1A]/60">
                “Britanya'da yaşayan tüm Türk toplumunu kucaklayan bağımsız platform.”
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ==================== PREMIUM FLOATING BOTTOM DOCK (PHONE & TABLET - < lg) ==================== */}
      <nav 
        aria-label="Mobil ve Tablet Alt Navigasyon"
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-2.5 sm:px-3 py-1.5 flex items-center justify-between gap-1 sm:gap-2 max-w-[94vw] sm:max-w-md text-white transition-all duration-300"
      >
        {/* 1. Anasayfa */}
        <button
          type="button"
          onClick={handleMobileNavigateHome}
          className={`flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            activeView === 'feed'
              ? 'bg-white/15 text-white font-bold scale-105'
              : 'text-white/60 hover:text-white'
          }`}
          title="Anasayfa"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-sans-inter uppercase tracking-wider mt-0.5">Anasayfa</span>
        </button>

        {/* 2. Yazarlar */}
        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
            onOpenAuthors();
          }}
          className={`flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            activeView === 'authors'
              ? 'bg-white/15 text-white font-bold scale-105'
              : 'text-white/60 hover:text-white'
          }`}
          title="Yazarlarımız"
        >
          <Users className="w-4 h-4 text-[#D4A373]" />
          <span className="text-[9px] font-sans-inter uppercase tracking-wider mt-0.5">Yazarlar</span>
        </button>

        {/* 3. PDF Dergi */}
        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
            onOpenMagazine();
          }}
          className="flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full text-white/60 hover:text-white transition-all duration-200 cursor-pointer relative"
          title="PDF Dergi"
        >
          <div className="relative">
            <BookOpen className="w-4 h-4 text-[#D4A373]" />
            <span className="absolute -top-1.5 -right-2 bg-[#D4A373] text-[#1A1A1A] text-[8px] font-bold px-1 rounded-full leading-none py-0.5">
              01
            </span>
          </div>
          <span className="text-[9px] font-sans-inter uppercase tracking-wider mt-0.5">Dergi</span>
        </button>

        {/* 4. Kaydedilenler */}
        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
            onOpenBookmarks();
          }}
          className="flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-full text-white/60 hover:text-white transition-all duration-200 cursor-pointer relative"
          title="Kaydedilenler"
        >
          <div className="relative">
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D4A373] text-[#1A1A1A] text-[8px] font-bold px-1 rounded-full leading-none py-0.5 min-w-[14px] text-center">
                {bookmarksCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-sans-inter uppercase tracking-wider mt-0.5">Kayıtlar</span>
        </button>

        {/* 5. Yazı Gönder (Highlight Action) */}
        <button
          type="button"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
            onOpenSubmitArticle();
          }}
          className="flex items-center gap-1 bg-[#C8102E] hover:bg-[#a00c24] text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer ml-1 active:scale-95"
          title="Yazı Gönder"
        >
          <Send className="w-3 h-3 text-[#D4A373]" />
          <span className="hidden sm:inline">Gönder</span>
        </button>
      </nav>
    </>
  );
};

