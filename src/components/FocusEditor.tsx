import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Bold, 
  Italic, 
  Heading, 
  Quote, 
  List, 
  FileText, 
  Wand2, 
  Check, 
  Layers,
  X,
  Type
} from 'lucide-react';
import { BlogPost, CategoryName } from '../types';
import { CATEGORIES } from '../data/initialPosts';

interface FocusEditorProps {
  editingPost: BlogPost | null;
  onSavePost: (postData: Partial<BlogPost>) => void;
  onClose: () => void;
}

const COVER_PRESETS = [
  { name: 'Aşk & Kitaplar', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Gece Şehri', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sanat & Soyut', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Japonya Çay', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Kahve & Daktilo', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Minimal Orman', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' },
];

export const FocusEditor: React.FC<FocusEditorProps> = ({
  editingPost,
  onSavePost,
  onClose,
}) => {
  const [title, setTitle] = useState(editingPost?.title || '');
  const [subtitle, setSubtitle] = useState(editingPost?.subtitle || '');
  const [content, setContent] = useState(editingPost?.content || '');
  const [excerpt, setExcerpt] = useState(editingPost?.excerpt || '');
  const [category, setCategory] = useState<CategoryName>(editingPost?.category || 'Edebiyat & Felsefe');
  const [tags, setTags] = useState<string>(editingPost?.tags ? editingPost.tags.join(', ') : 'Edebiyat, Deneme');
  const [coverImage, setCoverImage] = useState<string>(editingPost?.coverImage || COVER_PRESETS[0].url);

  // Focus / Preview State
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // AI Assistant Drawer state
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [selectedTone, setSelectedTone] = useState<string>('Edebi & Derin');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiResultText, setAiResultText] = useState<string>('');

  // Save indicator
  const [savedToast, setSavedToast] = useState<boolean>(false);

  // Word & Reading Time stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // Insert markdown snippet at cursor
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('blog-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${prefix}${selected || 'metin'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
  };

  // Call server-side Gemini AI Writing Assistant
  const handleAiAction = async (action: 'polish' | 'expand' | 'titles' | 'summary' | 'continue') => {
    setIsAiLoading(true);
    setAiResultText('');
    setAiSuggestions([]);

    try {
      const response = await fetch('/api/ai/writing-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          text: content || title || 'Edebiyat ve insan ruhu',
          context: title,
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`Yapay Zeka Hatası: ${data.error}`);
        return;
      }

      if (action === 'titles' && data.titles) {
        setAiSuggestions(data.titles);
      } else if (action === 'summary' && data.result) {
        setExcerpt(data.result);
        setAiResultText('Özet başarıyla oluşturuldu ve Özet kutusuna aktarıldı.');
      } else if (data.result) {
        setAiResultText(data.result);
      }
    } catch (err: any) {
      console.error(err);
      alert('Yapay zeka asistanına bağlanırken bir sorun oluştu.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyAiResult = () => {
    if (aiResultText) {
      setContent((prev) => `${prev}\n\n${aiResultText}`);
      setAiResultText('');
      setShowAiModal(false);
    }
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!title.trim()) {
      alert('Lütfen yazınıza bir başlık ekleyin.');
      return;
    }

    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const postData: Partial<BlogPost> = {
      id: editingPost?.id || `post-${Date.now()}`,
      title,
      subtitle,
      content: content || 'Henüz metin girilmedi.',
      excerpt: excerpt || content.substring(0, 140) + '...',
      category,
      tags: tagArray,
      coverImage,
      readTimeMinutes,
      status,
      updatedAt: new Date().toISOString(),
      createdAt: editingPost?.createdAt || new Date().toISOString(),
      likes: editingPost?.likes || 0,
      views: editingPost?.views || 1,
      bookmarksCount: editingPost?.bookmarksCount || 0,
      comments: editingPost?.comments || [],
      author: editingPost?.author || {
        name: 'Merve Karan',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Edebiyat araştırmacısı ve edebi deneme yazarı.',
      },
    };

    onSavePost(postData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className={`min-h-screen bg-[#F9F7F2] text-[#1A1A1A] flex flex-col ${isFocusMode ? 'fixed inset-0 z-50 overflow-y-auto bg-[#F9F7F2]' : ''}`}>
      
      {/* Top Header Controls */}
      <header className="sticky top-0 z-30 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            id="editor-close-btn"
            className="p-2 rounded-full hover:bg-[#EBE8E0] text-[#1A1A1A]/60 transition-colors"
            title="Kapat"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-serif-playfair text-xl font-bold text-[#1A1A1A]">
              {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Oluştur'}
            </h2>
            <p className="text-[10px] font-sans-inter uppercase tracking-[0.2em] text-[#D4A373] font-bold">
              {wordCount} kelime • {readTimeMinutes} dk okuma
            </p>
          </div>
        </div>

        {/* Toolbar Center & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Assistant Button */}
          <button
            onClick={() => setShowAiModal(true)}
            id="editor-ai-btn"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#EBE8E0] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-all border border-[#1A1A1A]/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            <span className="hidden sm:inline">Yazı Asistanı</span>
          </button>

          {/* Toggle Focus Mode */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            id="editor-focus-btn"
            className={`p-2 rounded-full transition-colors ${
              isFocusMode ? 'bg-[#1A1A1A] text-white' : 'bg-[#EBE8E0] text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
            title={isFocusMode ? 'Odak Modundan Çık' : 'Odak / Zen Modu (Sadece Yaz)'}
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Save Draft */}
          <button
            onClick={() => handleSave('draft')}
            id="editor-draft-btn"
            className="px-4 py-2 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/10 text-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-colors"
          >
            Taslak
          </button>

          {/* Publish Button */}
          <button
            onClick={() => handleSave('published')}
            id="editor-publish-btn"
            className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#D4A373] text-white rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter shadow-xs transition-all"
          >
            Yayınla
          </button>
        </div>
      </header>

      {/* Editor Body Area */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Formatting Toolbar */}
        <div className="mb-6 p-2 bg-white rounded-2xl border border-[#1A1A1A]/10 shadow-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => insertFormatting('**', '**')}
              className="p-2 rounded hover:bg-[#EBE8E0] text-[#1A1A1A]/60"
              title="Kalın Metin"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('*', '*')}
              className="p-2 rounded hover:bg-[#EBE8E0] text-[#1A1A1A]/60"
              title="Yatık (İtalik) Metin"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('### ')}
              className="p-2 rounded hover:bg-[#EBE8E0] text-[#1A1A1A]/60"
              title="Ara Başlık (H3)"
            >
              <Heading className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('> ')}
              className="p-2 rounded hover:bg-[#EBE8E0] text-[#1A1A1A]/60"
              title="Alıntı (Blockquote)"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('* ')}
              className="p-2 rounded hover:bg-[#EBE8E0] text-[#1A1A1A]/60"
              title="Madde İşaretli Liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans-inter text-[#1A1A1A]/40">
            <span>{charCount} Karakter</span>
            <span>•</span>
            <span>{wordCount} Kelime</span>
          </div>
        </div>

        {/* Article Meta Setup Bar (Category, Tags, Cover image preset) */}
        {!isFocusMode && (
          <div className="mb-8 p-6 bg-white rounded-2xl border border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category Select */}
            <div>
              <label className="block text-[10px] font-sans-inter uppercase tracking-[0.2em] font-bold text-[#D4A373] mb-2">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryName)}
                className="w-full p-2.5 bg-[#F9F7F2] border border-[#1A1A1A]/10 rounded-xl text-xs font-sans-inter font-medium text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-[10px] font-sans-inter uppercase tracking-[0.2em] font-bold text-[#D4A373] mb-2">
                Etiketler (Virgülle ayırın)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Edebiyat, Deneme, Şiir"
                className="w-full p-2.5 bg-[#F9F7F2] border border-[#1A1A1A]/10 rounded-xl text-xs font-sans-inter text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            {/* Cover Image Preset */}
            <div>
              <label className="block text-[10px] font-sans-inter uppercase tracking-[0.2em] font-bold text-[#D4A373] mb-2">
                Kapak Görseli
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Görsel URL veya galeriden seçin"
                  className="w-full p-2.5 bg-[#F9F7F2] border border-[#1A1A1A]/10 rounded-xl text-xs font-sans-inter text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Cover Presets Bar */}
            <div className="md:col-span-3">
              <span className="text-[11px] font-sans-inter text-[#1A1A1A]/50 block mb-2">
                Hızlı Görsel Galerisi:
              </span>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {COVER_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setCoverImage(p.url)}
                    className={`flex-shrink-0 flex items-center gap-2 p-1.5 rounded-xl border text-xs font-sans-inter transition-all ${
                      coverImage === p.url ? 'border-[#1A1A1A] bg-[#EBE8E0] text-[#1A1A1A] font-bold' : 'border-[#1A1A1A]/10 bg-[#F9F7F2] text-[#1A1A1A]/60'
                    }`}
                  >
                    <img src={p.url} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Writing Canvas Inputs */}
        <div className="space-y-6">
          
          {/* Article Main Title Input */}
          <input
            type="text"
            placeholder="İlham verici bir başlık atın..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="blog-editor-title-input"
            className="w-full font-serif-playfair text-3xl sm:text-4xl lg:text-5xl font-bold bg-transparent text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none border-b border-transparent focus:border-[#1A1A1A]/10 py-2"
          />

          {/* Subtitle Input */}
          <input
            type="text"
            placeholder="Yazının ruhunu özetleyen bir alt başlık ekleyin (isteğe bağlı)..."
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full font-serif-playfair italic text-xl bg-transparent text-[#1A1A1A]/60 placeholder-[#1A1A1A]/30 focus:outline-none py-1"
          />

          {/* Excerpt Input */}
          {!isFocusMode && (
            <div>
              <label className="block text-[10px] font-sans-inter uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/40 mb-1">
                Kısa Özet (Okurlara kart görünümünde gösterilecek cümle)
              </label>
              <input
                type="text"
                placeholder="Özet ekleyin veya AI Asistanından 'Özet Oluştur'u seçin..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full p-3 bg-white border border-[#1A1A1A]/10 rounded-xl text-xs font-sans-inter text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>
          )}

          {/* Main Textarea Writing Studio */}
          <textarea
            id="blog-editor-textarea"
            rows={18}
            placeholder="Kelimelerinizi serbest bırakın... Paragraflar arasında boşluk bırakabilir, ara başlıklar için '### Ara Başlık' yazabilirsiniz."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full font-serif-playfair text-lg sm:text-xl leading-relaxed p-6 bg-white border border-[#1A1A1A]/10 rounded-2xl text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 shadow-xs resize-y"
          />
        </div>
      </div>

      {/* AI Writing Assistant Modal / Drawer */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#F9F7F2] rounded-3xl max-w-2xl w-full border border-[#1A1A1A]/10 p-6 lg:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#1A1A1A]/60 hover:bg-[#EBE8E0]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-[#D4A373] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">
                  Güzel Yazı Asistanı (Gemini AI)
                </h3>
                <p className="text-xs font-sans-inter text-[#1A1A1A]/50">
                  Yazınızı daha edebi, akıcı ve büyüleyici hale getirin.
                </p>
              </div>
            </div>

            {/* Tone Selector */}
            <div className="mb-6">
              <label className="block text-[10px] font-sans-inter uppercase tracking-[0.2em] font-bold text-[#D4A373] mb-2">
                Yazım Üslubu / Tonu
              </label>
              <div className="flex flex-wrap gap-2">
                {['Edebi & Derin', 'Şiirsel', 'Akademik & Felsefi', 'Sade & Akıcı'].map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setSelectedTone(tone)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans-inter font-bold uppercase tracking-wider transition-all ${
                      selectedTone === tone
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#EBE8E0] text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/10'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => handleAiAction('polish')}
                disabled={isAiLoading}
                className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-left transition-all group"
              >
                <div className="flex items-center gap-2 font-bold text-xs font-sans-inter text-[#1A1A1A] group-hover:text-[#D4A373] mb-1">
                  <Wand2 className="w-4 h-4 text-[#D4A373]" />
                  <span>Cilala &amp; Üslubu Güzelleştir</span>
                </div>
                <p className="text-[11px] font-sans-inter text-[#1A1A1A]/50">Imla hatalarını düzeltir, cümle akışını edebi kılar.</p>
              </button>

              <button
                onClick={() => handleAiAction('expand')}
                disabled={isAiLoading}
                className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-left transition-all group"
              >
                <div className="flex items-center gap-2 font-bold text-xs font-sans-inter text-[#1A1A1A] group-hover:text-[#D4A373] mb-1">
                  <Layers className="w-4 h-4 text-[#D4A373]" />
                  <span>Düşünceyi Derinleştir</span>
                </div>
                <p className="text-[11px] font-sans-inter text-[#1A1A1A]/50">Mevcut taslağı estetik tasvirlerle zenginleştirir.</p>
              </button>

              <button
                onClick={() => handleAiAction('titles')}
                disabled={isAiLoading}
                className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-left transition-all group"
              >
                <div className="flex items-center gap-2 font-bold text-xs font-sans-inter text-[#1A1A1A] group-hover:text-[#D4A373] mb-1">
                  <Type className="w-4 h-4 text-[#D4A373]" />
                  <span>5 Etkileyici Başlık Öner</span>
                </div>
                <p className="text-[11px] font-sans-inter text-[#1A1A1A]/50">Konunuza uygun vurucu ve merak uyandıran başlıklar sunar.</p>
              </button>

              <button
                onClick={() => handleAiAction('summary')}
                disabled={isAiLoading}
                className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-left transition-all group"
              >
                <div className="flex items-center gap-2 font-bold text-xs font-sans-inter text-[#1A1A1A] group-hover:text-[#D4A373] mb-1">
                  <FileText className="w-4 h-4 text-[#D4A373]" />
                  <span>Şiirsel Özet Çıkar</span>
                </div>
                <p className="text-[11px] font-sans-inter text-[#1A1A1A]/50">Yazının 2 cümlelik özeti oluşturup kutuya doldurur.</p>
              </button>
            </div>

            {/* AI Loading Spinner */}
            {isAiLoading && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-3 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs font-serif-playfair italic text-[#D4A373]">
                  Kelimeler dokunuyor, yapay zeka yazınızı ilhamla işliyor...
                </p>
              </div>
            )}

            {/* AI Output Results */}
            {aiSuggestions.length > 0 && (
              <div className="mb-6 p-4 bg-[#EBE8E0] rounded-2xl border border-[#1A1A1A]/10">
                <h4 className="text-[10px] font-bold text-[#D4A373] font-sans-inter uppercase tracking-[0.2em] mb-3">
                  Önerilen Başlıklar:
                </h4>
                <div className="space-y-2">
                  {aiSuggestions.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTitle(t);
                        setShowAiModal(false);
                      }}
                      className="w-full text-left p-2 rounded-lg bg-white/80 hover:bg-white text-xs font-serif-playfair font-semibold text-[#1A1A1A] transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {aiResultText && (
              <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10">
                <h4 className="text-[10px] font-bold text-[#D4A373] font-sans-inter uppercase tracking-[0.2em] mb-2">
                  Yapay Zeka Önerisi:
                </h4>
                <p className="font-serif-playfair text-sm leading-relaxed mb-4 text-[#1A1A1A] whitespace-pre-wrap">
                  {aiResultText}
                </p>
                <button
                  onClick={handleApplyAiResult}
                  className="px-4 py-2 bg-[#1A1A1A] text-white rounded-xl text-xs font-bold font-sans-inter uppercase tracking-widest hover:bg-[#D4A373] transition-colors"
                >
                  Bu Metni Yazıma Ekle
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Confirmation */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold font-sans-inter uppercase tracking-widest animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          <span>Yazınız başarıyla kaydedildi!</span>
        </div>
      )}
    </div>
  );
};
