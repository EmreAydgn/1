import { BlogPost, CategoryOption } from '../types';
import fetanetDariogluAvatar from '../assets/images/fetanet_darioglu_official_1785628301139.jpg';
import emreAydoganAvatar from '../assets/images/emre_aydogan_avatar_1785948893520.jpg';
import ukPropertyInvestCover from '../assets/images/uk_property_invest_1785948908924.jpg';
import ukHousingRatesChart from '../assets/images/uk_housing_rates_chart_1785948928358.jpg';
import ukWindSolarEnergy from '../assets/images/uk_wind_solar_energy_1785628561512.jpg';
import britishAppleJuice from '../assets/images/british_apple_juice_1785628805063.jpg';
import birAdaManifestoCover from '../assets/images/bir_ada_manifesto_cover_1785767235106.jpg';
import londonStudentsCover from '../assets/images/london_students_analysis_1785937267430.jpg';
import ukSponsorshipVisaCover from '../assets/images/uk_sponsorship_visa_1785940746279.jpg';
import londonTurkishEventsCover from '../assets/images/london_turkish_events_1785940930126.jpg';
import { BIR_ADA_LOGO_AVATAR } from '../components/BirAdaLogo';

export const CATEGORIES: CategoryOption[] = [
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
    category: 'Dergi Tanıtımı',
    tags: ['BirAda', 'Manifesto', 'DergiTanıtımı', 'Britanya', 'Toplum', 'Londra', 'SabitYazı'],
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
    title: 'Birleşik Krallık\'ta (UK) Emlak Yatırımı Yapmanın Stratejik Avantajları: Emlak Fiyatları ve Faiz Oranları (Bank Rate) İlişkisi',
    subtitle: 'Bir Ada Kurucusu & Genel Yayın Yönetmeni Emre Aydoğan kalemiyle: Birleşik Krallık konut piyasasında kira getirisi (Buy-to-Let), sermaye değer artışı, döviz bazlı varlık güvencesi ve 2019-2026 Bank of England (BoE) faiz döngüsünün konut fiyat endeksine etkisini gösteren grafikli detaylı analiz.',
    excerpt: 'Birleşik Krallık\'ta gayrimenkul yatırımı yapmanın sunduğu yüksek kira getirisi, değer artışı ve hukuki güvenceler; son yıllarda Bank of England faiz oranları (Bank Rate) ile UK konut fiyatları (UK House Price Index) arasındaki korelasyonu gösteren karşılaştırmalı grafik ve verilerle Emre Aydoğan\'ın kapsamlı rehberi.',
    category: 'İş Dünyası',
    tags: ['EmlakYatırımı', 'İngiltereEmlak', 'LondraGayrimenkul', 'Mortgage', 'FaizOranları', 'BuyToLet', 'KiraGetirisi', 'EmreAydoğan', 'İşDünyası', 'BirAda', 'BoE'],
    coverImage: ukPropertyInvestCover,
    author: {
      name: 'Emre Aydoğan',
      avatar: emreAydoganAvatar,
      bio: 'Bir Ada Dergisi Kurucusu & Genel Yayın Yönetmeni | Emlak ve Yatırım Danışmanı. Üniversitelerin İngiliz Dili ve Edebiyatı bölümünden mezun olup 2015 yılından bu yana Londra\'da yaşamakta ve kariyerini Birleşik Krallık Emlak ve Yatırım Danışmanlığı alanında sürdürmektedir.',
    },
    createdAt: '2026-08-04T11:00:00Z',
    readTimeMinutes: 9,
    status: 'published',
    likes: 640,
    views: 5890,
    bookmarksCount: 312,
    featured: false,
    content: `**Emre Aydoğan** — *Bir Ada Dergisi Kurucusu & Genel Yayın Yönetmeni | Emlak ve Yatırım Danışmanı*

2015 yılından bu yana Londra'da yaşayan, üniversitelerin İngiliz Dili ve Edebiyatı bölümü mezuniyetimin ardından kariyerimi Birleşik Krallık gayrimenkul ve yatırım danışmanlığı alanında sürdüren bir profesyonel olarak; bu yazıda Birleşik Krallık'ta (UK) mülk edinmenin stratejik avantajlarını, son 7 yılda (2019–2026) konut fiyatları ile Bank of England (BoE) politika faizleri arasındaki kritik korelasyonu ve yatırımcıların dikkat etmesi gereken dinamikleri tüm boyutlarıyla ele alıyorum.

Birleşik Krallık gayrimenkul pazarı, yüzyıllardır küresel sermayenin en güvenilir limanlarından biri olma niteliğini korumaktadır. Şeffaf tapu kadastro sistemi (HM Land Registry), köklü mülkiyet hukuku, güçlü Sterlin (GBP) para birimi ve kronik arz açığı; bu adayı hem bireysel hem de kurumsal yatırımcılar için vazgeçilmez bir çekim merkezine dönüştürmektedir.

---

### **1. Birleşik Krallık'ta (UK) Emlak Yatırımı Yapmanın Stratejik Avantajları**

Birleşik Krallık konut pazarına yatırım yapmayı küresel ölçekte ayrıcalıklı kılan dört ana sütun bulunmaktadır:

### **A. Yüksek ve Düzenli Kira Getirisi (Buy-to-Let Cash Flow)**

Birleşik Krallık, dünya sıralamasında ilk 100'de yer alan onlarca üniversitesi, uluslararası şirketlerin Avrupa merkez üssü olması ve nitelikli profesyonel göçmen akını sayesinde sürekli büyüyen devasa bir kiralama talebine sahiptir:

* **Londra (Zone 1-2):** %4.5 – %5.8 brüt kira getirisi ve yüksek sermaye likiditesi.
* **Londra Banliyöleri & Regeneration Bölgeleri (Zone 3-6):** %5.8 – %7.2 brüt kira getirisi.
* **Bölgesel Büyüme Merkezleri (Manchester, Birmingham, Liverpool, Leeds):** %7.0 – %9.5 aralığına ulaşan nakit akışı.

### **B. Uzun Vadeli Sermaye Değer Artışı (Capital Appreciation)**

Birleşik Krallık'ta yıllık yaklaşık 300.000 yeni konuta ihtiyaç duyulurken, fiili üretim yıllık 200.000 bandında kalmaktadır. Bu yapısal arz kısıtı, ekonomik döngülerden bağımsız olarak konut fiyatlarının uzun vadede düzenli bir değer kazanım trendi izlemesini sağlamaktadır. Tarihsel veriler, Birleşik Krallık ortalama konut fiyatlarının her 8–10 yılda bir değerini ikiye katladığını göstermektedir.

### **C. Yabancı Yatırımcılara Eşit Mülkiyet Hakları ve SPV Ltd Kolaylığı**

Birleşik Krallık'ta gayrimenkul almak için İngiliz vatandaşı veya ülkede ikamet ediyor olma şartı aranmaz. Yabancı yatırımcılar kendi adlarına mülk edinebilecekleri gibi, Birleşik Krallık'ta kuracakları bir **SPV (Special Purpose Vehicle) Limited Şirket** üzerinden de alım yaparak mortgage faiz giderlerini vergiden tam olarak düşebilir ve kurumlar vergisi avantajlarından yararlanabilirler.

### **D. Sterlin (GBP) Bazlı Varlık Güvencesi ve Enflasyon Koruması**

Sterlin cinsinden kira geliri ve mülk değeri, yatırımcıların portföylerini kur dalgalanmalarına ve yüksek enflasyona karşı koruyan en güçlü savunma mekanizmalarından biridir.

---

### **2. Son Yıllardaki Emlak Fiyatları ve Bank of England Faiz Oranları (Bank Rate) İlişkisi**

Gayrimenkul piyasasının en önemli belirleyicisi, **Bank of England (BoE)** tarafından belirlenen politika faiz oranı (Official Bank Rate) ve buna bağlı olarak şekillenen ipotekli konut kredisi (Mortgage) faizleridir. 2019 yılından günümüze (2026) uzanan süreç, bu korelasyonun anlaşılması açısından tarihi dersler barındırmaktadır.

![Son Yıllarda UK Ortalama Konut Fiyatları (£) ve Bank of England Faiz Oranları (%) İlişkisi (2019-2026 Grafiği)](${ukHousingRatesChart})

### **Dönem 1: 2019–2021 (Tarihi Düşük Faizler & Pandemi Konut Patlaması)**

* 2020 başında patlak veren COVID-19 pandemisiyle birlikte İngiltere Merkez Bankası politika faizini tarihi dip seviye olan **%0.10**'a indirdi.
* Hükümetin devreye soktuğu **Damga Vergisi Tatili (Stamp Duty Holiday)** ve %1.2–%1.8 bandına gerileyen 2-5 yıllık sabit mortgage oranları, tarihin en büyük konut alım dalgalarından birini tetikledi.
* Birleşik Krallık ortalama konut fiyatları sadece iki yıl içinde **£231,000** seviyesinden **£274,000**'a yükselerek %20'nin üzerinde rekor bir prim yaptı.

### **Dönem 2: 2022–2023 (Enflasyon Şoku, BoE Faiz Artışları ve Piyasa Direnci)**

* Küresel tedarik zinciri krizleri ve enerji fiyatlarındaki artış İngiltere enflasyonunu %11'lerin üzerine taşıyınca, Bank of England faizleri peş peşe 14 kez artırarak **%5.25** zirvesine çıkardı.
* Ortalama mortgage faizleri kısa sürede %6'nın üzerine tırmandı. Birçok finans kuruluşu konut fiyatlarında %15-%20'lik derin bir çöküş öngördü.
* Ancak piyasa bu beklentileri boşa çıkardı: Şiddetli arz açığı ve nakit alıcıların devreye girmesiyle UK ortalama fiyatları yalnızca **%2.0 - %3.5** civarında sınırlı bir düzeltme gördü ve piyasa şaşırtıcı bir direnç sergiledi.

### **Dönem 3: 2024–2026 (Faiz İndirim Döngüsü, Normalleşme ve Yeni Yükseliş Dalgası)**

* Enflasyonun %2 hedefine yaklaşmasıyla birlikte BoE, 2024 sonundan itibaren faiz indirim sürecini başlattı.
* Politika faizinin kademeli olarak **%3.75** seviyelerine gerilemesiyle birlikte 5 yıllık sabit mortgage faizleri **%3.80 - %4.20** bandına oturdu.
* Faizlerin inmesiyle birlikte iki yıldır ertelenen alıcı talebi yeniden piyasaya hücum etti; Birleşik Krallık ortalama konut fiyatı **£315,000**, Londra ortalaması ise **£572,000** seviyesine ulaşarak tüm zamanların en yüksek değerini tazeledi.

---

### **3. Karşılaştırmalı Yıllık Veri Tablosu (2019 – 2026)**

Aşağıdaki tablo, 2019 yılından 2026 güncel dönemine kadar Birleşik Krallık genelinde faiz oranları, mortgage maliyetleri, konut fiyatları ve brüt kira getirilerinin gelişimini özetlemektedir:

| Yıl / Dönem | BoE Politika Faizi (%) | 2-Yıl Sabit Mortgage Ortalama (%) | UK Ortalama Konut Fiyatı (£) | Londra Ortalama Konut Fiyatı (£) | Yıllık Fiyat Değişimi (%) | Ortalama Brüt Kira Getirisi (%) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **2019** | %0.75 | %1.95 | £231,000 | £473,000 | +2.2% | %5.1% |
| **2020** | %0.10 | %1.40 | £249,000 | £496,000 | +7.8% | %5.3% |
| **2021** | %0.25 | %1.55 | £274,000 | £521,000 | +10.0% | %5.0% |
| **2022** | %3.50 | %5.40 | £294,000 | £543,000 | +7.3% | %5.4% |
| **2023** | %5.25 | %6.10 | £288,000 | £528,000 | -2.0% | %6.2% |
| **2024** | %4.75 | %4.60 | £292,000 | £536,000 | +1.4% | %6.5% |
| **2025** | %4.25 | %4.10 | £303,000 | £554,000 | +3.8% | %6.3% |
| **2026 (Güncel)** | %3.75 | %3.85 | £315,000 | £572,000 | +4.0% | %6.1% |

*Veri Kaynakları: Office for National Statistics (ONS UK HPI), Bank of England Official Database, HM Land Registry, Nationwide House Price Index.*

---

### **4. Birleşik Krallık'ta Gayrimenkul Yatırımı Yapacaklara 5 Kritik Tavsiye**

1. **Ulaşım ve Kentsel Dönüşüm (Regeneration) Koridorlarını Hedefleyin:** Londra'da Elizabeth Line (Crossrail), Battersea Nine Elms ve Old Oak Common gibi devasa altyapı projeleri çevrelerindeki mülklerin değer artışını ikiye katlamıştır.
2. **EPC (Energy Performance Certificate) Enerji Sınıfına Dikkat Edin:** Kiralamaya konu mülklerde hükümetin getirdiği minimum EPC derecelendirmelerini (hedef EPC C) karşılayan veya kolayca yükseltilebilen mülkleri seçin.
3. **SPV Limited Şirket Kurulumunu Değerlendirin:** Bireysel alımlarda faiz indirim kısıtlaması (Section 24) nedeniyle yüksek vergi dilimine girmemek adına, portföyünüzü bir UK Limited şirketi altında yapılandırın.
4. **Leasehold Süresini ve Service Charge Giderlerini İnceleyin:** Apartman dairesi alırken tapunun kalan süresinin en az 90+ yıl olmasına ve yıllık site aidatlarının (Service Charge) kira kârlılığınızı eritmemesine özen gösterin.
5. **Güvenilir Yerel Yönetim ve Kiralama Şirketiyle Çalışın:** Yurt dışından yatırım yapıyorsanız, ARLA Propertymark lisanslı profesyonel bir mülk yönetim şirketiyle çalışarak kiracı bulma, kira toplama ve bakım süreçlerini sorunsuz yürütün.

---

### **5. Kaynakça ve Resmi Veri Referansları (Sources & References)**

1. **Office for National Statistics (ONS):** *UK House Price Index (UK HPI) Annual Reports (2019–2026).*
2. **Bank of England (BoE):** *Monetary Policy Committee (MPC) Official Bank Rate Decisions & Inflation Reports.*
3. **HM Land Registry:** *Price Paid Data & Monthly UK Residential Property Transactions.*
4. **Nationwide Building Society:** *Monthly Nationwide House Price Index Historical Series.*
5. **Halifax (Lloyds Banking Group):** *Halifax House Price Index & Mortgage Affordability Studies.*
6. **Royal Institution of Chartered Surveyors (RICS):** *UK Residential Market Survey & Housing Supply Analysis.*

---

*Hazırlayan: Emre Aydoğan — Bir Ada Dergisi Kurucusu & Genel Yayın Yönetmeni | Emlak ve Yatırım Danışmanı*`,
    comments: [
      {
        id: 'c-emre-1',
        authorName: 'Murat Yazıcı',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'Genel Yayın Yönetmenimiz Emre Aydoğan\'dan UK emlak piyasası, 2019-2026 faiz grafiği ve Buy-to-Let stratejileri üzerine başucu niteliğinde bir makale. Emeğinize sağlık!',
        createdAt: '2026-08-04T12:30:00Z',
        likes: 48,
      },
      {
        id: 'c-emre-2',
        authorName: 'Selin Varol',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        content: 'Özellikle BoE faiz döngüsü ile konut fiyat endeksinin karşılaştırmalı tablosu ve SPV Limited şirket tavsiyeleri Birleşik Krallık\'ta ev almak isteyen herkes için altın değerinde.',
        createdAt: '2026-08-04T14:15:00Z',
        likes: 36,
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
