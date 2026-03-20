'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Iconify from '@/components/shared/Iconify';
import { ImagesSrc } from '@/data/files';

type ProjectInfo = {
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  image: string;
  links: {
    visit: string;
    code: string;
  };
};

type ProjectsCarouselProps = {
  projects: ProjectInfo[];
  t: {
    visit: string;
    code: string;
  };
  lang: 'en' | 'ar';
};

export function ProjectsCarousel({ projects, t, lang }: ProjectsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);

  const total = projects.length;
  const current = projects[index];
  const name = (current as any)[`name_${lang}`] || current.name_en;
  const desc = (current as any)[`desc_${lang}`] || current.desc_en;

  const go = (direction: 'prev' | 'next') => {
    setIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % total;
      }
      return (prev - 1 + total) % total;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragDeltaX.current = 0;
    setIsDragging(true);
    // Capture pointer on the carousel container so move/up are always received,
    // even if the pointer leaves the initial child element.
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX.current === null) return;
    dragDeltaX.current = event.clientX - dragStartX.current;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX.current === null) return;

    const threshold = 50; // pixels
    if (dragDeltaX.current > threshold) {
      go('prev');
    } else if (dragDeltaX.current < -threshold) {
      go('next');
    }

    setIsDragging(false);
    dragStartX.current = null;
    dragDeltaX.current = 0;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
  };

  return (
    <div className="space-y-4 pb-5 relative">
      <Image
        src={ImagesSrc.bgDots}
        alt="Background"
        width={1000}
        height={1000}
        draggable={false}
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover mix-blend-difference"
      />
      {/* Top bar: subtle counter only */}
      {/* <div className="flex items-center justify-end">
        <p className="text-xs text-muted">
          {index + 1} / {total}
        </p>
      </div> */}

      {/* 3D-style carousel inspired by ZakiPass hero carousel */}
      <div
        className="relative mx-auto flex w-full max-w-xl lg:max-w-3xl flex-col items-center gap-6 touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Card stack */}
        <div className="relative flex h-88 w-full items-center justify-center overflow-visible md:h-96">
          {projects.map((project, i) => {
            const position = (i - index + total) % total;
            const isCenter = position === 0;
            const isSide = position === 1 || position === total - 1;
            const isFarSide = position === 2 || position === total - 2;

            let translateXPercent = 0;
            let scale = 0.55;
            let opacity = 0.45;
            let blur = 20;
            let zIndex = 5;

            if (isCenter) {
              translateXPercent = 0;
              scale = 1;
              opacity = 1;
              blur = 0;
              zIndex = 30;
            } else if (isSide) {
              translateXPercent = position === 1 ? 55 : -55;
              scale = 0.8;
              opacity = 0.8;
              blur = 6;
              zIndex = 20;
            } else if (isFarSide) {
              translateXPercent = position === 2 ? 95 : -95;
              scale = 0.7;
              opacity = 0.6;
              blur = 12;
              zIndex = 15;
            } else {
              translateXPercent = position > 2 ? 130 : -130;
              scale = 0.5;
              opacity = 0.35;
              blur = 20;
              zIndex = 10;
            }

            return (
              <div
                key={project.name_en}
                className="absolute inset-y-0 my-auto flex h-88 w-64 items-center justify-center overflow-hidden rounded-2xl border border-accent/50 bg-slate-900/80 shadow-xl shadow-black/40 backdrop-blur-sm md:h-80 md:w-80 lg:w-md"
                style={{
                  transform: `translateX(${translateXPercent}%) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex,
                  transition:
                    'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), filter 0.9s ease-in-out',
                  willChange: 'transform, opacity, filter',
                  cursor: 'grab',
                }}
                onClick={() => {
                  if (!isCenter) {
                    setIndex(i);
                  }
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={project.image}
                    alt={project.name_en}
                    fill
                    sizes="480px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Details for the active (center) project */}
        <div className="w-full rounded-xl border border-slate-700/60 px-4 py-4 shadow-lg shadow-black/30 backdrop-blur-sm">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {name}
            </h3>
            <p className="text-xs text-muted">{desc}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={current.links.visit}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-accent px-3 py-2 text-xs font-semibold uppercase tracking-wide text-accent transition hover:bg-accent hover:text-on-accent"
            >
              <Iconify icon="fa:eye" />
              {t.visit}
            </a>
            <a
              href={current.links.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:border-accent hover:text-accent"
            >
              <Iconify icon="fa:code" />
              {t.code}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

