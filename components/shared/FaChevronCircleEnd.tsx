'use client';
// this component returns an arrow pointing to the left if the language if written from right to left
// and an arrow pointing right if the language is written from left to right

import { rtlLanguages } from '@/data/variables';
import Iconify from '@/components/shared/Iconify';

const FaChevronCircleEnd = ({
  className,
  lang,
}: {
  className?: string;
  lang: string;
}) => {
  const icon = rtlLanguages.includes(lang)
    ? 'fa:chevron-circle-left'
    : 'fa:chevron-circle-right';

  return <Iconify icon={icon} className={className} />;
};

export default FaChevronCircleEnd;
