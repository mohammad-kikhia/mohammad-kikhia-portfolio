'use client';

import { sections } from '@/data/variables';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Trans } from '@/types';

type Props = {
  t: Trans;
  setHidden: (value: boolean) => void;
  className?: string;
};

export default function NavMenu({ t, setHidden, className = '' }: Props) {
  const [visibleSection, setVisibleSection] = useState('home');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const navbarHeight = 75;
    const checkVisible = (elm: HTMLElement) => {
      const rect = elm.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
      );
      return !(
        rect.bottom < navbarHeight || rect.top - viewHeight >= navbarHeight
      );
    };

    const sectionIds = sections;
    const handleScroll = () => {
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && checkVisible(element)) {
          setVisibleSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ul
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center gap-6 text-sm font-medium text-muted h-screen ${className}`}
    >
      {sections.map((item, i) => {
        const active = item === visibleSection;
        return (
          <li
            key={item}
            data-aos="zoom-out-down"
            data-aos-offset="0"
            data-aos-delay={i * 100}
            onClick={() => setHidden(true)}
          >
              <Link
                href={`#${item}`}
                className={`relative pb-1 transition-colors ${active
                  ? 'text-accent'
                  : 'text-muted hover:text-accent'
                  }`}
              >
              {t.common.nav[item as keyof typeof t.common.nav]}
              {active && (
                <span className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[2px] rounded-full bg-accent" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
