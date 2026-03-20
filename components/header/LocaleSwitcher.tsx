'use client'

import { DEFAULT_LOCALE, LOCALES, LOCALES_List } from '@/data/costants'
import { usePathname, useRouter } from 'next/navigation'

export function LocaleSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split('/')
  const currentLocale =
    segments[1] && LOCALES.includes(segments[1] as any)
      ? segments[1]
      : DEFAULT_LOCALE

  function switchLocale(locale: string) {
    if (!pathname || locale === currentLocale) return

    const newSegments = [...segments]

    if (newSegments[1] && LOCALES.includes(newSegments[1] as any)) {
      // Path already has a locale as the first segment → replace it
      newSegments[1] = locale
      const newPath = newSegments.join('/') || '/'
      router.replace(newPath)
    } else {
      // No locale segment present → prefix the current path with the new locale
      const suffix =
        pathname === '/'
          ? ''
          : pathname.startsWith('/')
            ? pathname
            : `/${pathname}`
      const newPath = `/${locale}${suffix}`
      router.replace(newPath)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {LOCALES_List.map((locale) => {
        if (locale.code !== currentLocale) return (
          <button
            key={locale.code}
            onClick={() => switchLocale(locale.code)}
            disabled={locale.code === currentLocale}
            className={`${locale.code === currentLocale ? 'font-bold text-gray-500' : 'cursor-pointer text-primary'}`}
          >
            {locale.name}
          </button>
        )
      })}
    </div>
  )
}

// 'use client';

// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { Locale } from '@/app/[lang]/dictionaries';
// import Image from 'next/image';
// import { languages } from '@/data/variables';
// import ToggleMenu from '../shared/ToggleMenu';
// import { FaCaretDown } from 'react-icons/fa';
// import { Trans } from '@/types';

// export default function LocaleSwitcher({
//   lang,
//   t,
// }: {
//   lang: string;
//   t: Trans;
// }) {
//   const pathName = usePathname();
//   const setLanguage = (locale: Locale) => {
//     document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
//   };
//   const redirectedPathName = (locale: Locale) => {
//     if (!pathName) return '/';
//     const segments = pathName.split('/');
//     segments[1] = locale;
//     return segments.join('/');
//   };

//   return (
//     <ToggleMenu
//       toggleButton={(toggleOpen) => (
//         <>
//           <button
//             title={t.header.language}
//             className="lang-button"
//             onClick={toggleOpen}>
//             <Image
//               draggable="false"
//               src={languages.find((language) => language.locale === lang)!.icon}
//               width={16}
//               height={12}
//               alt={lang}
//             />
//             <FaCaretDown />
//           </button>
//         </>
//       )}>
//       {({ close }) => (
//         <div className="lang-menu">
//           {languages.map((lng) => (
//             <Link
//               className={lang === lng.locale ? 'active' : ''}
//               key={lng.locale}
//               href={redirectedPathName(lng.locale)}
//               onClick={() => {
//                 setLanguage(lng.locale);
//               }}>
//               <Image
//                 draggable="false"
//                 src={lng.icon}
//                 width={16}
//                 height={12}
//                 alt={lng.locale}
//               />
//               {lng.title}
//             </Link>
//           ))}
//         </div>
//       )}
//     </ToggleMenu>
//   );
// }
