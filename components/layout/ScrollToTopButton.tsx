'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Iconify from '@/components/shared/Iconify';
import { Trans } from '@/types';

const ScrollToTopButton = ({ t }: { t: Trans }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > 400) {
          setShowTopBtn(true);
        } else {
          setShowTopBtn(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="top-to-btm">
      <Link href="#home" title={t.common.nav.top}>
        {showTopBtn && (
          <Iconify
            icon="fa:angle-up"
            className="icon-position icon-style"
          />
        )}
      </Link>
    </div>
  );
};

export default ScrollToTopButton;
