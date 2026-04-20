"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Iconify from "@/components/shared/Iconify";
import { ImagesSrc } from "@/data/files";

type ProjectInfo = {
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  imageLg: string;
  imageSm: string;
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
  lang: "en" | "ar";
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

  const go = (direction: "prev" | "next") => {
    setIndex((prev) => {
      if (direction === "next") {
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
      go("prev");
    } else if (dragDeltaX.current < -threshold) {
      go("next");
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
                className="absolute inset-y-0 my-auto flex h-88 w-64 items-center justify-center overflow-hidden rounded-2xl border border-accent/50 bg-slate-900/80 shadow-xl shadow-black/40 backdrop-blur-sm md:h-60 md:w-96 lg:h-80 lg:w-lg"
                style={{
                  transform: `translateX(${translateXPercent}%) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex,
                  transition:
                    "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), filter 0.9s ease-in-out",
                  willChange: "transform, opacity, filter",
                  cursor: "grab",
                }}
                onClick={() => {
                  if (!isCenter) {
                    setIndex(i);
                  }
                }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={project.imageSm}
                    alt={project.name_en}
                    fill
                    sizes="(max-width: 767px) min(90vw, 20rem), 320px"
                    className="object-cover object-top md:hidden"
                    draggable={false}
                  />
                  <Image
                    src={project.imageLg}
                    alt={project.name_en}
                    fill
                    sizes="(min-width: 768px) min(45vw, 28rem), 100vw"
                    className="hidden object-cover object-top md:block"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Details for the active (center) project */}
        <div className="w-full overflow-hidden rounded-2xl border border-slate-300/60 bg-linear-to-br from-accent/7 via-background/95 to-background shadow-lg shadow-black/5 ring-1 ring-accent/10 backdrop-blur-md dark:border-slate-700/70 dark:from-accent/12 dark:via-slate-950/70 dark:to-slate-950/50 dark:shadow-black/30 dark:ring-accent/15">
          <div className="border-b border-slate-200/70 px-5 py-5 dark:border-slate-700/60 md:px-6 md:py-6">
            <div className="border-s-2 border-accent ps-4 md:ps-5">
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground md:text-lg">
                {name}
              </h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                {desc}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-slate-50/80 px-5 py-4 dark:bg-slate-950/50 sm:flex-row sm:flex-wrap sm:items-stretch md:px-6">
            <a
              href={current.links.visit}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-[min(100%,140px)] flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-md shadow-accent/30 transition hover:brightness-110 active:scale-[0.98]"
            >
              <Iconify icon="fa:eye" className="text-[1.05rem] text-white" />
              {t.visit}
            </a>
            <a
              href={current.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 min-w-[min(100%,140px)] flex-1 items-center justify-center gap-2 rounded-xl border border-accent/35 bg-background/80 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent shadow-sm transition duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white hover:shadow-md hover:shadow-accent/20 active:scale-[0.98] dark:bg-slate-900/60 dark:hover:text-white"
            >
              <Iconify
                icon="fa:code"
                className="text-[1.05rem] text-current transition-colors duration-200 group-hover:text-white"
              />
              <span className="transition-colors duration-200 group-hover:text-white">
                {t.code}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
