'use client';

import { useState } from 'react';
import Link from 'next/link';
import Iconify from '@/components/shared/Iconify';
import { Locale } from '@/app/[lang]/dictionaries';
import { Trans } from '@/types';
import NavMenu from './NavMenu';
import { LocaleSwitcher } from '@/components/header/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/header/ThemeSwitcher';
import { Rubik_Wet_Paint } from 'next/font/google';

const rubikWetPaint = Rubik_Wet_Paint({
  subsets: ['latin'],
  variable: '--rubik-wet-paint',
  weight: ['400'],
});

const Navbar = ({ lang, t }: { lang: Locale; t: Trans }) => {
  const [hidden, setHidden] = useState(true);

  const toggleSidePanel = () => {
    setHidden((prev) => !prev);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-300/20 dark:border-slate-800 bg-background/80 backdrop-blur-md overflow-hidden">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        {/* BRAND */}
        <Link
          data-aos="zoom-in"
          href="#home"
          className="flex items-center gap-2 text-md font-semibold tracking-tight text-foreground"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full shadow-accent">
            <span className={`text-4xl font-bold ${rubikWetPaint.className} text-accent`}>M</span>
          </span>
          <span>{t.header.brand?.split(' ')?.[0]}</span>{' '}
          <span className="hidden sm:block md:hidden lg:block">{t.header.brand?.split(' ')?.[1]}</span>
        </Link>

        {/* RIGHT SIDE: LOCALE + THEME + DESKTOP NAV */}
        <div className="ms-auto flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2" data-aos="zoom-out-down">
            <LocaleSwitcher />
            <ThemeSwitcher />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:block">
            <NavMenu t={t} setHidden={setHidden} />
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            title={hidden ? t.header.open_panel : t.header.close_panel}
            aria-label={hidden ? t.header.open_panel : t.header.close_panel}
            aria-expanded={!hidden}
            onClick={toggleSidePanel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/4 text-foreground shadow-sm transition-all duration-300 hover:border-foreground/25 hover:bg-foreground/8 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background md:hidden"
          >
            {hidden ? (
              <Iconify icon="tabler:menu-4" />
            ) : (
              <Iconify icon="fa6-solid:xmark" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      {!hidden && (
        <div
          className="fixed inset-x-0 top-16 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setHidden(true)}
        >
          <div className="ms-auto w-64 border-l border-slate-300/20 dark:border-slate-800 bg-background p-6">
            <NavMenu
              t={t}
              setHidden={setHidden}
              className="flex-col items-start gap-4 text-base"
            />
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
