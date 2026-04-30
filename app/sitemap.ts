import type { MetadataRoute } from 'next';
import { LOCALES, SITE_URL } from '@/data/costants';

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));
}
