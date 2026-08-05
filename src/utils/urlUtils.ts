/**
 * Helper utilities for generating direct deep links for articles and authors
 */

export const getArticleShareUrl = (postId: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    // Remove transient search params and hash
    url.searchParams.delete('post');
    url.searchParams.delete('article');
    url.searchParams.delete('yazar');
    url.searchParams.delete('author');
    url.searchParams.delete('kategori');
    url.hash = '';
    // Set direct article parameter
    url.searchParams.set('yazi', postId);
    return url.toString();
  } catch {
    return `${window.location.origin}${window.location.pathname}?yazi=${encodeURIComponent(postId)}`;
  }
};

export const getAuthorShareUrl = (authorName: string): string => {
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('yazi');
    url.searchParams.delete('post');
    url.searchParams.delete('article');
    url.searchParams.delete('kategori');
    url.hash = '';
    url.searchParams.set('yazar', authorName);
    return url.toString();
  } catch {
    return `${window.location.origin}${window.location.pathname}?yazar=${encodeURIComponent(authorName)}`;
  }
};

export const getCleanHomeUrl = (): string => {
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('yazi');
    url.searchParams.delete('post');
    url.searchParams.delete('article');
    url.searchParams.delete('yazar');
    url.searchParams.delete('author');
    url.searchParams.delete('kategori');
    url.hash = '';
    return url.toString();
  } catch {
    return `${window.location.origin}${window.location.pathname}`;
  }
};
