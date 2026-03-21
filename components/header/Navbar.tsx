'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Iconify from '@/components/shared/Iconify';
import { Locale } from '@/app/[lang]/dictionaries';
import { Trans } from '@/types';
import NavMenu from './NavMenu';
import { LocaleSwitcher } from '@/components/header/LocaleSwitcher';
import { ThemeSwitcher } from '@/components/header/ThemeSwitcher';
import { Rubik_Wet_Paint } from 'next/font/google';
import { rtlLanguages } from '@/data/variables';

const rubikWetPaint = Rubik_Wet_Paint({
  subsets: ['latin'],
  variable: '--rubik-wet-paint',
  weight: ['400'],
});

const PANEL_MS = 300;

const Navbar = ({ lang, t }: { lang: Locale; t: Trans }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuEntered, setMenuEntered] = useState(false);

  const isRtl = rtlLanguages.includes(lang);

  const closeMenu = useCallback(() => {
    if (!menuVisible) return;
    setMenuEntered(false);
    window.setTimeout(() => setMenuVisible(false), PANEL_MS);
  }, [menuVisible]);

  // Enter: mount first frame, then next frame flip classes so transition runs
  useEffect(() => {
    if (!menuVisible) {
      setMenuEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [menuVisible]);

  const toggleSidePanel = () => {
    if (menuVisible) {
      closeMenu();
    } else {
      setMenuVisible(true);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-300/20 dark:border-slate-800 bg-background/80 backdrop-blur-md overflow-x-hidden">
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
              <NavMenu t={t} setHidden={(v) => v && closeMenu()} />
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              title={menuVisible ? t.header.close_panel : t.header.open_panel}
              aria-label={menuVisible ? t.header.close_panel : t.header.open_panel}
              aria-expanded={menuVisible}
              onClick={toggleSidePanel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/4 text-foreground shadow-sm transition-all duration-300 hover:border-foreground/25 hover:bg-foreground/8 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 focus:ring-offset-background md:hidden"
            >
              {menuVisible ? (
                <Iconify icon="fa6-solid:xmark" />
              ) : (
                <Iconify icon="tabler:menu-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: backdrop-filter on header breaks `fixed` for descendants */}
      {menuVisible && (
        <div
          className={`fixed inset-x-0 top-16 bottom-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden dark:bg-black/70 ${menuEntered ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closeMenu}
        >
          <div
            className={`ms-auto flex h-full w-64 max-w-[85vw] flex-col border-l border-slate-300/20 bg-background p-6 shadow-xl transition-transform duration-300 ease-out will-change-transform dark:border-slate-800 ${menuEntered
                ? 'translate-x-0'
                : isRtl
                  ? '-translate-x-full'
                  : 'translate-x-full'
              }`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t.header.open_panel}
          >
            <NavMenu
              t={t}
              setHidden={(v) => v && closeMenu()}
              className="flex-col items-start gap-4 text-base"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
