import React, { useState } from 'react';
import { X, Send, Mail, Copy, Check, FileText, User, Tag, Sparkles, MessageSquare } from 'lucide-react';
import { CATEGORIES } from '../data/initialPosts';
import { BirAdaLogo } from './BirAdaLogo';

interface SubmitArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitArticleModal: React.FC<SubmitArticleModalProps> = ({ isOpen, onClose }) => {
  const TARGET_EMAIL = 'eaydogan111@gmail.com';

  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toplum & Yaşam');
  const [articleContent, setArticleContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen) return null;

  const mailSubject = encodeURIComponent(`[Bir Ada Yazı Gönderimi] - ${articleTitle || 'Yeni Makale Tarafınızdan'}`);
  const mailBodyText = `SAYIN BİR ADA EDITÖR KURULU,\n\n"Bir Ada" platformunda yayınlanmak üzere aşağıdaki yazımı bilginize sunuyorum:\n\nYAZAR ADI/UNVANI: ${authorName || 'Belirtilmedi'}\nYAZAR BİYOGRAFİSİ: ${authorBio || 'Belirtilmedi'}\nKATEGORİ: ${selectedCategory}\nYAZI BAŞLIĞI: ${articleTitle || 'Belirtilmedi'}\n\nYAZI METNİ / ÖZETİ:\n${articleContent}\n\nİletişim & Saygılarımla,\n${authorName || 'Okur'}`;
  const mailToUrl = `mailto:${TARGET_EMAIL}?subject=${mailSubject}&body=${encodeURIComponent(mailBodyText)}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(`GÖNDERİLECEK ADRES: ${TARGET_EMAIL}\nKONU: [Bir Ada Yazı Gönderimi] - ${articleTitle}\n\n${mailBodyText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendViaMailClient = () => {
    window.location.href = mailToUrl;
    setSubmittedMessage(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#FAF8F5] border border-[#1A1A1A]/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#1A1A1A] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BirAdaLogo size="sm" showText={false} />
            <div>
              <h3 className="font-serif-playfair text-xl font-bold tracking-tight text-white leading-none">
                Yazı Gönder — Bir Ada
              </h3>
              <p className="text-[11px] font-sans-inter text-[#D4A373] mt-1">
                Editör Kurulu: <span className="underline font-bold">{TARGET_EMAIL}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {submittedMessage ? (
            <div className="text-center py-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif-playfair text-xl font-bold text-emerald-900 mb-2">
                E-Posta Yönlendirmesi Başlatıldı!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto mb-4">
                E-posta istemciniz açılmış olmalıdır. Yazınızı doğrudan <strong className="font-bold">{TARGET_EMAIL}</strong> adresine iletebilirsiniz. Katkınız için teşekkür ederiz.
              </p>
              <button
                onClick={() => setSubmittedMessage(false)}
                className="text-xs font-bold text-emerald-900 underline"
              >
                Yeni Bir Metin Düzenle
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white p-4 rounded-2xl border border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/80 leading-relaxed flex items-start gap-3 shadow-xs">
                <Sparkles className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-1">
                    Bir Ada Topluluğuna Yazar Olarak Katılın
                  </p>
                  <p className="text-[#1A1A1A]/70">
                    Makalenizi, araştırmanızı, gezi notlarınızı veya röportajınızı aşağıdaki formu doldurarak doğrudan editörümüzün <strong className="font-semibold text-[#1A1A1A]">{TARGET_EMAIL}</strong> e-posta adresine iletebilirsiniz.
                  </p>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D4A373]" /> Yazar Adı &amp; Unvanınız
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Dr. Ahmet Yılmaz / Araştırmacı"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#1A1A1A]/15 rounded-xl text-xs font-sans-inter text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#D4A373]" /> Kategori Seçimi
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#1A1A1A]/15 rounded-xl text-xs font-sans-inter text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" /> Kısa Yazar Biyografisi
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Londra'da yaşayan mimar, Britanya şehir estetiği üzerine yazıyor."
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#1A1A1A]/15 rounded-xl text-xs font-sans-inter text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#D4A373]" /> Yazı Başlığı
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Britanya'da Çözüm Odaklı Kültürel Projeler..."
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#1A1A1A]/15 rounded-xl text-xs font-serif-playfair text-[#1A1A1A] font-bold focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                    Yazı İçeriği &amp; Özet
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Makalenizi buraya yazın veya yapıştırın..."
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#1A1A1A]/15 rounded-2xl text-xs font-sans-inter text-[#1A1A1A] leading-relaxed focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>
            </>
          )}

        </div>

        {/* Modal Actions Footer */}
        <div className="bg-[#EBE8E0] px-6 py-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/70">
            <Mail className="w-4 h-4 text-[#C8102E]" />
            <span>Alıcı: <strong className="text-[#1A1A1A] font-bold">{TARGET_EMAIL}</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyText}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-white hover:bg-gray-50 text-[#1A1A1A] border border-[#1A1A1A]/20 rounded-full text-xs font-bold uppercase tracking-wider font-sans-inter transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı' : 'Metni Kopyala'}</span>
            </button>

            <button
              onClick={handleSendViaMailClient}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C8102E] text-white rounded-full text-xs font-bold uppercase tracking-widest font-sans-inter transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>E-Posta İle Gönder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
