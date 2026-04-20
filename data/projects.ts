import { ImagesSrc } from "./files";

export const projects = [
  {
    name_en: "Dynamic Weather App",
    name_ar: "موقع الطقس الديناميكي",
    desc_en:
      "A weather app with dynamic animated weather background made with NextJs 13 - app router",
    desc_ar:
      "موقع الطقس بخلفية متغيرة حسب حالة الطقس. صنع باستخدام NextJs 13 - app router",
    imageLg: ImagesSrc.weatherapp_lg,
    imageSm: ImagesSrc.weatherapp_sm,
    links: {
      visit: "https://dynamic-weather-app-next13.vercel.app",
      code: "https://github.com/mohammad-kikhia/weather-app",
    },
  },
  {
    name_en: "uShopia",
    name_ar: "يوشوبيا",
    desc_en:
      "A polished ecommerce storefront built with Next.js 16 and Tailwind CSS, with fast SSR pages and a structure that follows current Next.js best practices for UX, performance, and maintainability.",
    desc_ar:
      "واجهة متجر إلكتروني أنيقة مبنية على Next.js 16 وTailwind CSS، مع صفحات SSR سريعة وبنية تحترم أفضل الممارسات الحديثة في الأداء وتجربة المستخدم وقابلية الصيانة.",
    imageLg: ImagesSrc.ushopia_lg,
    imageSm: ImagesSrc.ushopia_sm,
    links: {
      visit: "https://u-shopia.vercel.app/",
      code: "https://github.com/mohammad-kikhia/u-shopia",
    },
  },
  {
    name_en: "Minesweeper Game",
    name_ar: "لعبة كانسة الألغام",
    desc_en:
      "My take on the infamous minesweeper game with ReactJs, TailwindCss and Redux-Toolkit.",
    desc_ar:
      "لعبة كانسة الألغام الشهيرة بلمستي الخاصة. صنعت باستخدام ReactJs, TailwindCss و Redux-Toolkit",
    imageLg: ImagesSrc.minesweeper_lg,
    imageSm: ImagesSrc.minesweeper_sm,
    links: {
      visit: "https://react-js-minesweeper.vercel.app/",
      code: "https://github.com/mohammad-kikhia/minesweeper",
    },
  },
  {
    name_en: "My Portfolio",
    name_ar: "معرض أعمالي",
    desc_en:
      "My portfolio—this site—built on Next.js 16 with Tailwind CSS, bilingual EN/AR routing, light/dark theming, and AOS-driven section motion. The contact form uses React Hook Form with Zod validation and sends mail through EmailJS from a dedicated Next.js API route.",
    desc_ar:
      "معرض أعمالي الشخصي (هذا الموقع) مبني على Next.js 16 وTailwind CSS، مع توجيه ثنائي اللغة (عربي/إنجليزي) وتبديل السمة الفاتحة/الداكنة وتأثيرات AOS. نموذج التواصل يستخدم React Hook Form مع تحقق Zod والإرسال عبر EmailJS عبر مسار API في Next.js.",
    imageLg: ImagesSrc.portfolio_lg,
    imageSm: ImagesSrc.portfolio_sm,
    links: {
      visit: "https://mohammad-kikhia.vercel.app",
      code: "https://github.com/mohammad-kikhia/mohammad-kikhia-portfolio",
    },
  },
];
