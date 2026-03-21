import { ImagesSrc } from './files';

export const projects = [
  {
    name_en: 'Dynamic Weather App',
    name_ar: 'موقع الطقس الديناميكي',
    desc_en:
      'A weather app with dynamic animated weather background made with NextJs 13 - app router',
    desc_ar:
      'موقع الطقس بخلفية متغيرة حسب حالة الطقس. صنع باستخدام NextJs 13 - app router',
    image: ImagesSrc.weatherapp,
    // image: 'weatherapp',
    links: {
      visit: 'https://dynamic-weather-app-next13.vercel.app',
      code: 'https://github.com/M7MD-abo-jacob/Weather-App',
    },
  },
  {
    name_en: 'uShopia',
    name_ar: 'يوشوبيا',
    desc_en:
      'a beautiful ecommerce website made with NextJs, Redux-Toolkit, Bootstrap, NodeJs and MongoDB.',
    desc_ar:
      'موقع متجر الكتروني بسيط صنع باستخدام NextJs, Redux-Toolkit, Bootstrap, NodeJs و MongoDB.',
    image: ImagesSrc.ushopia,
    // image: 'ushopia',
    links: {
      visit: 'https://u-shopia.vercel.app/',
      code: 'https://github.com/M7MD-abo-jacob/uShopia',
    },
  },
  {
    name_en: 'Minesweeper Game',
    name_ar: 'لعبة كانسة الألغام',
    desc_en:
      'My take on the infamous minesweeper game with ReactJs, TailwindCss and Redux-Toolkit.',
    desc_ar:
      'لعبة كانسة الألغام الشهيرة بلمستي الخاصة. صنعت باستخدام ReactJs, TailwindCss و Redux-Toolkit',
    image: ImagesSrc.minesweeper,
    // image: 'minesweeper',
    links: {
      visit: 'https://react-js-minesweeper.vercel.app/',
      code: 'https://github.com/M7MD-abo-jacob/react-Minesweeper/',
    },
  },
  {
    name_en: 'My Portfolio',
    name_ar: 'معرض أعمالي',
    desc_en: 'THIS WEBSITE!',
    desc_ar: 'هذا الموقع!',
    image: ImagesSrc.portfolio,
    // image: 'portfolio',
    links: {
      visit: 'https://mohammad-kikhia-portfolio.vercel.app',
      code: 'https://github.com/M7MD-abo-jacob/Mohammad-Kikhia',
    },
  },
];
