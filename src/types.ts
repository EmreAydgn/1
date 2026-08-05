export type BlogTheme = 'warm' | 'dark' | 'paper' | 'clean';
export type FontStyle = 'serif-newsreader' | 'serif-cormorant' | 'sans-body' | 'mono-type';

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  excerpt: string;
  category: CategoryName;
  tags: string[];
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  createdAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  status: 'draft' | 'published';
  likes: number;
  views: number;
  bookmarksCount: number;
  themePreference?: BlogTheme;
  fontPreference?: FontStyle;
  comments: Comment[];
  featured?: boolean;
  pinned?: boolean;
}

export type CategoryName = 
  | 'Britanya\'dan Haberler'
  | 'Dünyadan Haberler'
  | 'UK Eventler'
  | 'Toplum & Yaşam'
  | 'İş Dünyası'
  | 'Siyaset & Aktüel'
  | 'Yatırım'
  | 'Edebiyat & Felsefe'
  | 'Kültür & Sanat'
  | 'Britanya Tarihi'
  | 'Sağlık'
  | 'UK Gezi'
  | 'Dergi Tanıtımı';

export interface CategoryOption {
  id: CategoryName;
  label: string;
  description: string;
  iconName: string;
}

export interface WritingStats {
  wordCount: number;
  charCount: number;
  readingTimeMinutes: number;
  paragraphCount: number;
}
