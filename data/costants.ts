export const DEFAULT_LOCALE = 'en';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohammad-kikhia.vercel.app';

/** Absolute URL for Search Console / robots (always root, never /en/...). */
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

export const LOCALES_List = [
    { code: 'en', name: 'English', flag: 'twemoji:flag-united-kingdom' },
    { code: 'ar', name: 'العربية', flag: 'twemoji:flag-syria' },
] as const;

export const LOCALES = LOCALES_List.map((locale) => locale.code);