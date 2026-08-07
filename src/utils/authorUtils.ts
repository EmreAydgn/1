export const getAuthorInitials = (name: string): string => {
  if (!name) return 'BA';
  if (name.startsWith('Bir Ada')) return 'BA';
  const clean = name.replace(/^(Dr\.|Prof\.|Av\.|Uzm\.|Doç\.|Yrd\.|Müh\.)\s+/i, '');
  const parts = clean.trim().split(/\s+/);
  if (parts.length === 0) return 'BA';
  if (parts.length === 1) return parts[0].substring(0, 2).toLocaleUpperCase('tr-TR');
  return (parts[0][0] + parts[parts.length - 1][0]).toLocaleUpperCase('tr-TR');
};

export const AUTHOR_POSITIONS_MAP: Record<string, string> = {
  'Dr. Celal Görgülü': 'Adli Tıp Uzmanı Hekim & Britanya Gündemi Analisti',
  'Saliha Özdemir': 'Uluslararası Eğitim & Kariyer Danışmanı',
  'Av. Fetanet Darıoğlu': 'Resen Legal Kurucusu & Kıdemli Avukat',
  'Fetanet Darıoğlu': 'Resen Legal Kurucusu & Kıdemli Avukat',
  'Av. Ahmet Hüsrev': 'Londra Göçmenlik & Vize Avukatı',
  'Mehmet Karateke': 'Kamu Görevlisi & Siyaset ve Ekonomi Analisti',
  'Emre Aydoğan': 'Genel Yayın Yönetmeni & Gayrimenkul Yatırım Danışmanı',
  'Dr. Aylin Yılmaz': 'Eğitim Politikaları Analisti & Yükseköğrenim Danışmanı',
  'Fatih Bülbül': 'Dış Haberler Editörü & Uluslararası İlişkiler Analisti',
  'Emre Çakmak': 'UK Etkinlik & Kültür Sanat Yazarı',
  'Dr. Selin Karan': 'Tarih Araştırmacısı & Oxford Akademisyeni',
  'Ece Aydın': 'Sanat Eleştirmeni & Londra Sanat Rotası Yazarı',
  'Dr. Mehmet Soylu': 'NHS Onkoloji Uzmanı & Sağlık Teknolojileri Yazarı',
  'Murat Yazıcı': 'Finans Analisti & Gayrimenkul Yatırım Danışmanı',
  'Merve Karan': 'Seyahat Yazarı & Fotoğrafçı',
  'Bir Ada Yayın Kurulu': 'Yayın Kurulu & Editöryal Masa',
};

/**
 * Returns strictly the author's writing position / title / role without bio text
 */
export const getAuthorWritingPosition = (authorName: string, fallbackBio?: string): string => {
  if (!authorName) return 'Bir Ada Yazarı';
  
  // Exact match
  if (AUTHOR_POSITIONS_MAP[authorName]) {
    return AUTHOR_POSITIONS_MAP[authorName];
  }

  // Partial match by cleaning prefixes
  const normalized = authorName.replace(/^(Dr\.|Prof\.|Av\.|Uzm\.)\s+/i, '').trim().toLowerCase();
  for (const [key, val] of Object.entries(AUTHOR_POSITIONS_MAP)) {
    const keyNorm = key.replace(/^(Dr\.|Prof\.|Av\.|Uzm\.)\s+/i, '').trim().toLowerCase();
    if (keyNorm === normalized || key.toLowerCase() === authorName.toLowerCase()) {
      return val;
    }
  }

  if (fallbackBio) {
    // Extract first title part before period or pipe
    const firstSentence = fallbackBio.split('.')[0]?.split('|')[0]?.split('(')[0]?.trim();
    if (firstSentence && firstSentence.length <= 65) {
      return firstSentence;
    }
  }

  return 'Yazar & Araştırmacı';
};

