import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Lemonada } from "next/font/google";
import Providers from "./providers";
import { getDictionary, hasLocale, Locale } from "./dictionaries";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import { rtlLanguages } from "@/data/variables";
import { ImagesSrc } from "@/data/files";
import "../globals.css";
import 'aos/dist/aos.css';
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const lemonada = Lemonada({
  subsets: ['latin', 'arabic'],
  variable: '--lemonada',
  weight: ['400', '500', '600', '700'],
});

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const metaData = {
    title: dictionary?.common?.metadata?.title,
    description: dictionary?.common?.metadata?.description,
    author: dictionary?.common?.metadata?.author,
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohammad-kikhia.vercel.app';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: `%s | ${metaData.title}`,
      default: metaData.title,
    },
    description: metaData.description,
    icons: {
      // icon: '../favicon.ico',
      icon: '/icon',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        notranslate: true,
        'max-image-preview': 'large',
      },
    },
    applicationName: metaData.title,
    keywords: [
      'Mohammad Kikhia',
      'محمد كيخيا',
      'Frontend Developer',
      'مطور ويب',
      'Web Development',
      'تطوير الويب',
      'NextJS',
      'نيكست جي اس',
      'ReactJS',
      'رياكت جي اس',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Syria',
      'سوريا',
      'Latakia',
      'Lattakia',
      'اللاذقية',
      'User Interface',
      'User Experience',
      'UI',
      'UX',
      'Responsive Design',
      'Version Control',
      'Git',
      'GitHub',
      'Node.js',
      'JSON',
      'REST API',
      'Redux',
      'SSR',
      'Server Side Rendering',
      'SEO',
      'Search Engine Optimization',
    ],
    authors: [
      { name: metaData.author },
      { name: metaData.author, url: 'https://mohammad-kikhia.vercel.app' },
    ],
    category: 'technology',
    publisher: metaData.author,
    creator: metaData.author,
    twitter: {
      card: metaData.title,
      title: metaData.title,
      description: metaData.description,
      images: [ImagesSrc.me1, ImagesSrc.me2],
    },
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      siteName: metaData.title,
      url: 'https://mohammad-kikhia.vercel.app',
      images: [
        {
          url: ImagesSrc.me1,
          width: 800,
          height: 600,
          alt: metaData.author,
        },
        {
          url: ImagesSrc.me2,
          width: 1800,
          height: 1600,
          alt: metaData.author,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
  about,
  skills,
  experience,
  projects,
  contact,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
  about: ReactNode;
  skills: ReactNode;
  experience: ReactNode;
  projects: ReactNode;
  contact: ReactNode;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound()
  const dictionary = await getDictionary(lang);

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const theme: 'light' | 'dark' =
    themeCookie === 'dark' || themeCookie === 'light'
      ? themeCookie
      : 'light';

  return (
    <html
      className={`overflow-x-hidden ${lemonada.className} ${lemonada.variable} ${theme === 'dark' ? 'dark' : ''
        }`}
      lang={lang}
      dir={rtlLanguages.includes(lang) ? 'rtl' : 'ltr'}
      data-theme={theme}>
      <body className="overflow-hidden">
        <Providers dictionary={dictionary}>
          <Navbar lang={lang} t={dictionary} />
          <main className="pt-10">
            {children}
            {about}
            {skills}
            {experience}
            {projects}
            {contact}
            <ScrollToTopButton t={dictionary} />
          </main>
        </Providers>
        <Footer lang={lang} t={dictionary} />
      </body>
    </html>
  );
}
