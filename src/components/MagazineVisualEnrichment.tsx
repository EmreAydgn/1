import React from 'react';
import { Feather, BookOpen, Sparkles, CheckCircle2, MessageSquare, Info, Compass, ShieldCheck } from 'lucide-react';
import { BlogPost } from '../types';
import { getAuthorWritingPosition } from '../utils/authorUtils';
import { BirAdaLogo } from './BirAdaLogo';

// Import high-res thematic assets
import brightLondonPanorama from '../assets/images/bright_london_panorama_1786016549396.jpg';
import editorialMagazineDesk from '../assets/images/editorial_magazine_desk_1786015050264.jpg';
import londonDistantSkyline from '../assets/images/london_distant_skyline_panoramic_1786015473110.jpg';
import ukHousingRatesChart from '../assets/images/uk_housing_rates_chart_1785948928358.jpg';
import ukWindSolarEnergy from '../assets/images/uk_wind_solar_energy_1785628561512.jpg';
import ukTurkishAiStartup from '../assets/images/uk_turkish_ai_startup_1785777942810.jpg';
import londonStudentsCover from '../assets/images/london_students_analysis_1785937267430.jpg';
import londonTurkishEventsCover from '../assets/images/london_turkish_events_1785940930126.jpg';
import ukSponsorshipVisaCover from '../assets/images/uk_sponsorship_visa_1785940746279.jpg';
import ukHeatwaveCover from '../assets/images/uk_heatwave_2026_1786019783378.jpg';

interface MagazineVisualEnrichmentProps {
  post: BlogPost;
  pageType: 'article-lead' | 'article-body' | 'article-conclusion';
  articlePageIndex: number;
  totalArticlePages: number;
  contentLength: number;
  isTwoColumn?: boolean;
}

// Category-based curated visuals and pull quotes
const getCategoryEnrichmentData = (post: BlogPost, pageIndex: number) => {
  const cat = post.category;
  const title = post.title.toLowerCase();

  // 1. Health & Climate (Dr. Celal Görgülü & similar)
  if (cat === 'Sağlık' || title.includes('sıcak') || title.includes('sağlık') || title.includes('iklim')) {
    return {
      image: ukHeatwaveCover,
      imageCaption: 'NHS Sağlık Rehberi & Britanya İklim Değişimi Analizi • Ada Sağlık Masası',
      quote: '“Britanya genelinde sağlık bilincini korumak, aşırı sıcak dalgalarında serin alanlarda kalmak ve risk gruplarını gözetmek toplumsal dayanışmamızın parçasıdır.”',
      quoteAuthor: post.author.name,
      takeaways: [
        'Aşırı sıcak havalarda susuz kalmamak için günde en az 2.5–3 litre sıvı tüketimi önerilir.',
        'Güneş çarpması veya nefes darlığı durumlarında doğrudan NHS 111 hattından 7/24 ücretsiz danışmanlık alınabilir.',
        'Kronik rahatsızlığı olan yakınlarımızı ve yaşlı komşularımızı düzenli aralıklarla kontrol etmek hayati önem taşır.',
      ],
      infoboxTitle: 'Ada Sağlık Masası • Önemli İpuçları',
      infoboxIcon: 'heart',
    };
  }

  // 2. Legal, Business & Company (Av. Fetanet Darıoğlu & Resen Legal)
  if (cat === 'İş Dünyası' || title.includes('şirket') || title.includes('hukuk') || title.includes('resen')) {
    return {
      image: ukTurkishAiStartup,
      imageCaption: 'Birleşik Krallık Şirketler Dünyası & Londra Girişimcilik Ekosistemi • Resen Legal',
      quote: '“İngiltere’de şirket kurmak salt bir tescil işlemi değil; doğru vergi planlaması, şeffaf sözleşmeler ve güçlü kurumsal altyapıyla geleceği inşa etmektir.”',
      quoteAuthor: post.author.name,
      takeaways: [
        'Limited Şirket (Ltd) kuruluşunda Companies House tescili ve Articles of Association doğru kurgulanmalıdır.',
        'HMRC Kurumlar Vergisi (Corporation Tax) ve KDV (VAT) eşikleri yıllık bazda dikkatle takip edilmelidir.',
        'Yabancı ortaklı veya uzaktan yönetilen şirketlerde yerel banka hesabı ve muhasebe uyumu kritik adımdır.',
      ],
      infoboxTitle: 'Hukuk & Ticaret Köşesi • Birleşik Krallık',
      infoboxIcon: 'shield',
    };
  }

  // 3. Visa & Immigration (Av. Ahmet Hüsrev & similar)
  if (title.includes('vize') || title.includes('göç') || title.includes('sponsor') || cat === "Britanya'dan Haberler") {
    return {
      image: ukSponsorshipVisaCover,
      imageCaption: 'Home Office Vize Mevzuatı, Sponsorluk Lisansı & Çalışma İzinleri • Londra Göç Masası',
      quote: '“Sponsorluk lisansı ve çalışma vizesi süreçlerinde şeffaf dokümantasyon, adayın yetkinliği ve güncel mevzuata tam uyum başarının temel anahtarıdır.”',
      quoteAuthor: post.author.name,
      takeaways: [
        'Skilled Worker vizesinde asgari maaş eşikleri ve meslek kodları (SOC) güncel tablolardan teyit edilmelidir.',
        'Şirketlerin Sponsor Licence denetimlerinde HR kayıtlarının eksiksiz tutulması zorunludur.',
        'Sürekli Oturum (ILR) ve vatandaşlık başvurularında Birleşik Krallık’ta kalış gün sayıları titizlikle hesaplanmalıdır.',
      ],
      infoboxTitle: 'Vize & Göçmenlik Rehberi • Bir Ada',
      infoboxIcon: 'compass',
    };
  }

  // 4. Investment & Economy (Mehmet Karateke & Emre Aydoğan)
  if (cat === 'Yatırım' || cat === 'Siyaset & Aktüel' || title.includes('faiz') || title.includes('emlak') || title.includes('ekonomi')) {
    return {
      image: pageIndex % 2 === 0 ? ukHousingRatesChart : brightLondonPanorama,
      imageCaption: 'City of London Finans Merkezi, Bank of England Faiz Kararları & Gayrimenkul Trendleri',
      quote: '“Birleşik Krallık piyasalarında doğru zamanda atılan bilinçli yatırım adımları, enflasyona karşı uzun vadeli en güvenilir koruma kalkanıdır.”',
      quoteAuthor: post.author.name,
      takeaways: [
        'Mortgage faiz oranlarındaki dalgalanmalar, gayrimenkul alımında sabit/değişken faiz dengesini öne çıkarmaktadır.',
        'Bireysel Tasarruf Hesabı (ISA) yıllık vergisiz getiri avantajlarıyla yatırımcılar için temel bir araçtır.',
        'Londra dışındaki büyüme potansiyeli yüksek kentler kira getirisi (rental yield) açısından cazip fırsatlar sunmaktadır.',
      ],
      infoboxTitle: 'Ada Ekonomi & Yatırım Bülteni',
      infoboxIcon: 'sparkles',
    };
  }

  // 5. UK Events & Culture (Emre Çakmak)
  if (cat === 'UK Eventler' || cat === 'Kültür & Sanat' || title.includes('etkinlik') || title.includes('konser') || title.includes('tiyatro')) {
    return {
      image: londonTurkishEventsCover,
      imageCaption: 'Londra West End Tiyatroları, Southbank Konserleri & Türk Kültür Sanat Buluşmaları',
      quote: '“Ada’da kültür ve sanatla buluşmak; hem köklerimizle bağımızı taze tutar hem de Londra’nın çok sesli sanat sahnesinde toplumumuza güçlü bir alan açar.”',
      quoteAuthor: post.author.name,
      takeaways: [
        'Her ay Londra, Manchester ve Edinburgh’da düzenlenen konser ve tiyatrolar erken rezervasyonla takip edilmelidir.',
        'Topluluk merkezleri ve galerilerde genç sanatçılarımız için ortak sergi ve atölye imkanları sunulmaktadır.',
        'Tüm güncel etkinlik biletleri ve indirimli duyurular Bir Ada Kültür Takvimi üzerinden paylaşılmaktadır.',
      ],
      infoboxTitle: 'Londra Kültür & Etkinlik Ajandası',
      infoboxIcon: 'book',
    };
  }

  // 6. Manifesto & General Editorial (Bir Ada Yayın Kurulu)
  return {
    image: pageIndex % 2 === 0 ? editorialMagazineDesk : londonDistantSkyline,
    imageCaption: 'Bir Ada Yayın Masası • Britanya’da Yaşayan Türk Toplumunun Bağımsız Ortak Sesi',
    quote: '“Nereden geldiğimizden çok, bugün aynı gökyüzünü paylaştığımızı önemseyen; birbirine alan açan ve omuz veren bir buluşma noktasıyız.”',
    quoteAuthor: post.author.name,
    takeaways: [
      'Bir Ada Dergisi; toplumumuzun fikirlerini, girişimlerini, hukuki rehberlerini ve başarı hikâyelerini sayfalarına taşır.',
      'Yazarlarımız, uzmanlarımız ve okurlarımızın katkılarıyla her ay zenginleşen bağımsız bir kültür mecrasıdır.',
      'Görüş, öneri ve yazılarınızı editor@birada.co.uk adresinden yayın kurulumuza iletebilirsiniz.',
    ],
    infoboxTitle: 'Bir Ada Editör Masası • Notlar',
    infoboxIcon: 'sparkles',
  };
};

export const MagazineVisualEnrichment: React.FC<MagazineVisualEnrichmentProps> = ({
  post,
  pageType,
  articlePageIndex,
  totalArticlePages,
  contentLength,
  isTwoColumn = false,
}) => {
  const authorPosition = getAuthorWritingPosition(post.author.name, post.author.bio);
  const enrichment = getCategoryEnrichmentData(post, articlePageIndex);

  // Determine what type of enrichment to render based on available space and page position
  const isShortContent = contentLength < 800;
  const isModerateContent = contentLength >= 800 && contentLength < 1400;
  const isLastPage = articlePageIndex === totalArticlePages;

  return (
    <div className="mt-2 sm:mt-3 pt-2 border-t border-[#1A1A1A]/15 space-y-2.5 break-inside-avoid [column-span:all]">
      
      {/* 1. If Last Page or Short Content: Render Thematic Editorial Photo with Crisp Caption */}
      {(isShortContent || isLastPage || pageType === 'article-conclusion') && enrichment.image && (
        <div className="rounded-lg overflow-hidden border border-[#1A1A1A]/20 bg-[#FDFBF7] shadow-xs">
          <div className="relative">
            <img
              src={enrichment.image}
              alt={enrichment.imageCaption}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className="w-full h-24 sm:h-32 md:h-36 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-2 left-2 bg-[#1A1A1A]/85 text-[#FAF8F5] text-[7.5px] sm:text-[8px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-xs">
              ✦ DERGİ ARŞİVİ &amp; EDİTÖRYAL
            </div>
          </div>
          <div className="p-1.5 sm:p-2 bg-[#F7F2EA] flex items-center justify-between gap-2 border-t border-[#1A1A1A]/10">
            <p className="font-serif-cormorant italic text-[9px] sm:text-[10.5px] text-[#1A1A1A]/85 truncate">
              {enrichment.imageCaption}
            </p>
            <span className="text-[7.5px] font-sans uppercase font-bold text-[#8C6A43] shrink-0 tracking-wider">
              BİR ADA • 2026
            </span>
          </div>
        </div>
      )}

      {/* 2. Editorial Pull Quote or Key Takeaways Info Box */}
      {isShortContent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 items-stretch">
          
          {/* Highlight Pull Quote */}
          <div className="p-2.5 sm:p-3 bg-[#F4ECE1] rounded-lg border border-[#8C6A43]/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#8C6A43] mb-1">
                <Feather className="w-3.5 h-3.5" />
                <span className="text-[8px] font-sans uppercase font-bold tracking-widest">Öne Çıkan Vurgu</span>
              </div>
              <p className="font-serif-cormorant italic font-bold text-[11px] sm:text-xs text-[#1A1A1A] leading-snug">
                {enrichment.quote}
              </p>
            </div>
            <div className="mt-2 pt-1 border-t border-[#8C6A43]/20 flex items-center justify-between text-[8px] sm:text-[8.5px] font-sans text-[#1A1A1A]/70">
              <span className="font-bold text-[#1A1A1A]">{enrichment.quoteAuthor}</span>
              <span className="italic text-[#8C6A43]">Bir Ada Yazarı</span>
            </div>
          </div>

          {/* Key Takeaway Bullets */}
          <div className="p-2.5 sm:p-3 bg-[#FDFBF7] rounded-lg border border-[#1A1A1A]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#1A1A1A] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="text-[8px] font-sans uppercase font-bold tracking-wider">{enrichment.infoboxTitle}</span>
              </div>
              <ul className="space-y-1 text-[9.5px] sm:text-[10px] font-serif-newsreader text-[#1A1A1A]/85 leading-tight">
                {enrichment.takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#D4A373] font-bold text-[11px] leading-none shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-1.5 pt-1 border-t border-[#1A1A1A]/10 text-right text-[7.5px] font-sans text-[#1A1A1A]/50">
              KAYNAK: BİR ADA DİJİTAL PLATFORMU
            </div>
          </div>

        </div>
      ) : isModerateContent ? (
        /* Single elegant pull quote box */
        <div className="p-2 sm:p-2.5 bg-[#F4ECE1]/80 rounded-lg border-l-3 border-[#8C6A43] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Feather className="w-4 h-4 text-[#8C6A43] shrink-0" />
            <p className="font-serif-cormorant italic text-[10px] sm:text-xs text-[#1A1A1A]/90 truncate">
              {enrichment.quote}
            </p>
          </div>
          <span className="text-[8px] font-sans uppercase font-bold text-[#8C6A43] shrink-0">
            {post.author.name}
          </span>
        </div>
      ) : null}

      {/* 3. Community Engagement Bar on Final Page */}
      {isLastPage && (
        <div className="p-2 bg-[#1A1A1A]/[0.03] rounded-lg border border-[#1A1A1A]/10 flex items-center justify-between text-[8px] sm:text-[9px] font-sans text-[#1A1A1A]/80">
          <div className="flex items-center gap-2">
            <BirAdaLogo size="sm" showText={false} />
            <div>
              <span className="font-bold text-[#1A1A1A] block">Bir Ada Dijital Topluluk &amp; Yorumlar</span>
              <span className="text-[#8C6A43] text-[7.5px] sm:text-[8px]">Bu makale hakkında görüşlerinizi birada.co.uk üzerinden yazara iletebilirsiniz.</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-mono text-[7.5px] sm:text-[8px] font-bold text-[#1A1A1A] bg-white px-2 py-1 rounded border border-[#1A1A1A]/15 shadow-2xs">
            <span>🌐 birada.co.uk/{post.id.slice(0, 8)}</span>
          </div>
        </div>
      )}

    </div>
  );
};
