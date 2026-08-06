export const getAuthorInitials = (name: string): string => {
  if (!name) return 'BA';
  if (name.startsWith('Bir Ada')) return 'BA';
  const clean = name.replace(/^(Dr\.|Prof\.|Av\.|Uzm\.|Doç\.|Yrd\.|Müh\.)\s+/i, '');
  const parts = clean.trim().split(/\s+/);
  if (parts.length === 0) return 'BA';
  if (parts.length === 1) return parts[0].substring(0, 2).toLocaleUpperCase('tr-TR');
  return (parts[0][0] + parts[parts.length - 1][0]).toLocaleUpperCase('tr-TR');
};
