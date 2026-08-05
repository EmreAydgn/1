import React from 'react';
import { X, BookOpen, Feather, Heart, Clock } from 'lucide-react';
import { BlogPost } from '../types';

interface WriterStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
}

export const WriterStatsModal: React.FC<WriterStatsModalProps> = ({
  isOpen,
  onClose,
  posts,
}) => {
  if (!isOpen) return null;

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const totalWords = posts.reduce((acc, p) => acc + (p.content ? p.content.split(/\s+/).length : 0), 0);
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);
  const totalReadingTime = posts.reduce((acc, p) => acc + p.readTimeMinutes, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#F9F7F2] rounded-3xl max-w-lg w-full border border-[#1A1A1A]/10 p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#1A1A1A]/60 hover:bg-[#EBE8E0]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">
              Yazı & Yayın İstatistikleri
            </h3>
            <p className="text-xs font-sans-inter text-[#1A1A1A]/50">
              Edebi üretiminizin genel görünümü ve okur etkileşimi.
            </p>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          
          <div className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10">
            <div className="flex items-center gap-2 text-[#D4A373] mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] font-bold font-sans-inter uppercase tracking-[0.2em]">Toplam Yazı</span>
            </div>
            <p className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">
              {totalPosts} <span className="text-xs font-sans-inter font-normal text-[#1A1A1A]/50">({publishedPosts} Yayında)</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10">
            <div className="flex items-center gap-2 text-[#D4A373] mb-1">
              <Feather className="w-4 h-4" />
              <span className="text-[10px] font-bold font-sans-inter uppercase tracking-[0.2em]">Kelime Sayısı</span>
            </div>
            <p className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">
              {totalWords.toLocaleString('tr-TR')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10">
            <div className="flex items-center gap-2 text-[#D4A373] mb-1">
              <Heart className="w-4 h-4" />
              <span className="text-[10px] font-bold font-sans-inter uppercase tracking-[0.2em]">Toplam Beğeni</span>
            </div>
            <p className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">
              {totalLikes}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#1A1A1A]/10">
            <div className="flex items-center gap-2 text-[#D4A373] mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-bold font-sans-inter uppercase tracking-[0.2em]">Okuma Süresi</span>
            </div>
            <p className="font-serif-playfair text-2xl font-bold text-[#1A1A1A]">
              {totalReadingTime} <span className="text-xs font-sans-inter font-normal text-[#1A1A1A]/50">dakika</span>
            </p>
          </div>
        </div>

        {/* Inspiring Quote Footer */}
        <div className="p-4 rounded-2xl bg-[#EBE8E0] border border-[#1A1A1A]/10 text-center">
          <p className="font-serif-playfair italic text-sm text-[#1A1A1A]/80">
            "Yazmak, içimizdeki sesin kağıttaki fısıltısıdır. Her paragrafınız yeni bir dünyanın kapısını aralar."
          </p>
        </div>
      </div>
    </div>
  );
};
