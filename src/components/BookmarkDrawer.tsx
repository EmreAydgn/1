import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onRemoveBookmark: (postId: string) => void;
}

export const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedPosts,
  onSelectPost,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FAF8F5] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#E8E2D9] animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F4ECE1] text-[#8C6A43] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#2C2825]">
                Okuma Listeniz
              </h3>
              <p className="text-[11px] text-[#736C65]">
                {bookmarkedPosts.length} kayıtlı yazı
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#736C65] hover:bg-[#F3EFEA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bookmarkedPosts.length === 0 ? (
            <div className="text-center py-16 text-[#736C65]">
              <Bookmark className="w-12 h-12 mx-auto mb-3 stroke-1 opacity-40 text-[#8C6A43]" />
              <p className="font-serif-newsreader text-base font-semibold mb-1">
                Listeniz henüz boş
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Beğendiğiniz veya daha sonra okumak istediğiniz yazıları simgeye tıklayarak buraya kaydedebilirsiniz.
              </p>
            </div>
          ) : (
            bookmarkedPosts.map((post) => (
              <div
                key={post.id}
                className="group p-4 rounded-2xl bg-white border border-[#E8E2D9] hover:border-[#8C6A43] transition-all flex gap-4"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold text-[#8C6A43] uppercase tracking-wider block mb-1">
                    {post.category}
                  </span>
                  <h4 
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="font-serif-newsreader font-bold text-sm text-[#2C2825] group-hover:text-[#8C6A43] transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
                  >
                    {post.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-[11px] text-[#8C847C]">
                    <span>{post.readTimeMinutes} dk okuma</span>
                    <button
                      onClick={() => onRemoveBookmark(post.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                      title="Kaldır"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
