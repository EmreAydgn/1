import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BlogCard } from './BlogCard';
import { Users, BookOpen, Feather, ArrowLeft, ArrowUpRight, Sparkles, CheckCircle2, Globe, Share2, Check } from 'lucide-react';
import { BirAdaLogo } from './BirAdaLogo';
import { getAuthorInitials } from '../utils/authorUtils';
import { getAuthorShareUrl } from '../utils/urlUtils';

export interface AuthorProfile {
  name: string;
  avatar?: string;
  role: string;
  bio: string;
  location: string;
  website?: string;
}

export { getAuthorInitials };

export const AUTHORS_DATA: AuthorProfile[] = [
  {
    name: 'Bir Ada Yayın Kurulu',
    role: 'Bağımsız Yayın & Editör Kurulu',
    bio: 'Britanya\'da yaşayan Türk toplumunun ortak sesi; bağımsız kültür, yaşam, gezi ve haber platformu yayın kurulu.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Emre Aydoğan',
    role: 'Genel Yayın Yönetmeni & Dergi Kurucusu | Emlak ve Yatırım Danışmanı',
    bio: 'Bir Ada Dergisi\'nin kurucusu ve Genel Yayın Yönetmeni\'dir. Üniversitelerin İngiliz Dili ve Edebiyatı bölümünden mezun olmuştur. 2015 yılından bu yana Londra\'da ikamet etmekte ve kariyerini Birleşik Krallık Emlak ve Yatırım Danışmanlığı alanında sürdürmektedir.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Saliha Özdemir',
    role: 'Uluslararası Eğitim & Kariyer Danışmanı',
    bio: 'Londra merkezli uluslararası eğitim ve kariyer danışmanı. Birleşik Krallık üniversiteleri, yüksek lisans programları, Graduate Route (PSW) kariyer planlaması ve Londra öğrenci ekosistemi üzerine stratejik rehberlik sunmaktadır.',
    location: 'Londra & İstanbul',
  },
  {
    name: 'Fetanet Darıoğlu',
    role: 'Resen Legal Kurucusu & Kıdemli Avukat',
    bio: 'Resen Legal Kurucusu & Kıdemli Avukat (resenlegal.com). Birleşik Krallık şirketler hukuku, ticari sözleşmeler, uluslararası yükseköğrenim mevzuatı ve Londra pazarında kariyer & vize geçiş stratejileri üzerine uzman danışmanlık sunmaktadır.',
    location: 'Londra & İstanbul',
    website: 'https://resenlegal.com',
  },
  {
    name: 'Av. Ahmet Hüsrev',
    role: 'Londra Göçmenlik & Vize Avukatı | Lease Yenileme ve Uzatma Uzmanı',
    bio: 'Londra merkezli göçmenlik ve vize avukatı. Birleşik Krallık vize türleri, Skilled Worker sponsorluk lisansları, süresiz oturum (ILR), vatandaşlık başvuruları ile konut ve ticari gayrimenkullerde Lease yenileme ve uzatma (Lease Extension & Leasehold Reform) hukuku alanında uzman danışmanlık hizmeti sunmaktadır.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Dr. Aylin Yılmaz',
    role: 'Eğitim Politikaları Analisti & Yükseköğrenim Danışmanı',
    bio: 'UCL ve LSE mezunu eğitim araştırmacısı. Birleşik Krallık üniversiteleri, uluslararası öğrenci hareketliliği, burs programları ve Londra öğrenci yaşamı üzerine analizler kaleme almaktadır.',
    location: 'Bloomsbury, Londra',
  },
  {
    name: 'Fatih Bülbül',
    role: 'Dış Haberler Editörü & Uluslararası İlişkiler Analisti',
    bio: 'Küresel jeopolitik, enerji koridorları ve uluslararası ilişkiler alanlarında analizler hazırlayan dış haberler yazarı.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Emre Çakmak',
    role: 'UK Etkinlik, Kültür & Sahne Sanatları Yazarı',
    bio: 'Londra ve Birleşik Krallık genelindeki Türk konserleri, tiyatro turneleri, kültür festivalleri ve networking buluşmalarını takip eden etkinlik ve kültür yazarı.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Dr. Selin Karan',
    role: 'Tarih Araştırmacısı & Oxford Üniversitesi Akademisyeni',
    bio: 'Oxford Üniversitesi Tarih Fakültesi akademisyeni. Tudor dönemi İngiltere tarihi, Oxford şehitleri ve vicdan özgürlüğü mücadeleleri üzerine yazılar kaleme alır.',
    location: 'Oxford, Birleşik Krallık',
  },
  {
    name: 'Ece Aydın',
    role: 'Sanat Eleştirmeni & Londra Sanat Rotası Yazarı',
    bio: 'Courtauld Institute of Art mezunu sanat tarihçisi. Tate Modern, West End sahnesi ve Londra galerilerindeki çağdaş sergiler hakkında eleştirel incelemeler sunar.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Dr. Mehmet Soylu',
    role: 'NHS Onkoloji Uzmanı & Sağlık Teknolojileri Yazarı',
    bio: 'Imperial College London ve NHS bünyesinde görev yapan tıp doktoru. Kanser immünoterapisi, kişiselleştirilmiş mRNA aşıları ve koruyucu sağlık üzerine makaleler yayımlamaktadır.',
    location: 'Londra / Cambridge',
  },
  {
    name: 'Dr. Celal Görgülü',
    role: 'Adli Tıp Uzmanı Hekim & Britanya Gündemi Analisti',
    bio: 'Aslen Adli Tıp Uzmanı Tıp Doktoru (Forensic Medicine Specialist / MD). Yıllara dayanan adli tıp ve klinik tecrübesinin yanı sıra Britanya gündemini, ada iklimini, halk sağlığı dinamiklerini ve toplum sağlığı risklerini yakından takip eden araştırmacı yazar.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Mehmet Karateke',
    role: 'Kamu Görevlisi & Siyaset ve Ekonomi Analisti | Eski Eğitimci',
    bio: 'Üniversitelerin İngilizce bölümünden mezun olup Türkçe, İngilizce, Arnavutça ve İtalyancayı çok iyi derecede konuşabilmektedir. Yıllarca eğitimcilik yapmış olup şu anda Birleşik Krallık\'ta memur olarak çalışmakta ve İngiltere siyasetini ve ekonomi politikalarını yakından takip etmektedir.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Murat Yazıcı',
    role: 'Finans Analisti & Gayrimenkul Yatırım Danışmanı',
    bio: 'LSE Ekonomi mezunu finans analisti. Birleşik Krallık\'ta varlık yönetimi, ISA fonları, sterlin bazlı yatırımlar ve Londra gayrimenkul piyasası rehberleri hazırlar.',
    location: 'Londra, Birleşik Krallık',
  },
  {
    name: 'Merve Karan',
    role: 'Seyahat Yazarı & Fotoğrafçı',
    bio: 'Britanya\'nın saklı gezi rotalarını keşfeden seyahat yazarı. Cotswolds, İskoçya Yaylaları, Galler sahilleri ve Londra sokak rehberlerinin mimarı.',
    location: 'Edinburgh & Londra',
  },
];

interface AuthorsViewProps {
  posts: BlogPost[];
  selectedAuthorName: string | null;
  onSelectAuthorName: (name: string | null) => void;
  onSelectPost: (post: BlogPost) => void;
  onToggleBookmark: (postId: string, e: React.MouseEvent) => void;
  bookmarkedIds: string[];
  onNavigateHome: () => void;
  onOpenSubmitArticle: () => void;
}

export const AuthorsView: React.FC<AuthorsViewProps> = ({
  posts,
  selectedAuthorName,
  onSelectAuthorName,
  onSelectPost,
  onToggleBookmark,
  bookmarkedIds,
  onNavigateHome,
  onOpenSubmitArticle,
}) => {
  const [authorCopied, setAuthorCopied] = useState<boolean>(false);
  const activeAuthor = AUTHORS_DATA.find((a) => a.name === selectedAuthorName) || null;

  // Filter posts if an author is selected
  const authorPosts = selectedAuthorName
    ? posts.filter((p) => p.author.name.toLowerCase() === selectedAuthorName.toLowerCase())
    : [];

  const handleShareAuthor = async () => {
    if (!activeAuthor) return;
    const authorUrl = getAuthorShareUrl(activeAuthor.name);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${activeAuthor.name} - Bir Ada Dergi`,
          text: `${activeAuthor.name} yazar profili ve makaleleri - Bir Ada`,
          url: authorUrl,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(authorUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = authorUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setAuthorCopied(true);
      setTimeout(() => setAuthorCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy author share link:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      
      {/* Top Breadcrumb & Return to Home */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1A1A1A]/10">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-bold font-sans-inter text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4A373]" />
          <span>Anasayfaya Dön</span>
        </button>

        {selectedAuthorName && (
          <button
            onClick={() => onSelectAuthorName(null)}
            className="text-xs font-bold font-sans-inter text-[#C8102E] hover:underline"
          >
            Tüm Yazarları Göster
          </button>
        )}
      </div>

      {/* Main Author Header Hero */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#1A1A1A]/10 shadow-xs mb-12 relative overflow-hidden text-center sm:text-left">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A373]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#1A1A1A] p-2 flex items-center justify-center shrink-0 shadow-md border border-[#D4A373]/30">
            <BirAdaLogo size="lg" showText={false} />
          </div>

          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE8E0] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#1A1A1A]/10">
              <Users className="w-3.5 h-3.5 text-[#D4A373]" /> YAZARLARIMIZ &amp; KATKIDA BULUNANLAR
            </span>

            <h1 className="font-serif-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight mb-3">
              {selectedAuthorName ? `${selectedAuthorName} Kaleminden` : 'Bir Ada Yazarları'}
            </h1>

            <p className="font-serif-playfair italic text-base sm:text-lg text-[#1A1A1A]/70 leading-relaxed max-w-3xl">
              {activeAuthor
                ? activeAuthor.bio
                : 'Britanya\'nın dört bir yanından akademisyenler, sanat eleştirmenleri, tıp uzmanları, seyahat yazarları ve toplum liderleri Bir Ada çatısı altında buluşuyor.'}
            </p>
          </div>

          <div className="shrink-0 pt-2">
            <button
              onClick={onOpenSubmitArticle}
              className="px-5 py-3 bg-[#1A1A1A] hover:bg-[#C8102E] text-white rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              <Feather className="w-4 h-4 text-[#D4A373]" />
              <span>Siz de Yazı Gönderin</span>
            </button>
          </div>
        </div>
      </div>

      {/* SINGLE AUTHOR FILTERED VIEW */}
      {selectedAuthorName && activeAuthor ? (
        <div className="space-y-10">
          {/* Author Profile Banner */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-2xl sm:text-3xl flex items-center justify-center border-4 border-white shadow-md shrink-0">
              {getAuthorInitials(activeAuthor.name)}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">{activeAuthor.name}</h2>
                <CheckCircle2 className="w-5 h-5 text-[#D4A373] fill-current" />
              </div>
              <p className="text-xs font-bold font-sans-inter uppercase tracking-wider text-[#C8102E] mb-2">
                {activeAuthor.role}
              </p>
              <p className="text-xs font-sans-inter text-[#1A1A1A]/80 leading-relaxed mb-3 max-w-2xl">
                {activeAuthor.bio}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-block text-[10px] font-sans-inter text-[#1A1A1A]/60 bg-white px-3 py-1 rounded-full border border-[#1A1A1A]/10">
                  📍 {activeAuthor.location} • {authorPosts.length} Yayınlanmış Makale
                </span>
                {activeAuthor.website && (
                  <a
                    href={activeAuthor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold font-sans-inter text-[#1A1A1A] bg-[#EBE8E0] hover:bg-[#1A1A1A] hover:text-white px-3 py-1 rounded-full border border-[#1A1A1A]/15 transition-all shadow-2xs"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>resenlegal.com</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                )}
                <button
                  onClick={handleShareAuthor}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-bold font-sans-inter px-3 py-1 rounded-full border transition-all shadow-2xs ${
                    authorCopied
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white text-[#1A1A1A] hover:bg-[#D4A373] hover:text-white border-[#1A1A1A]/15'
                  }`}
                  title="Yazar profil bağlantısını kopyala / paylaş"
                >
                  {authorCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{authorCopied ? 'Profil Linki Kopyalandı!' : 'Profili Paylaş'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Author Articles Grid */}
          <div>
            <h3 className="font-serif-playfair text-2xl font-bold text-[#1A1A1A] mb-6">
              Yazarın Makaleleri ({authorPosts.length})
            </h3>

            {authorPosts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#1A1A1A]/10 p-6">
                <p className="text-xs text-[#1A1A1A]/60">Bu yazarımıza ait yayında olan makale bulunamadı.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {authorPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onSelectPost={onSelectPost}
                    onToggleBookmark={onToggleBookmark}
                    isBookmarked={bookmarkedIds.includes(post.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ALL AUTHORS GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUTHORS_DATA.map((author) => {
            const authorPostCount = posts.filter(
              (p) => p.author.name.toLowerCase() === author.name.toLowerCase()
            ).length;

            return (
              <div
                key={author.name}
                onClick={() => onSelectAuthorName(author.name)}
                className="group cursor-pointer bg-white rounded-3xl p-6 border border-[#1A1A1A]/10 shadow-xs hover:shadow-xl hover:border-[#D4A373] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative mb-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#FAF6EE] text-[#0F2C59] font-bold font-serif-playfair text-xl flex items-center justify-center mx-auto border-2 border-[#1A1A1A]/10 group-hover:border-[#D4A373] transition-colors shadow-xs shrink-0">
                      {getAuthorInitials(author.name)}
                    </div>
                    <span className="absolute bottom-0 right-1/2 translate-x-8 translate-y-1 bg-[#1A1A1A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white">
                      {authorPostCount} Yazı
                    </span>
                  </div>

                  <h3 className="font-serif-playfair text-xl font-bold text-[#1A1A1A] text-center group-hover:text-[#C8102E] transition-colors leading-tight mb-1">
                    {author.name}
                  </h3>

                  <p className="text-[10px] font-sans-inter font-bold uppercase tracking-wider text-[#D4A373] text-center mb-3 line-clamp-1">
                    {author.role}
                  </p>

                  <p className="text-xs font-sans-inter text-[#1A1A1A]/70 leading-relaxed text-center line-clamp-3 mb-3">
                    {author.bio}
                  </p>

                  {author.website && (
                    <div className="text-center mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1A1A1A] bg-[#EBE8E0] px-2.5 py-0.5 rounded-full border border-[#1A1A1A]/10">
                        <Globe className="w-3 h-3 text-[#D4A373]" /> resenlegal.com
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-sans-inter font-bold text-[#1A1A1A]/80 group-hover:text-[#1A1A1A]">
                  <span className="text-[10px] text-[#1A1A1A]/50 font-normal">📍 {author.location}</span>
                  <span className="inline-flex items-center gap-1 text-[#C8102E] text-[11px] group-hover:underline">
                    Yazıları Gör <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
