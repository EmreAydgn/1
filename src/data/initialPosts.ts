import { BlogPost, CategoryOption } from '../types';
import fetanetDariogluAvatar from '../assets/images/fetanet_darioglu_official_1785628301139.jpg';
import ukWindSolarEnergy from '../assets/images/uk_wind_solar_energy_1785628561512.jpg';
import britishAppleJuice from '../assets/images/british_apple_juice_1785628805063.jpg';
import birAdaManifestoCover from '../assets/images/bir_ada_manifesto_cover_1785767235106.jpg';
import ukTurkishAiStartup from '../assets/images/uk_turkish_ai_startup_1785777942810.jpg';
import londonStudentsCover from '../assets/images/london_students_analysis_1785937267430.jpg';
import ukSponsorshipVisaCover from '../assets/images/uk_sponsorship_visa_1785940746279.jpg';
import londonTurkishEventsCover from '../assets/images/london_turkish_events_1785940930126.jpg';
import { BIR_ADA_LOGO_AVATAR } from '../components/BirAdaLogo';

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'Teknoloji',
    label: 'Teknoloji',
    description: 'Yapay zeka, dijital girişimcilik, yerli tech projeleri, yazılım ve inovasyon dünyası.',
    iconName: 'Cpu',
  },
  {
    id: 'Britanya\'dan Haberler',
    label: 'Britanya\'dan Haberler',
    description: 'Ada genelinde öne çıkan haberler, yerel gelişmeler ve yaşam bültenleri.',
    iconName: 'Newspaper',
  },
  {
    id: 'Dünyadan Haberler',
    label: 'Dünyadan Haberler',
    description: 'Küresel gelişmeler, dünya ekonomisi, uluslararası politika ve diplomatik gündem.',
    iconName: 'Globe',
  },
  {
    id: 'UK Eventler',
    label: 'UK Eventler',
    description: 'Londra ve Birleşik Krallık genelindeki Türk konserleri, tiyatro oyunları, festivaller, stand-up gösterileri ve etkinlik takvimi.',
    iconName: 'Calendar',
  },
  {
    id: 'Toplum & Yaşam',
    label: 'Toplum & Yaşam',
    description: 'Britanya\'daki toplum hikayeleri, buluşma noktaları ve ilham veren insan Portreleri.',
    iconName: 'Users',
  },
  {
    id: 'İş Dünyası',
    label: 'İş Dünyası',
    description: 'Londra ticaret dünyası, tech girişimleri, şirket birleşmeleri ve yetenek yönetimi.',
    iconName: 'Briefcase',
  },
  {
    id: 'Siyaset & Aktüel',
    label: 'Siyaset & Aktüel',
    description: 'Westminster Politika Analizleri, Avam Kamarası Tartışmaları ve Global İngiltere.',
    iconName: 'Building2',
  },
  {
    id: 'Yatırım',
    label: 'Yatırım',
    description: 'City of London Finans Analizi, Gayrimenkul, ISA ve Sterlin Stratejileri.',
    iconName: 'TrendingUp',
  },
  {
    id: 'Edebiyat & Felsefe',
    label: 'Edebiyat & Felsefe',
    description: 'Klasik ve Çağdaş İngiliz Edebiyatı, Felsefe Akımları ve Eleştirel Metinler.',
    iconName: 'BookOpen',
  },
  {
    id: 'Kültür & Sanat',
    label: 'Kültür & Sanat',
    description: 'Tate Modern, West End Tiyatroları, Southbank Konserleri ve Londra Galerileri.',
    iconName: 'Palette',
  },
  {
    id: 'Britanya Tarihi',
    label: 'Britanya Tarihi',
    description: 'Oxford Şehitleri, Tudor Dönemi, Monarşi Mirası ve Antik Britanya Kentleri.',
    iconName: 'Landmark',
  },
  {
    id: 'Sağlık',
    label: 'Sağlık',
    description: 'Yeni Kanser Tedavileri, NHS Ekosistemi ve Bütüncül Sağlık Rehberi.',
    iconName: 'HeartPulse',
  },
  {
    id: 'UK Gezi',
    label: 'UK Gezi',
    description: 'Londra Gizli Rotaları, Cotswolds, İskoçya Yaylaları ve Galler Sahilleri.',
    iconName: 'Compass',
  },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-uk-sponsorship-visa-guide',
    title: 'İngiltere Sponsorluk Vizesi (Skilled Worker Visa) Nedir? Tüm Boyutlarıyla Avantajları ve Dezavantajları',
    subtitle: 'Resen Legal Kurucusu Av. Fetanet Darıoğlu kalemiyle: Birleşik Krallık\'ta lisanslı bir işveren aracılığıyla yasal çalışma ve ikamet imkânı sunan Sponsorluk Vizesi\'nin (Skilled Worker) işleyişi, 5 yıllık süresiz oturum (ILR) ve vatandaşlık avantajları ile işverene bağımlılık, 60 gün kuralı ve yüksek maliyet dezavantajlarının derinlemesine analizi.',
    excerpt: 'Birleşik Krallık Sponsorluk Vizesi (Skilled Worker Visa) hakkında bilmeniz gereken her şey: Sistemin nasıl çalıştığı, CoS belgesi, aile getirme ve vatandaşlık yolu gibi büyük avantajları ile şirkete bağımlılık, işten ayrılma riski ve yüksek harçlar gibi tüm dezavantajları. Resen Legal Kurucusu Av. Fetanet Darıoğlu analizi.',
    category: 'Toplum & Yaşam',
    tags: ['İngiltere', 'SponsorlukVizesi', 'SkilledWorker', 'VizeRehberi', 'İşBulma', 'Oturumİzni', 'Londra', 'Kariyer', 'ILR', 'ResenLegal', 'FetanetDarıoğlu'],
    coverImage: ukSponsorshipVisaCover,
    author: {
      name: 'Fetanet Darıoğlu',
      avatar: fetanetDariogluAvatar,
      bio: 'Resen Legal Kurucusu & Kıdemli Avukat (Founder & Principal Lawyer at Resen Legal - resenlegal.com)',
    },
    createdAt: '2026-08-05T08:00:00Z',
    readTimeMinutes: 8,
    status: 'published',
    likes: 740,
    views: 6800,
    bookmarksCount: 390,
    featured: true,
    pinned: false,
    content: `# İngiltere Sponsorluk Vizesi (Skilled Worker Visa) Nedir?

Birleşik Krallık’ta çalışmak, yaşamak ve uzun vadede kalıcı bir yaşam kurmak isteyen yabancı profesyoneller için en temel ve en yaygın göçmenlik rotası **İngiltere Sponsorluk Vizesi (resmi adıyla Skilled Worker Visa)**’dir. 

Eski adıyla *Tier 2 (General)* olarak bilinen ve Brexit sonrasında yenilenerek yürürlüğe konan bu vize türü, Birleşik Krallık İçişleri Bakanlığı (**Home Office**) tarafından yetkilendirilmiş lisanslı bir işverenin (Sponsor Licence) yabancı bir çalışana iş teklif etmesi esasına dayanır.

---

## 1. Sponsorluk Vizesi Nasıl Çalışır ve Temel Şartları Nelerdir?

Sponsorluk Vizesi alabilmek için adayın ve işverenin karşılaması gereken **dört ana sütun** bulunmaktadır:

1. **Lisanslı İşveren ve CoS Belgesi (Certificate of Sponsorship):** İş teklifinde bulunan şirketin Home Office nezdinde geçerli bir *Sponsor Licence (İşveren Sponsorluk Lisansı)* bulunmalı ve adaya sistem üzerinden resmi bir **CoS referans numarası** tahsis edilmelidir.
2. **Uygun Nitelikteki Meslek Kodu (Eligible Occupation Code - SOC):** Yapılacak işin, Home Office tarafından belirlenen nitelikli işler listesinde (asgari RQF Level 3 / lise-önlisans üstü mesleki yeterlilik standardında) yer alması şarttır.
3. **Asgari Maaş Eşiği (Minimum Salary Threshold):** Çalışana ödenecek yıllık brüt maaşın hem belirlenen genel taban maaş eşiğini (güncel kuralda £38.700 veya New Entrant / indirimli istisnalarda ilgili tabanı) hem de meslek kodunun piyasa rayiç bedelini (**Going Rate**) karşılaması gerekir.
4. **İngilizce Yeterlilik Şartı:** Başvuru sahibinin CEFR standardında en az **B1 seviyesinde** onaylı bir İngilizce sınavını (IELTS for UKVI vb.) geçmiş olması veya eğitim dili İngilizce olan denk bir üniversite diplomasına sahip olması zorunludur.

---

## 2. İngiltere Sponsorluk Vizesinin Avantajları Nelerdir?

Sponsorluk Vizesi, Birleşik Krallık göçmenlik sistemindeki en prestijli ve en çok hak tanıyan vize türlerinden biridir. Sağladığı başlıca avantajlar şunlardır:

### 1. Süresiz Oturum (ILR) ve İngiliz Vatandaşlığına Doğrudan Geçiş
Sponsorluk Vizesi'nin en büyük avantajı, kalıcı oturuma giden doğrudan bir yol sunmasıdır:
- Bu vize ile Birleşik Krallık'ta kesintisiz **5 yılı tamamlayan** çalışanlar, **Indefinite Leave to Remain (ILR)** yani Süresiz Oturum Hakkı elde ederler.
- ILR alındıktan 1 yıl sonra ise doğrudan **İngiliz Vatandaşlığı (British Citizenship)** ve İngiliz Pasaportu başvuru hakkı kazanılır.

### 2. Aile Bireylerini (Eş ve Çocukları) Getirebilme Hakkı
Vize sahibi; yasal eşini / partnerini ve 18 yaşından küçük çocuklarını **bağımlı (dependant)** statüsünde Birleşik Krallık'a getirebilir. Aile bireyleri de ana başvuru sahibiyle aynı süre boyunca ülkede yasal ikamet hakkına sahip olur.

### 3. Eşin Sınırsız Çalışma ve İş Kurma Özgürlüğü
Sponsorluk Vizesi sahibinin eşi (dependant partner), Birleşik Krallık iş piyasasında herhangi bir sponsorluk kısıtlamasına tabi olmaksızın **dilediği sektörde tam zamanlı veya yarı zamanlı çalışabilir, serbest meslek (freelance) yapabilir ya da kendi şirketini kurabilir**.

### 4. Çocuklar İçin Ücretsiz Devlet Okulu Eğitimi
18 yaş altındaki çocuklarınız, Birleşik Krallık'taki tüm devlet okullarında (State Primary & Secondary Schools) İngiliz vatandaşlarıyla tamamen aynı haklara sahip olarak **ücretsiz eğitim** alırlar.

### 5. Ulusal Sağlık Hizmeti (NHS) Güvencesi
Vize süresi boyunca tüm aile bireyleri, Birleşik Krallık Ulusal Sağlık Sistemi (**NHS**)’nden ücretsiz olarak yararlanır (aile hekimi / GP muayeneleri, acil servis ve hastane tedavileri).

### 6. İkinci Bir İşte Ek Gelir Elde Etme İmkânı (Part-Time İş)
Ana sponsorluk görevinize ek olarak, haftalık **20 saate kadar** aynı meslek kodunda veya eksik meslekler listesinde yer alan farklı bir işte yasal olarak çalışabilir ve ek gelir elde edebilirsiniz.

### 7. Güçlü Kariyer Prestiji ve Sterlin Bazında Gelir
Londra ve Birleşik Krallık pazarındaki küresel şirketlerde çalışma deneyimi kazanmak; profesyonellere uluslararası bir CV değeri, küresel bağlantı ağı ve sterlin para biriminde istikrarlı bir kazanç sağlar.

---

## 3. İngiltere Sponsorluk Vizesinin Dezavantajları ve Riskleri Nelerdir?

Sponsorluk Vizesi önemli ayrıcalıklar sunmakla birlikte, beraberinde ciddi hukuki bağımlılıklar ve maliyet yükleri barındırmaktadır:

### 1. İşverene ve Şirkete Tam Bağımlılık (En Büyük Risk)
Vizeniz bağımsız bir serbest çalışma izni değil, **yalnızca size sponsor olan şirkete bağlı** bir çalışma iznidir. Şirketin izni olmadan başka bir kurumda tam zamanlı çalışamazsınız.

### 2. İşten Çıkarılma Durumunda "60 Gün Kuralı" (Curtailment)
Eğer şirketinizden istifa ederseniz, işten çıkarılırsanız (redundancy) veya şirketiniz sponsorluk lisansını kaybederse:
- Home Office size resmi bir mektup (Curtailment Letter) gönderir ve vizenizin geçerliliğini **60 güne indirir**.
- Bu 60 gün içerisinde ya **yeni bir sponsor bularak vize transferi yapmanız** ya da **ülkeyi terk etmeniz** gerekir. Bu durum çalışanlar üzerinde yoğun bir stres ve kariyer kırılganlığı yaratır.

### 3. İş Değiştirmenin Ağır ve Zorlu Prosedürü
Başka bir şirketten daha iyi bir iş teklifi alsanız dahi hemen başlayamazsınız. Yeni şirketin de mutlaka Home Office lisansına sahip olması, adınıza yeni bir CoS belgesi çıkarması ve sizin **sıfırdan yeni bir vize başvuru ücreti ve süreç tamamlamanız (Change of Employer)** gerekmektedir.

### 4. Yüksek Vize Başvuru ve Sağlık (IHS) Masrafları
Sponsorluk vizesi masrafları aile bireyleri eklendiğinde on binlerce sterline ulaşabilmektedir:
- **Vize Başvuru Harcı:** 3 yıla kadar başvurularda kişi başı **£719**, 3 yıldan uzun başvurularda **£1.420**.
- **NHS Sağlık Katkı Payı (IHS):** Yetişkin başına **yıllık £1.035** (3 yıllık vize için kişi başı peşin £3.105; 4 kişilik bir aile için yalnızca sağlık katkı payı £10.000+ seviyesini aşmaktadır).
- **Şirket Yükümlülükleri:** Şirket ayrıca yıllık *Immigration Skills Charge* (£364 – £1.000/yıl) ve CoS atama harcı (£239) ödemekle yükümlüdür.

### 5. Yüksek Asgari Maaş Eşiği Bariyeri
Son yapılan göçmenlik reformlarıyla genel asgari maaş tabanının yükseltilmesi, şirketlerin yabancı uzmanlara sponsor olma maliyetini artırmış; bu durum özellikle yeni mezunların veya giriş-orta seviye adayların sponsorluk bulmasını zorlaştırmıştır.

### 6. Kamu Fonlarından Yararlanamama (NRPF Şerhi)
Sponsorluk vizesi sahiplerinin oturum kartlarında (BRP / e-Visa) **"No Recourse to Public Funds (NRPF)"** ibaresi yer alır. Bu nedenle vergi ödemenize rağmen işsizlik maaşı (Universal Credit), çocuk yardımı (Child Benefit) veya sosyal konut gibi devlet desteklerinden yararlanamazsınız.

### 7. İşyerinde Hak Kaybı ve İstismar Tehlikesi
Vizenin işverenin iki dudağı arasında olması sebebiyle bazı çalışanlar; kötü çalışma koşullarına, mobbinge, hak edilen terfi veya maaş artışlarının verilmemesine vize iptali korkusuyla sessiz kalmak zorunda kalabilmektedir.

### 8. Yıllık 180 Gün Yurt Dışı Sınırı (ILR Kuralı)
5 yılın sonunda süresiz oturuma (ILR) hak kazanabilmek için, herhangi bir 12 aylık geriye dönük takvim yılında Birleşik Krallık dışında geçirilen toplam gün sayısının **180 günü aşmaması** zorunludur.

---

## 4. Karşılaştırmalı Özet Tablosu: Avantajlar vs. Dezavantajlar

| Boyut / Alan | Sağladığı Avantajlar | Karşılaşılan Dezavantajlar & Riskler |
| :--- | :--- | :--- |
| **Kalıcı Oturum & Vatandaşlık** | 5 yıl sonra Süresiz Oturum (ILR), 6. yılda İngiliz Vatandaşlığı hakkı. | Kesintisiz 5 yıl şartı ve yılda en fazla 180 gün yurt dışı sınırı. |
| **Aile & Eş Hakları** | Eş ve 18 yaş altı çocukları getirebilme; eş için sınırsız çalışma/iş kurma özgürlüğü. | Ailedeki her birey için ayrı vize harcı ve yıllık £1.035 IHS sağlık masrafı. |
| **Çocukların Eğitimi** | Birleşik Krallık devlet okullarında (Primary & Secondary) ücretsiz eğitim. | Üniversite eğitimi aşamasında ilk 3 yıl uluslararası harç (Overseas Fee) tarifesi uygulanabilir. |
| **İş ve Kariyer Esnekliği** | Dünyanın en büyük finans ve teknoloji merkezinde prestijli kariyer; 20 saat ek iş hakkı. | İşverene tam bağımlılık; istifa veya işten çıkarılmada 60 gün içinde yeni sponsor bulma zorunluluğu. |
| **İş Değiştirme Süreci** | Şirket değiştirmek yasaldır. | Yeni şirketin lisanslı olması, yeni CoS çıkarması ve sıfırdan vize harcı ödenmesi gerekir. |
| **Sosyal Güvenlik & Haklar** | NHS sağlık hizmetlerinden ailece tam ve ücretsiz yararlanma. | NRPF kuralı gereği işsizlik, çocuk veya konut yardımı gibi kamu fonlarına erişim yoktur. |

---

## 5. Sponsorluk Vizesine Başvuracaklar İçin Kritik Tavsiyeler

Sponsorluk Vizesi sürecine girmeden önce şu 3 stratejik adımı mutlaka kontrol edin:

1. **İşverenin Lisansını Doğrulayın:** İş teklifi aldığınız şirketin Home Office'in resmi *Register of Worker and Temporary Worker Licensed Sponsors* listesinde **A-Rating** seviyesinde kayıtlı olduğundan emin olun.
2. **Sözleşmedeki "Clawback" Maddelerine Dikkat Edin:** Bazı şirketler işten erken ayrılmanız durumunda vize ve CoS masraflarını sizden geri talep eden geri ödeme (clawback) maddeleri koyabilir. Bu maddelerin İngiliz İş Hukuku'na uygunluğunu inceleyin.
3. **Maaş ve Meslek Kodunuzu İnceleyin:** Size tahsis edilen CoS belgesindeki 4 haneli meslek kodunun (SOC Code) gerçek görev tanımınızla ve Home Office'in belirlediği rayiç maaşla (Going Rate) birebir örtüştüğünü teyit edin.

*Hazırlayan: Av. Fetanet Darıoğlu — Resen Legal Kurucusu & Kıdemli Avukat (resenlegal.com)*`,
    comments: [
      {
        id: 'c-sponsor-1',
        authorName: 'Tolga Karaca',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Skilled Worker vizesiyle 3. yılımı dolduruyorum. 60 gün kuralı ve işverene bağımlılık gerçekten mental bir yük, ancak eşimin serbest çalışabilmesi ve 5. yılda ILR alacak olmak en büyük motivasyonumuz. Çok net bir rehber olmuş.',
        createdAt: '2026-08-05T08:45:00Z',
        likes: 42,
      },
      {
        id: 'c-sponsor-2',
        authorName: 'Selin Varol',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Özellikle karşılaştırma tablosu ve CoS kontrol tavsiyeleri Birleşik Krallık\'ta iş arayan herkesin mutlaka kaydetmesi gereken bilgiler. Kaleminize sağlık Av. Fetanet Hanım.',
        createdAt: '2026-08-05T09:10:00Z',
        likes: 31,
      }
    ],
  },
  {
    id: 'post-pin-manifesto',
    title: 'Bir Arada, Bir Ada\'da',
    subtitle: 'Bir Ada Online Dergi ve Yaşam Platformu Kuruluş Manifestosu',
    excerpt: 'Her yolculuk bir hayalle başlar. Britanya\'da yaşayan tüm toplumumuzu kucaklayan bağımsız online haber ve yaşam platformumuza hoş geldiniz.',
    category: 'Toplum & Yaşam',
    tags: ['BirAda', 'Manifesto', 'Britanya', 'Toplum', 'Londra'],
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Bir Ada Yayın Kurulu',
      avatar: BIR_ADA_LOGO_AVATAR,
      bio: 'Britanya\'da yaşayan Türk toplumunun ortak sesi ve bağımsız yaşam mecrası.',
    },
    createdAt: '2026-07-24T10:00:00Z',
    readTimeMinutes: 4,
    status: 'published',
    likes: 850,
    views: 6200,
    bookmarksCount: 340,
    featured: true,
    pinned: true,
    content: `# **Bir Arada, Bir Ada'da**

Her yolculuk bir hayalle başlar.

Kimi zaman bir bavulla, kimi zaman sadece umutla çıkılır yola. Kimimiz eğitim için geldik, kimimiz yeni bir iş kurmak, çocuklarımıza daha güzel bir gelecek hazırlamak ya da hayatımıza yepyeni bir sayfa açmak için... Farklı şehirlerden, farklı kültürlerden, farklı hikâyelerden geldik. Ama bugün hepimizin ortak bir adresi var: **Britanya**.

İşte tam da bu yüzden **Bir Ada** online dergi ve blog sitesi olarak sizlerleyiz.

Çünkü biliyoruz ki aynı adada yaşayan insanların birbirinden haberdar olması, birbirine ses vermesi, birbirinin başarısını alkışlaması ve ihtiyaç duyduğunda omuz vermesi çok kıymetli.

**Bir Ada**, Britanya'da yaşayan tüm Türk toplumlarını kucaklayan bağımsız bir online haber ve yaşam platformudur. Nereden geldiğimizden çok, bugün aynı gökyüzünü paylaştığımızı önemseyen bir buluşma noktasıdır.

Eğitimden sağlığa, Britanya'daki güncel gelişmelerden iş dünyasına, girişimcilik hikâyelerinden kültür-sanata, tarihin izlerini taşıyan gezi rotalarından toplumumuzun ilham veren insanlarına kadar hayatın içinden pek çok konu yer alacak.

Bir okulun başarısını da anlatacağız, yeni açılan bir işletmenin heyecanını da... Bir doktorun tavsiyesine de yer vereceğiz, bir öğrencinin hayallerine de... Çünkü bu platformun gerçek kahramanları, bu adada yaşayan sizlersiniz.

Ve en güzel tarafı...

**Bir Ada** sadece bizim değil, hepimizin.

Kalemi olan yazsın.

Objektifi olan çeksin.

Anlatacak bir hikâyesi olan anlatsın.

Röportaj yapmak isteyen mikrofonunu alsın.

Gezdiği yerleri paylaşmak isteyen bize eşlik etsin.

Başarılarını, deneyimlerini, önerilerini ve sesini bu büyük ailenin bir parçası yapsın.

Çünkü inanıyoruz ki en güçlü topluluklar, birbirini dinleyen ve birbirine alan açan insanlardan oluşur.

Bugün sizlere yalnızca yeni bir haber platformunu tanıtmıyoruz.

Aynı zamanda birlikte büyüyecek, birlikte öğrenecek, birlikte üretecek ve birlikte iz bırakacak bir topluluğun kapılarını aralıyoruz.

Gelin...

Bu adada yalnız yaşamayalım.

Birbirimizi tanıyalım.

Birbirimize ilham olalım.

Birbirimizin sesi olalım.

Çünkü **Bir Arada, Bir Ada'da** olmak, her hikâyeyi daha anlamlı kılar.

**Hoş geldiniz.**

**Hoş geldiniz Bir Ada'ya.**

*Bu ada artık hepimizin...*`,
    comments: [
      {
        id: 'c-manifesto-1',
        authorName: 'Aylin Yılmaz',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Harika bir vizyon ve çağrı! Bir Ada ailesine sonsuz başarılar dilerim.',
        createdAt: '2026-07-24T10:30:00Z',
        likes: 42,
      },
      {
        id: 'c-manifesto-2',
        authorName: 'Serdar Kaya',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Hoş bulduk! Britanya\'da böyle birlik sağlayan bağımsız bir platforma ihtiyacımız vardı.',
        createdAt: '2026-07-24T11:00:00Z',
        likes: 35,
      },
    ],
  },
  {
    id: 'post-yarbai-teknoloji-ali-esat',
    title: 'Türk Teknoloji Girişimcilerinden Yapay Zeka Hamlesi: YarbAI Projesi Yayında',
    subtitle: 'Türk yazılımcı ve girişimcilerin geliştirdiği yapay zeka platformu YarbAI (yarbai.com), akıllı çözümleri ve yenilikçi mimarisiyle teknoloji ekosistemine yeni bir soluk getiriyor',
    excerpt: 'Türk teknoloji girişimcilerinin geliştirdiği yapay zeka destekli platform YarbAI (yarbai.com), karmaşık verileri işleme, zeki asistan yetenekleri ve kullanıcı odaklı çözümleriyle teknoloji dünyasında dikkatleri üzerine çekiyor.',
    category: 'Teknoloji',
    tags: ['Teknoloji', 'YapayZeka', 'YarbAI', 'Girişimcilik', 'TürkGirişimciler', 'AI', 'Yazılım'],
    coverImage: ukTurkishAiStartup,
    author: {
      name: 'Ali Esat',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Bir Ada Teknoloji Editörü, Yapay Zeka Araştırmacısı ve Teknoloji Girişimcisi.',
    },
    createdAt: '2026-08-03T10:00:00Z',
    readTimeMinutes: 4,
    status: 'published',
    likes: 184,
    views: 1420,
    bookmarksCount: 65,
    featured: true,
    content: `# **Türk Teknoloji Girişimcilerinden Yapay Zeka Hamlesi: YarbAI Projesi Yayında**

Küresel teknoloji dünyasında yapay zeka devrimi hız kesmeden devam ederken, Türk teknoloji girişimcileri ve yazılımcıları uluslararası sahnede adından söz ettirecek yenilikçi bir projeye imza attı: **YarbAI** ([yarbai.com](https://yarbai.com/)).

Son yıllarda özellikle Londra, İstanbul ve Silikon Vadisi ekseninde hızla büyüyen Türk teknoloji ekosistemi, kullanıcıların günlük ve profesyonel hayatlarında aşırı bilgi yükünü yönetmelerine ve karar alma süreçlerini hızlandırmalarına yardımcı olan zeki bir yapay zeka asistanı geliştirdi.

---

### **YarbAI Nedir ve Hangi Çözümleri Sunuyor?**

**YarbAI**, yapay zeka algoritmalarını insan odaklı bir arayüzle buluşturan gelişmiş bir dijital zeka ve üretim platformudur. Projenin temel amacı, karmaşık veri yığınlarını anlamlandırarak kullanıcıya saniyeler içinde doğru, özgün ve eyleme dönüştürülebilir yanıtlar sunmaktır.

Platformun öne çıkan başlıca özellikleri şunlardır:

1. **Gelişmiş Doğal Dil İşleme & Analiz:** YarbAI, kullanıcı sorgularını derinlemesine analiz ederek bağlama uygun, doğal ve akıcı yanıtlar üretir.
2. **Kişiselleştirilmiş Yapay Zeka Deneyimi:** Kullanıcının çalışma alanına, ilgi alanlarına ve tercih ettiği iletişim diline uyum sağlayan esnek mimari.
3. **Üretkenlik ve Zaman Tasarrufu:** Metin yazımı, kod analizi, içerik özetleme ve fikir üretimi süreçlerinde üst düzey performans.
4. **Kullanıcı Dostu ve Şık Arayüz:** Karmaşık teknik detayları basitleştiren, [yarbai.com](https://yarbai.com/) adresi üzerinden erişilebilen sezgisel web platformu.

---

### **Girişimci Ekibin Vizyonu**

Projenin arkasındaki Türk girişimci ve mühendis ekibi, YarbAI'nin sadece yerel bir başarı hikayesi olmakla kalmayıp küresel yapay zeka pazarında rekabet edebilecek güçlü bir teknoloji markası haline gelmesini hedefliyor.

**Ali Esat**'a değerlendirmelerde bulunan proje geliştiricileri şu noktalara dikkat çekiyor:

> *"Yapay zeka teknolojileri artık sadece büyük teknoloji devlerinin tekelinde değil. Türk girişimcileri ve yazılımcıları olarak hem yerel hem de küresel ölçekte değer yaratan çözümler geliştirecek bilgi birikimine ve yeteneğe sahibiz. YarbAI (yarbai.com) projemizle kullanıcıların verimliliklerini katlayacak, güvenilir ve sürdürülebilir bir zeka asistanı inşa ettik."*

---

### **Teknoloji Dünyasında Türk Girişimciliğinin Yükselişi**

Birleşik Krallık ve Avrupa genelinde teknoloji yatırımlarının odak noktası haline gelen Türk girişimciler, özellikle SaaS (Yazılım Servisi) ve Yapay Zeka (AI) alanlarında dikkate değer işlere imza atıyor. YarbAI projesi de bu inovasyon hamlesinin en taze ve heyecan verici örneklerinden biri olarak öne çıkıyor.

Proje ekibi, önümüzdeki süreçte YarbAI platformuna mobil entegrasyonlar, kurumsal verimlilik modülleri ve çoklu dil desteği gibi yeni yetenekler eklemeyi sürdüreceklerini belirtiyor.

**YarbAI** projesini yakından incelemek ve yapay zeka deneyimini keşfetmek için [yarbai.com](https://yarbai.com/) adresini ziyaret edebilirsiniz.`,
    comments: [
      {
        id: 'c-yarbai-1',
        authorName: 'Barış Demir',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        content: 'Türk girişimcilerin yapay zeka alanında bu denli kaliteli işler çıkarması gurur verici! YarbAI (yarbai.com) projesini hemen inceleyeceğim.',
        createdAt: '2026-08-03T10:15:00Z',
        likes: 18,
      },
      {
        id: 'c-yarbai-2',
        authorName: 'Selin Doğan',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Ali Esat harika bir haber kaleme almış. YarbAI platformundaki kişiselleştirilmiş zeka asistanı çözümleri çok etkileyici.',
        createdAt: '2026-08-03T10:30:00Z',
        likes: 14,
      }
    ],
  },
  {
    id: 'post-oxford-martyrs',
    title: 'Oxford Surlarında Yakılan Din Adamları: Tudor Dönemi Engizisyonu ve Oxford Şehitleri',
    subtitle: 'Broad Street üzerindeki meşale: Hugh Latimer, Nicholas Ridley ve Thomas Cranmer\'ın trajik öyküsü',
    excerpt: '1555-1556 yıllarında Oxford\'da yakılarak idam edilen Piskopos Latimer, Ridley ve Başpiskopos Cranmer, Britanya din ve siyaset tarihinin dönüm noktalarından birini oluşturuyor.',
    category: 'Britanya Tarihi',
    tags: ['BritanyaTarihi', 'Oxford', 'Tudor', 'Tarih', 'İngiltere'],
    coverImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. Selin Karan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      bio: 'Tarih Araştırmacısı ve Oxford Üniversitesi Tarih Akademisyeni.',
    },
    createdAt: '2026-07-24T08:00:00Z',
    readTimeMinutes: 8,
    status: 'published',
    likes: 289,
    views: 3100,
    bookmarksCount: 132,
    featured: false,
    content: `İngiltere tarihinin en çalkantılı kesitlerinden biri, I. Mary (Kanlı Mary) dönemindeki Protestan Reformu karşıtı yargılamalardır. Oxford Üniversitesi\'nin tarihi sokakları, 16. yüzyılın ortalarında inanç ve siyaset mücadelesinin en kanlı sahnelerine tanıklık etmiştir.

### Broad Street\'teki Engizisyon Ateşi
16 Ekim 1555 günü, Oxford\'un Broad Street caddesinde Balliol College hendeklerinin hemen yanında devasa bir odun yığını hazırlandı. Worcester Piskoposu Hugh Latimer ve Londra Piskoposu Nicholas Ridley, katolik inancına dönmeyi reddettikleri için diri diri yakılmaya mahkûm edildiler.

### "Latimer\'ın Kehaneti"
Alevler yükselmeye başladığında, Hugh Latimer yanındaki Nicholas Ridley\'e tarih kitaplarına kazınan şu ünlü sözleri fısıldadı:

> "Müsterih ol Dostum Ridley, bir erkek gibi dur! Biz bugün İngiltere'de Tanrı'nın izniyle öyle bir meşale yakacağız ki, inancım o ki bu ışık asla sönmeyecektir."

Aylar sonra, Anglican Dua Kitabı\'nın mimarı olan Canterbury Başpiskoposu Thomas Cranmer da aynı noktada ateşe verildi. Cranmer, ölüm anında daha önce baskı altında imzaladığı cayma metinlerini imzalayan sağ elini ateşe ilk uzatarak vicdan muhasebesini tüm halkın önünde tamamladı.

### Günümüzdeki İzleri: Martyrs' Memorial ve Park
Bugün Oxford\'a giden ziyaretçiler, Broad Street caddesinin ortasındaki parke taşlarına kazınmış küçük parke haç işaretini görebilirler. Birkaç adım ötede, St Giles caddesinde yükselen görkemli **Martyrs' Memorial** (Şehitler Anıtı), Britanya din özgürlüğü ve vicdan tarihinin simgelerinden biridir.`,
    comments: [
      {
        id: 'c-oxford-1',
        authorName: 'Can Aksu',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        content: 'Oxford gezimde Broad Street\'teki o haç işaretini görmüştüm, hikayesini bu kadar derinlemesine okumak çok etkileyici.',
        createdAt: '2026-07-24T09:30:00Z',
        likes: 19,
      },
    ],
  },
  {
    id: 'post-tate-modern',
    title: 'Thames Kıyısında Modern Sanatın Kalbi: Tate Modern ve Londra Galerileri',
    subtitle: 'Bankside elektrik santralinden dünyanın en çok ziyaret edilen çağdaş sanat mabedine yolculuk',
    excerpt: 'Londra Southbank kültür koridorunun simgesi Tate Modern; Rothko, Picasso, Warhol eserleri ve devasa Turbine Hall enstalasyonlarıyla çağdaş sanatın yönünü çiziyor.',
    category: 'Kültür & Sanat',
    tags: ['TateModern', 'KültürSanat', 'Londra', 'GörselSanatlar', 'Southbank'],
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ece Aydın',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      bio: 'Sanat Eleştirmeni ve Londra Sanat Rotası Yazarı.',
    },
    createdAt: '2026-07-23T18:00:00Z',
    readTimeMinutes: 6,
    status: 'published',
    likes: 340,
    views: 4100,
    bookmarksCount: 178,
    featured: false,
    content: `Thames Nehri'nin güney kıyısında yükselen dev tuğla baca, bir zamanlar Londra'ya elektrik sağlayan Bankside Elektrik Santrali'ydi. 2000 yılında mimar Herzog & de Meuron dokunuşuyla sanata dönüştürülen bu heybetli bina, bugün **Tate Modern** adıyla modern sanatın dünyadaki en büyük çekim merkezi.

### Turbine Hall: Anıtsal Enstalasyonlar
Eski türbin salonu olan devasa kanyon benzeri mekân, her yıl dünyanın en prestijli sanatçılarının mekana özgü devasa heykellerine ve interaktif sergilerine ev sahipliği yapıyor. Ai Weiwei'nin milyonlarca porselen ayçekirdeği çalışması ve Olafur Eliasson'un yapay güneşi hâlâ hafızalarda.

### Rothko Odası ve Kübizmden Sürrealizme
Müzenin kalıcı koleksiyonunda Mark Rothko'nun meditasyon etkisi yaratan dev Seagram duvar resimleri, Pablo Picasso'nun kübik tabloları, Andy Warhol'un pop-art ikonları ve Salvador Dalí'nin gerçeküstü yapıtları ücretsiz olarak ziyaret edilebiliyor.

> "Tate Modern, yalnızca sanatın sergilendiği bir bina değil; kamu alanının, nehir manzaralarının ve özgür düşüncenin harmanlandığı yaşayan bir kent meydanıdır."

### Millennium Bridge ve St. Paul's Yürüyüşü
Tate Modern çıkışında yer alan yaya köprüsü Millennium Bridge üzerinden nehrin karşı kıyısındaki St. Paul Katedrali'ne yürümek, Londra'nın tarih ile modern estetiği harmanlayan en güzel yürüyüş rotasıdır.`,
    comments: [],
  },
  {
    id: 'post-nhs-cancer-vaccine',
    title: 'İngiltere Sağlık Sisteminde Kanser Tedavisinde Yeni Çağ: NHS Kişiselleştirilmiş mRNA Aşıları',
    subtitle: 'BioNTech iş birliğiyle İngiltere hastanelerinde hayata geçirilen kişiye özel kanser immünoterapisi',
    excerpt: 'İngiltere Ulusal Sağlık Sistemi (NHS), melanoma, akciğer ve bağırsak kanseri hastaları için kişiselleştirilmiş mRNA kanser aşısı klinik çalışmalarını ülke genelinde başlattı.',
    category: 'Sağlık',
    tags: ['Sağlık', 'NHS', 'KanserTedavisi', 'mRNA', 'İngiltere'],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. Mehmet Soylu',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
      bio: 'NHS Bünyesinde Tıp Uzmanı ve Sağlık Teknolojileri Yazarı.',
    },
    createdAt: '2026-07-23T12:00:00Z',
    readTimeMinutes: 7,
    status: 'published',
    likes: 410,
    views: 4800,
    bookmarksCount: 215,
    featured: false,
    content: `İngiltere Ulusal Sağlık Sistemi (NHS), biyoteknoloji devi BioNTech iş birliğiyle tıp dünyasında devrim niteliğinde bir adım attı. İngiltere genelindeki onlarca üniversite hastanesinde başlatılan 'Cancer Vaccine Launch Pad' programı, kişiselleştirilmiş mRNA aşılarını doğrudan hastalara ulaştırıyor.

### Tedavi Nasıl Çalışıyor?
Geleneksel kemoterapi yöntemlerinin aksine, mRNA tabanlı kanser aşıları hastanın kendi tümör dokusundan alınan genetik kodlarla üretiliyor. Aşılama sayesinde hastanın bağışıklık sistemi, kanser hücrelerindeki spesifik mutasyonları tanıyarak vücudun kendi savunma mekanizmasını harekete geçiriyor.

### Erken Aşama Başarıları ve Uygulama Ağı
Londra, Manchester, Birmingham ve Cambridge'deki araştırma merkezlerinde başlatılan klinik süreçlerde, ameliyat sonrası kanserin nüksetme riskini sıfıra indirmek hedefleniyor.

> "Kişiselleştirilmiş aşılar, kanser tedavisinde 'tek tip ilaç' devrini kapatıp hastanın genetik haritasına özel terzilik hassasiyetinde yeni bir dönem başlatıyor."

### Bütüncül Yaşam ve NHS Destek Ağları
İngiltere'de yaşayan bireyler için NHS bünyesindeki erken tanı taramaları (Cervical, Breast, Bowel Screening) ve GP yönlendirmeleri, bu yenilikçi tedavilere erişimde kritik role sahip.`,
    comments: [
      {
        id: 'c-health-1',
        authorName: 'Sibel Akman',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        content: 'Tıp dünyasında ve İngiltere\'de umut verici harika bir gelişme. Detaylı anlatım için teşekkürler.',
        createdAt: '2026-07-23T15:00:00Z',
        likes: 31,
      },
    ],
  },
  {
    id: 'post-1',
    title: 'Adadan Son Dakika: Birleşik Krallık Genelinde Temiz Enerji ve Altyapı Yatırımları Hız Kazanıyor',
    subtitle: 'Kuzey Denizi rüzgar türbinlerinden demiryolu modernizasyonuna Ada gündeminin en sıcak başlıkları',
    excerpt: 'Britanya genelinde kamu ve özel sektör iş birlikleriyle hayata geçirilen dev altyapı projeleri, bölgesel kalkınmayı ve yeşil enerji geçişini şekillendiriyor.',
    category: 'Britanya\'dan Haberler',
    tags: ['BritanyaHaberleri', 'Gündem', 'İngiltere', 'Enerji', 'BirAda'],
    coverImage: ukWindSolarEnergy,
    author: {
      name: 'Kemal Ertürk',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Bir Ada Haber Müdürü ve Londra Gazetecisi.',
    },
    createdAt: '2026-07-24T09:00:00Z',
    readTimeMinutes: 6,
    status: 'published',
    likes: 312,
    views: 3400,
    bookmarksCount: 145,
    featured: false,
    content: `Birleşik Krallık genelinde hükümet ve yerel idarelerin koordinasyonunda yürütülen yeni altyapı seferberliği, Brighton kıyılarındaki rüzgar türbinlerinden Sheffield bölgesindeki dev güneş panelleri komplekslerine kadar geniş bir coğrafyayı etkiliyor.

### 1. Brighton Offshore Rüzgar Santralleri ve Sheffield Güneş Paneli Tarlaları
Brighton açıklarında yükselen rüzgar türbinleri ve Sheffield kırsalındaki modern güneş panelleri, Ada'nın temiz enerji ihtiyacının önemli bir kısmını karşılamaya başladı. Bu projeler, Ukde Enerji ve yenilenebilir altyapı girişimleriyle Birleşik Krallık'ı yeşil enerjide küresel liderliğe taşımayı hedefliyor.

> "Adadan yükselen her yeni yeşil altyapı adımı, gelecek kuşaklara sürdürülebilir bir miras bırakma kararlılığımızın göstergesidir."

### 2. Manchester ve Birmingham Sanayi Koridoru
Kuzey ve Orta İngiltere kentlerinde eski sanayi havzaları, yüksek teknoloji ve yeşil enerji araştırma merkezlerine dönüştürülüyor. Bu dönüşüm, Londra dışındaki kentlerde de yoğun istihdam sağlıyor.`,
    comments: [
      {
        id: 'c-301',
        authorName: 'Metehan Şahin',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Ada\'dan böylesine taze ve doyurucu haberler almak harika. Tebrikler!',
        createdAt: '2026-07-24T10:15:00Z',
        likes: 24,
      },
    ],
  },
  {
    id: 'post-2',
    title: 'Birleşik Krallık Yeni Yatırımcı ve Girişimci Vizeleri Rehberi: Innovator Founder, Expansion Worker ve Sınırsız Oturum',
    subtitle: 'Resen Legal Kurucusu Av. Fetanet Darıoğlu kalemiyle: Ankara Anlaşması sonrası İngiltere\'de yeni dönem vizeleri, onay kuruluşu (Endorsing Body) kriterleri ve 3 yılda kalıcı oturum (ILR) haritası',
    excerpt: 'Ankara Anlaşması sonrası Birleşik Krallık\'ta yatırım ve iş kurma yolları: Innovator Founder Visa, UK Expansion Worker ve yeni yatırımcı rotaları üzerine Resen Legal Kurucusu Av. Fetanet Darıoğlu\'nun rehber niteliğindeki makalesi.',
    category: 'İş Dünyası',
    tags: ['YatırımcıVizesi', 'InnovatorFounder', 'ResenLegal', 'FetanetDarıoğlu', 'İngiltereVizesi', 'ExpansionWorker', 'Londra'],
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Fetanet Darıoğlu',
      avatar: fetanetDariogluAvatar,
      bio: 'Resen Legal Kurucusu & Kıdemli Avukat (Founder & Principal Lawyer at Resen Legal - resenlegal.com)',
    },
    createdAt: '2026-07-23T14:20:00Z',
    readTimeMinutes: 9,
    status: 'published',
    likes: 540,
    views: 4920,
    bookmarksCount: 230,
    featured: false,
    content: `**Av. Fetanet Darıoğlu** — *Founder & Principal Lawyer, Resen Legal (resenlegal.com)*

Ankara Anlaşması'nın (ECAA) sona ermesi ve İngiltere'nin AB'den ayrılmasıyla (Brexit) birlikte, Birleşik Krallık İçişleri Bakanlığı (Home Office) göçmenlik ve iş kurma mevzuatında radikal güncellemeler gerçekleştirdi. Türk yatırımcılar, girişimciler ve şirket sahipleri için İngiltere pazarında yer alma ve aileleriyle birlikte yerleşme yolları son dönemde en çok merak edilen hukuki konuların başında gelmektedir.

**Resen Legal** (resenlegal.com) olarak, Birleşik Krallık'a yatırım yapmak, mevcut şirketini Londra'ya genişletmek veya yenilikçi girişimlerle Ada pazarında büyümek isteyen müvekkillerimize stratejik göç ve ticaret hukuku danışmanlığı sunuyoruz.

---

### **1. Innovator Founder Visa (Yenilikçi Kurucu Vizesi)**

Eski Innovator ve Start-up vizelerinin birleştirilmesiyle oluşturulan **Innovator Founder Visa**, İngiltere'de yeni ve özgün bir iş kurmak isteyen girişimciler için ana rotadır.

* **50.000 Sterlin Minimum Sermaye Şartı Kaldırıldı:** Yeni düzenlemeyle birlikte geçmişteki asgari 50.000 GBP yatırım zorunluluğu esnetilmiştir. Ancak iş planının gerektirdiği ölçekte öz sermayenin varlığı halen aranmaktadır.
* **Üç Temel Kriter (Innovation, Viability, Scalability):**
  1. **Yenilikçilik (Innovation):** İş fikrinin Birleşik Krallık pazarında mevcut olmayan veya belirgin bir rekabet avantajı sunan özgün bir niteliğe sahip olması.
  2. **Uygulanabilirlik (Viability):** Girişimcinin gerekli becerilere, pazarlama stratejisine ve finansal sürdürülebilirliğe sahip olması.
  3. **Ölçeklenebilirlik (Scalability):** İşletmenin istihdam yaratma ve ulusal/uluslararası pazarda büyüme potansiyeli.
* **Onay Kuruluşu (Endorsing Body) Şartı:** Başvurunun kabulü için Home Office tarafından yetkilendirilmiş akredite onay kuruluşlarından "Endorsement Letter" alınması zorunludur.

> *"Innovator Founder rotasının en büyük avantajı, gerekli büyüme performansını gösteren girişimcilere **sadece 3 yıl sonunda Kalıcı Oturum (Indefinite Leave to Remain - ILR)** hakkı tanımasıdır."*

---

### **2. UK Expansion Worker Visa (Mevcut Şirketleri İngiltere'ye Genişletme)**

Türkiye'de veya başka bir ülkede hali hazırda faal, kârlı ve yerleşik bir şirketi olan iş insanları için en güvenli yol **Global Business Mobility – UK Expansion Worker** vizesidir.

* **Ana Şirket Temsilciliği:** Yabancı ana şirketin Birleşik Krallık'ta henüz ticari faaliyete başlamamış bir şube veya bağlı ortaklık (subsidiary) açmasını sağlar.
* **Kilit Personel Transferi:** Şirket sahibi, kıdemli yöneticisi veya uzman personeli, İngiltere'deki yapıyı kurmak ve operasyonları başlatmak üzere Londra'ya atanabilir.
* **Sponsorluk Lisansı (Sponsor Licence):** İngiltere'deki yeni yapı için Home Office nezdinde sponsorluk lisansı alınması gereklidir.

---

### **3. Scale-up Visa ve Yüksek Potansiyelli Yetenek Rotaları**

Hızlı büyüyen (scale-up) şirketler ve dünyanın önde gelen üniversitelerinden mezun olanlar için esnek çalışma ve yatırım yolları mevcuttur:

1. **Scale-up Visa:** Yıllık en az %20 büyüme veya istihdam artışı kaydeden İngiltere merkezli şirketlerin yurt dışından esnek uzman transfer etmesini sağlar.
2. **High Potential Individual (HPI) Visa:** Top üniversitelerden mezun genç yeteneklerin İngiltere'de iş kurması veya çalışması için sponsor şartı aramayan rotadır.

---

### **4. Finansal Kaynakların Şeffaflığı (Source of Funds) ve Hukuki Denetim**

Birleşik Krallık vize başvurularında en sık karşılaşılan ret gerekçesi, yatırım sermayesinin veya şirket varlıklarının kaynağının (Source of Funds / Source of Wealth) yeterince şeffaf kanıtlanamamasıdır.

* **Kara Para Aklamayı Önleme (AML) Standartları:** Transfer edilen fonların banka dökümleri, vergi beyannameleri ve resmi satış/temettü evraklarıyla eksiksiz belgelenmesi hayati önem taşır.
* **İş Planı (Business Plan) Hukuki Denetimi:** Onay kuruluşlarının incelediği pazar araştırmaları, finansal projeksiyonlar ve hukuki risk analizleri profesyonelce hazırlanmalıdır.

---

### **5. Kaynakça ve Referanslar (Sources & Bibliography)**

Bu makale hazırlanırken yararlanılan ve Birleşik Krallık resmi kurumları tarafından yayımlanan mevzuat ve kılavuz kaynakları:

1. **UK Home Office:** *Immigration Rules Appendix Innovator Founder (2024–2026).*
2. **UK Visas and Immigration (UKVI):** *Global Business Mobility Routes: UK Expansion Worker Sponsor Guidance.*
3. **UK Government / Gov.uk:** *Endorsing Bodies Official List and Assessment Criteria for Innovators.*
4. **Legislation.gov.uk:** *Immigration Act 1971 & Nationality and Borders Legislation.*
5. **Resen Legal Göç ve Ticaret Hukuku İncelemeleri:** *https://resenlegal.com*

---

### **Sonuç: Resen Legal ile Güvenli Yatırım ve Oturum**

Birleşik Krallık'ta doğru yatırım rotasını seçmek, sadece vize almak değil; gelecekteki aile oturumunuzu ve ticari varlığınızı güvenceye almaktır. **Fetanet Darıoğlu** liderliğindeki **Resen Legal**, iş planı denetiminden onay kuruluşu süreçlerine, şirket kurulumundan kalıcı oturum başvurularına kadar tüm hukuki süreçte yanınızdadır.

Detaylı bilgi ve hukuki danışmanlık için [resenlegal.com](https://resenlegal.com/) web sitemizi ziyaret edebilir, uzman ekibimizle iletişime geçebilirsiniz.`,
    comments: [
      {
        id: 'c-resen-1',
        authorName: 'Hakan Yılmaz',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Ankara Anlaşması sonrası Innovator Founder vizesi ve Onay Kuruluşu detayları hakkında harika ve çok net bir rehber olmuş. Teşekkürler Av. Fetanet Bey!',
        createdAt: '2026-07-23T16:00:00Z',
        likes: 24,
      },
    ],
  },
  {
    id: 'post-3',
    title: 'Westminster Koridorlarından Global Sahneye: Britanya Siyaseti ve Diplomasi Denklemı',
    subtitle: 'Avam Kamarası kararları, Birleşik Krallık iç politikası ve küresel diplomasi denkleminde Londra\'nın konumu',
    excerpt: 'Westminster Sarayı\'nda alınan kararlar, yalnızca Birleşik Krallık halkını değil; küresel piyasaları ve Avrupa diplomasisini yakından etkiliyor.',
    category: 'Siyaset & Aktüel',
    tags: ['Siyaset', 'Westminster', 'Britanya', 'Gündem', 'Londra'],
    coverImage: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Kemal Ertürk',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      bio: 'Westminster kayıtlı Siyaset Analisti ve Londra Yorumcusu.',
    },
    createdAt: '2026-07-22T11:00:00Z',
    readTimeMinutes: 7,
    status: 'published',
    likes: 245,
    views: 2800,
    bookmarksCount: 112,
    featured: false,
    content: `Birleşik Krallık politikası, asırlık meşruti monarşi gelenekleri ile günümüz küresel jeopolitiğinin kesişim noktasında şekilleniyor. Prime Minister's Questions (PMQs) oturumlarından Avam Kamarası komitelerine kadar parlamenter demokrasinin işleyişi.`,
    comments: [],
  },
  {
    id: 'post-4',
    title: 'Londra Finans Merkezi ve İngiltere\'de Gayrimenkul & ISA Yatırım Rehberi 2026',
    subtitle: 'Küresel ekonominin kalbinde varlık yönetimi ve enflasyona karşı İngiltere piyasası fırsatları',
    excerpt: 'Londra, yüzyıllardır küresel sermayenin güvenli limanı. Birleşik Krallık\'ta Stocks & Shares ISA, gayrimenkul kiralama getirileri ve sterlin bazlı uzun vadeli portföy yönetimi.',
    category: 'Yatırım',
    tags: ['Yatırım', 'Londra', 'ISA', 'Gayrimenkul', 'Finans'],
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Murat Yazıcı',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      bio: 'Londra merkezli finans analisti ve İngiltere pazar danışmanı.',
    },
    createdAt: '2026-07-20T10:30:00Z',
    readTimeMinutes: 6,
    status: 'published',
    likes: 184,
    views: 1920,
    bookmarksCount: 82,
    featured: false,
    content: `City of London ve Canary Wharf, küresel sermaye hareketlerinin en yoğun yaşandığı finans merkezlerinin başında geliyor. İngiltere'de yaşayan bireysel yatırımcılar için doğru finansal araçları seçmek büyük önem taşır.`,
    comments: [],
  },
  {
    id: 'post-5',
    title: 'Bloomsbury Topluluğu\'ndan Modern İngiliz Düşüncesine Yolculuk',
    subtitle: 'Virginia Woolf, Bertrand Russell ve Londra kahvehanelerinde filizlenen fikirler',
    excerpt: '20. yüzyılın başında Bloomsbury semtindeki evlerde toplanan yazar ve felsefeciler, Viktorya dönemi kalıplarını yıkarak özgür düşüncenin meşalesini yaktılar.',
    category: 'Edebiyat & Felsefe',
    tags: ['Edebiyat', 'Felsefe', 'Bloomsbury', 'VirginiaWoolf', 'Londra'],
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ece Aydın',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      bio: 'Karşılaştırmalı Edebiyat Araştırmacısı ve Editör.',
    },
    createdAt: '2026-07-18T11:00:00Z',
    readTimeMinutes: 6,
    status: 'published',
    likes: 210,
    views: 2200,
    bookmarksCount: 91,
    featured: false,
    content: `Gordon Square caddesindeki yüksek tavanlı Viktorya evlerinde toplanan genç düşünürler, dünyayı değiştireceklerini biliyorlardı. Virginia Woolf, Vanessa Bell ve Bertrand Russell...`,
    comments: [],
  },
  {
    id: 'post-6',
    title: 'Cotswolds ve Somerset Elma Bahçelerinden İskoçya\'ya: Britanya Kırsal Rotaları ve Geleneksel İngiliz Elma Suyu',
    subtitle: 'Bal rengi Viktorya evleri, yüzyıllık Somerset orchards lezzetleri, el yapımı taze İngiliz elma suyu zanaatı ve sisli yaylalar',
    excerpt: 'Londra\'nın hareketinden uzaklaşıp Castle Combe caddelerinde kaybolmak, Somerset\'in tarihi bahçelerinde geleneksel sıkım İngiliz elma suyu (traditional English apple juice & cider) tadımı yapmak ve Isle of Skye doğasını keşfetmek.',
    category: 'UK Gezi',
    tags: ['Gezi', 'Cotswolds', 'Somerset', 'ElmaSuyu', 'GelenekselİngilizMutfagi', 'İskoçya', 'UKGezi'],
    coverImage: britishAppleJuice,
    author: {
      name: 'Merve Karan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Seyahat yazarı, gastronomi araştırmacısı ve fotoğrafçı.',
    },
    createdAt: '2026-08-01T15:00:00Z',
    readTimeMinutes: 8,
    status: 'published',
    likes: 345,
    views: 3820,
    bookmarksCount: 178,
    featured: false,
    content: `# Cotswolds ve Somerset Elma Bahçelerinden İskoçya'ya: Britanya Kırsal Rotaları ve Geleneksel İngiliz Elma Suyu

İngiltere'de seyahat denildiğinde akla ilk olarak Londra'nın görkemli müzeleri gelse de, gerçek Britanya ruhu kırsaldaki bal rengi taş evlerin çiçekli bahçelerinde, Somerset'in meyve kokulu vadilerinde ve İskoçya'nın sisli dağlarında saklıdır.

---

## 1. Cotswolds: Bal Rengi Taş Evler ve Masalsı İngiliz Köyleri
Gloucestershire ve Oxfordshire sınırlarında uzanan **Cotswolds**, "Kraliyet Britanya Kırsalı" unvanını sonuna kadar hak ediyor. 
- **Castle Combe:** İngiltere'nin en güzel köyü kabul edilen Castle Combe'da 16. yüzyıldan kalma kireçtaşı evler arasında yürürken zamanın durduğunu hissedeceksiniz.
- **Bourton-on-the-Water:** Ortasından geçen Windrush Nehri üzerindeki alçak taş köprüleri nedeniyle "Cotswolds'un Venedik'i" olarak anılır.

---

## 2. Somerset'in Tarihi Bahçeleri ve Geleneksel İngiliz Elma Suyu Kültürü
Geleneksel İngiliz mutfağının ve kırsal yaşamının en büyük gurur kaynaklarından biri **Somerset ve Kent bölgelerindeki tarihi elma bahçeleridir (orchards)**. 

### El Yapımı Doğal İngiliz Elma Suyu Zanaatı:
1. **Zengin Elma Çeşitliliği:** *Cox's Orange Pippin*, *Bramley* ve *Egremont Russet* gibi Ada'ya özgü elma türleri, dengeli bir tatlılık ve hafif bir mayhoşluk sunar.
2. **Geleneksel Taş Presleme:** Sonbaharda toplanan elmalar, yüzyıllık tahta ve taş preslerde soğuk sıkım yöntemiyle sıkılır. Hiçbir yapay şeker veya koruyucu eklenmeden doğrudan şişelenir.
3. **Prensip ve Lezzet:** Taze berrak veya tortulu doğal İngiliz elma suyu (Cloudy Apple Juice), soğuk servis edilerek kırsal yürüyüşlerinin ardından mola yerlerinde sunulan en ferahlatıcı İngiliz içeceğidir.

> "Bir kadeh taze sıkılmış geleneksel Somerset elma suyu, İngiliz toprağının güneşi ve yağmurunun en saf lezzet özetidir."

---

## 3. İskoç Yüksek Yaylaları (Highlands) ve Isle of Skye
Kırsal rotamızın kuzey ayağında, sisli vadileri ve derin gölleriyle **Scottish Highlands** karşılar bizi:
- **Glenfinnan Viyadüğü:** Tarihî buharlı trenin dağların arasından süzüldüğü ikonik manzara.
- **Eilean Donan Şatosu:** Göl ortasında yükselen 13. yüzyıl kalesi.
- **Isle of Skye:** Quiraing kayalıkları ve Peri Havuzları (Fairy Pools) ile doğaseverler için adeta bir cennet.

---

## Kırsal Rotada Konaklama ve Gastronomi İpuçları
- **Bed & Breakfast (B&B) Deneyimi:** Tarihi taş çiftlik evlerinde konaklayarak taze pişmiş İngiliz kahvaltısı ve ev yapımı elma reçellerini tadın.
- **Yerel Pazarlar:** Saturday Farmers' Market ziyaretlerinde yerel üreticilerden doğrudan elma suyu, taze cheddar peynirleri ve el yapımı çörekler satın alabilirsiniz.`,
    comments: [
      {
        id: 'c-601',
        authorName: 'Selin Doğan',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: 'Somerset\'teki elma bahçelerine gitmiştim, taze sıkım elma suyu gerçekten harikaydı. Çok zengin ve harika bir seyahat rehberi olmuş!',
        createdAt: '2026-08-01T16:00:00Z',
        likes: 12,
      }
    ],
  },
  {
    id: 'post-dunya-1',
    title: 'Küresel Enerji Rotaları ve Dünya Ekonomisinde Yeni Denge',
    subtitle: 'Avrupa\'dan Asya\'ya değişen tedarik zincirleri, yeşil dönüşüm ve uluslararası piyasalardaki son gelişmeler',
    excerpt: 'Dünya genelinde yenilenebilir enerji yatırımlarının ivme kazanması ve küresel ticaret koridorlarında yaşanan yeni stratejik adımlar üzerine kapsamlı değerlendirme.',
    category: 'Dünyadan Haberler',
    tags: ['DünyadanHaberler', 'KüreselEkonomi', 'Jeopolitik', 'Enerji', 'Dünya Gündemi'],
    coverImage: ukWindSolarEnergy,
    author: {
      name: 'Fatih Bülbül',
      avatar: '',
      bio: 'Küresel jeopolitik, enerji koridorları ve uluslararası ilişkiler alanlarında analizler hazırlayan dış haberler yazarı.',
    },
    createdAt: '2026-07-28T14:30:00Z',
    readTimeMinutes: 5,
    status: 'published',
    likes: 340,
    views: 3100,
    bookmarksCount: 125,
    featured: false,
    content: `# Küresel Enerji Rotaları ve Dünya Ekonomisinde Yeni Denge

Dünya ekonomisi, 2026 yılında hem jeopolitik sahadaki yeni dengeler hem de yenilenebilir enerji dönüşümünün getirdiği radikal değişimlerle şekillenmeye devam ediyor.

## Küresel Ticaret Koridorları Yeniden Çiziliyor

Uluslararası deniz ticaret yollarında ve kara koridorlarında atılan stratejik adımlar, tedarik zincirlerinin daha esnek ve dirençli hale getirilmesini zorunlu kıldı. Doğu Asya ile Avrupa arasındaki ticaret rotalarında hibrit lojistik ağları ön plana çıkarken, merkez bankalarının faiz kararları ve enflasyon patikaları küresel finans piyasalarını doğrudan etkiliyor.

## Yeşil Dönüşüm ve Karbon Piyasaları

Avrupa Birliği ve uluslararası kuruluşların belirlediği net sıfır karbon hedefleri, enerji sektöründe devasa bir sermaye akışına yol açtı. Rüzgar ve güneş enerjisi santralleri ile hidrojen teknolojileri, küresel yatırımların merkezine yerleşti.

Bir Ada Dış Haberler Masası olarak, dünyanın dört bir yanından gelişmeleri ve toplumumuzu etkileyen uluslararası dinamikleri yakından takip etmeye devam ediyoruz.`,
    comments: [],
  },
  {
    id: 'post-uk-events-london-turkish-guide',
    title: 'Londra\'da Gelecek Türk Etkinlikleri ve Kültür Sanat Rehberi (2026 – 2027): Konserler, Tiyatrolar, Festivaller ve Networking',
    subtitle: 'Indigo at The O2\'dan West End sahnelerine, EartH Hackney\'den Southbank\'e: Londra\'da sahne alacak Türk sanatçılar, Türkçe tiyatro turneleri, stand-up gösterileri, film günleri ve profesyonel buluşma takvimi',
    excerpt: 'Londra\'da yaşayanlar ve Ada\'yı ziyaret edenler için en kapsamlı Türk etkinlikleri rehberi: Büyük salon konserleri (Indigo at The O2, Shepherd\'s Bush Empire), Türkçe tiyatro turneleri, komedi gösterileri, geleneksel kültür festivalleri, Türk Sinema Günleri ve kariyer networking etkinlikleri takvimi.',
    category: 'UK Eventler',
    tags: ['UKEtkinlikler', 'LondraEtkinlik', 'Konser', 'Tiyatro', 'Festival', 'TürkToplumu', 'Londra', 'StandUp', 'EtkinlikTakvimi'],
    coverImage: londonTurkishEventsCover,
    author: {
      name: 'Emre Çakmak',
      avatar: '',
      bio: 'Londra ve Birleşik Krallık genelindeki Türk konserleri, tiyatro turneleri, kültür festivalleri ve networking buluşmalarını takip eden etkinlik ve kültür yazarı.',
    },
    createdAt: '2026-08-05T07:30:00Z',
    readTimeMinutes: 8,
    status: 'published',
    likes: 560,
    views: 5200,
    bookmarksCount: 290,
    featured: false,
    content: `# Londra'da Gelecek Türk Etkinlikleri ve Kültür Sanat Rehberi (2026 – 2027)

Dünyanın kültür ve sanat başkenti **Londra**, aynı zamanda yüz bini aşkın dinamik Türk toplumunun, genç profesyonellerin ve binlerce Türk üniversite öğrencisinin buluşma noktasıdır. 

Yıl boyunca Türkiye’nin en sevilen rock ve pop sanatçılarından köklü tiyatro topluluklarına, kapalı gişe stand-up gösterilerinden gastronomi festivallerine ve profesyonel networking buluşmalarına kadar Londra sokaklarında adeta kesintisiz bir **Türk kültür-sanat mevsimi** yaşanıyor.

Bu kapsamlı rehberde; 2026 sonbaharı ve 2027 dönemi boyunca Londra’da gerçekleşecek **büyük konserleri, sahne sanatlarını, film festivallerini, topluluk panellerini ve biletleme ipuçlarını** tek bir takvimde derledik.

---

## 1. Müzik & Canlı Konserler: Londra Sahnelerinde Türk Yıldızları

Londra’nın tarihi ve akustik açıdan dünya çapındaki konser mekânları, Türkiye'den gelen efsane isimleri ve bağımsız müzik sahnesinin öncülerini ağırlamaya hazırlanıyor:

### A) Büyük Salon Konserleri (Indigo at The O2 & O2 Shepherd's Bush Empire)
- **Indigo at The O2 (Greenwich):** Londra'da 2.500+ kişilik devasa kapasitesiyle büyük prodüksiyonlu konserlerin ana adresi. Rock grupları, Türk popunun zirvedeki isimleri ve senfonik projeler burada sahne alıyor.
- **O2 Shepherd's Bush Empire (Batı Londra):** Yüzyıllık tarihi tiyatro atmosferinde Türkçe rock, indie ve popüler müzik geceleri için ikonik bir mekân.
- **Eventim Apollo (Hammersmith):** 3.500+ kişilik oturma kapasitesiyle Türkiye'nin en köklü sanatçılarının Londra durağı.

### B) Caz, Alternatif & Akustik Geceleri
- **Jazz Cafe (Camden Town):** Anadolu saykedelik rock, etnik caz ve funk tınılarının Londra'daki en prestijli mabedi. Altın Gün, Lalalar, Derya Yıldırım & Grup Şimşek gibi grupların kapalı gişe konserlerine ev sahipliği yapıyor.
- **EartH (Evolutionary Arts Hackney - Dalston):** Doğu Londra'nın yenilikçi sanat merkezinde alternatif Türkçe rock, elektronik ve akustik performanslar.
- **The Forge & Dingwalls (Camden):** Sıcak, samimi kulüp atmosferinde Türkçe canlı müzik geceleri.

### C) Klasik Türk Müziği & Senfoni Resitalleri
- **Barbican Centre & Cadogan Hall (Chelsea):** Türk klasik müziği koroları, virtüöz bağlama resitalleri ve senfoni orkestrası eşliğinde icra edilen geleneksel besteler.

---

## 2. Tiyatro, Stand-Up ve Sahne Sanatları Turneleri

Türkiye tiyatro sahnesinin ödüllü prodüksiyonları ve popüler komedyenleri, Birleşik Krallık turneleri kapsamında Londra'da seyirciyle buluşuyor:

### A) Londra Turnesine Gelen Türkçe Tiyatro Oyunları
- **Shaw Theatre (Kings Cross / Euston):** Londra'da Türkçe tiyatro oyunlarının en sık sahnelendiği 450 kişilik modern tiyatro salonu. Türkiye'nin usta oyuncularının tek kişilik veya kadrolu oyunları burada sergileniyor.
- **Bloomsbury Theatre (UCL):** Geniş sahnesi ve merkezi konumuyla müzikli tiyatrolar ve dramatik yapımların Londra adresi.

### B) Stand-Up ve Komedi Geceleri
- **Leicester Square Theatre (Soho / West End):** Türkiye'nin önde gelen stand-up komedyenlerinin ve Çok Güzel Hareketler tarzı mizah ekiplerinin Londra gösterileri.
- **Backyard Comedy Club (Bethnal Green):** Doğu Londra'da yerel Türk komedyenlerin ve 'Open Mic' Türkçe komedi kulüplerinin düzenli sahnesi.

---

## 3. Kültür Festivalleri, Sokak Pazarları & Sinema Günleri

Yaz ve sonbahar aylarında açık havada, kış aylarında ise kültür merkezlerinde binlerce kişiyi bir araya getiren geleneksel etkinlikler:

### 1. Londra Türk Kültür ve Sanat Festivali (London Turkish Culture Festival)
Her yıl Enfield ve Wood Green bölgesindeki park ve etkinlik alanlarında on binlerce ziyaretçiyi ağırlayan dev festival.
- **Neler Var?** Otantik Türk lezzetleri (kebaplar, gözlemeler, baklavalar, Maraş dondurması), el sanatları stantları, mehteran ve halk oyunları gösterileri ile gün boyu süren ücretsiz açık hava konserleri.

### 2. Londra Türk Film Günleri (London Turkish Film Days)
- **Regent Street Cinema & Ciné Lumière (South Kensington):** Türk sinemasının Cannes ve Venedik'te prömiyer yapmış bağımsız filmleri, yönetmen söyleşileri ve restore edilmiş Yeşilçam klasikleri özel gösterimleri.

### 3. Londra Türkçe Kitap ve Edebiyat Günleri
- Hackney ve Islington kütüphaneleri iş birliğiyle düzenlenen imza günleri, Türkiye'den davet edilen çağdaş romancı ve akademisyenlerle panel ve edebiyat atölyeleri.

---

## 4. Profesyoneller, Tech & Girişimcilik Buluşmaları

Londra'da finans, hukuk, yazılım, akademi ve girişimcilik alanında çalışan Türk profesyoneller için düzenli ağ kurma (networking) fırsatları:

- **London Turkish Professionals (LTP) Network Geceleri:** City of London ve Canary Wharf finans merkezinde çalışan Türk profesyoneller için aylık kokteyl ve panel buluşmaları.
- **Turkish Tech & AI Founders Roundtable (Shoreditch / Old Street):** Londra'daki Türk yazılımcılar, yapay zeka araştırmacıları ve scale-up girişimcilerinin deneyim paylaşım zirveleri.
- **Üniversite Mezunları & Genç Yetenek Buluşmaları (Bloomsbury / Holborn):** LSE, UCL, King's College London ve Imperial mezunlar ağının düzenlediği kariyer ve mentörlük atölyeleri.

---

## 5. Gelecek Londra Türk Etkinlikleri Takvim Tablosu (2026 – 2027)

| Etkinlik Adı & Sanatçı | Tür / Kategori | Mekân & Bölge | Dönem / Tarih | Bilet & Giriş Bilgisi |
| :--- | :--- | :--- | :--- | :--- |
| **Büyük Canlı Rock & Pop Konseri** | Canlı Müzik | Indigo at The O2 (Greenwich, Zone 2) | Sonbahar Dönemi | AXS / Eventim üzerinden online bilet |
| **Anadolu Saykedelik & Etnik Caz Gecesi** | Alternatif Canlı Müzik | Jazz Cafe (Camden Town, Zone 2) | Aylık Düzenli | DICE & Jazz Cafe resmi gişesi |
| **Türkçe Tiyatro Oyunu Turnesi** | Sahne Sanatları & Tiyatro | Shaw Theatre (Kings Cross, Zone 1) | Sezon Boyunca | Eventbrite & Tiyatro Bilet Gişesi |
| **West End Türkçe Stand-Up Gecesi** | Komedi & Mizah | Leicester Square Theatre (Soho, Zone 1) | Hafta Sonu Seansları | Tiyatro gişesi & Ticketmaster |
| **Londra Türk Film Gösterimleri** | Bağımsız Sinema & Panel | Regent Street Cinema (Oxford Circus) | Yıllık Özel Hafta | Sinema web sitesi üzerinden rezervasyon |
| **Turkish Tech & AI Networking** | Profesyonel Ağ & Girişimcilik | Shoreditch Tech Hub (East London) | İki Ayda Bir | Meetup & LinkedIn Topluluk Kaydı |
| **Londra Türk Kültür & Gastronomi Festivali** | Açık Hava Kültür Festivali | North London Festival Grounds | Yaz / Erken Sonbahar | Ücretsiz Halka Açık Giriş |

---

## 6. Londra'da Etkinliklere Katılırken Bilmeniz Gereken 5 Altın İpucu

1. **Biletleri Erken Alın (Sold-Out Riski):** Londra'daki Türk etkinlikleri genellikle birkaç gün (hatta saatler) içinde tükenir. Duyuruları ilk elden takip etmek için DICE, Eventbrite, AXS ve yerel organizasyon hesaplarını bildirimlerinize ekleyin.
2. **Ulaşım ve Gece Metrosu (Night Tube):** Konser çıkışlarında özellikle Cuma ve Cumartesi geceleri Jubilee, Northern, Central ve Piccadilly hatlarında çalışan *Night Tube* ile Thameslink/Overground güzergahlarını önceden kontrol edin.
3. **Mekân Yaş Sınırlarına Dikkat Edin:** Londra'daki müzik kulüpleri (örneğin Camden Jazz Cafe veya Islington Academy) genellikle 18+ veya 14+ (yanında yetişkinle) kuralı uygular; fiziksel fotoğraflı kimlik (BRP, pasaport veya UK ehliyeti) taşımak zorunludur.
4. **Güvenli İkinci El Bilet (Resale):** Bilet bulamadığınız durumlarda sosyal medyadaki sahte profiller yerine yalnızca resmi transfer platformlarını (**Twickets**, **Ticketmaster Fan-to-Fan**, **DICE Waiting List**) tercih edin.
5. **Topluluk Gruplarına Katılın:** Londra'daki üniversite Türk dernekleri (Turkish Societies), meslek kulüpleri ve yerel kültür platformları etkinliklerde grup indirimi ve toplu katılım etkinlikleri organize etmektedir.

*Hazırlayan: Emre Çakmak — Bir Ada UK Etkinlik, Kültür ve Toplum Masası*`,
    comments: [
      {
        id: 'c-event-1',
        authorName: 'Deniz Sarp',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Londra\'da ne zaman hangi konser var diye sürekli onlarca sayfayı geziyorduk. Tek bir takvimde ve böylesine ayrıntılı toplanması muhteşem olmuş! Indigo O2 ve Jazz Cafe notları tam yerinde.',
        createdAt: '2026-08-05T08:15:00Z',
        likes: 38,
      },
      {
        id: 'c-event-2',
        authorName: 'Ceren Yurt',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Shaw Theatre\'daki Türkçe tiyatro oyunlarını ve Shoreditch\'teki tech buluşmalarını da eklemeniz çok değerli. Takvimi favorilerime kaydettim, elinize sağlık Emre Bey!',
        createdAt: '2026-08-05T08:50:00Z',
        likes: 27,
      },
    ],
  },
];
