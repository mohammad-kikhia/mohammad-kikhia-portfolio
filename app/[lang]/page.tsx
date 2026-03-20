import Image from "next/image";
import { getDictionary, Locale } from "./dictionaries";
import TypeAnimation from "@/components/shared/TypeAnimation";
import Link from "next/link";
import Iconify from "@/components/shared/Iconify";
import { socials } from "@/data/variables";
import { ImagesSrc } from "@/data/files";
import "../styles/globals.css";
import ShootingStars from "@/components/home/ShootingStars";

function renderHeroTitle(template: string) {
  const parts = template.split("{span}");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="text-accent">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default async function Home({ params }: { params: { lang: Locale } }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <section
      id="home"
      className="min-h-[80vh] flex items-center relative overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 md:flex-row md:items-center lg:gap-20">
        <ShootingStars />
        {/* ---------- LEFT: HERO COPY ---------- */}
        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              {renderHeroTitle(dictionary.hero.title)}
            </h1>
          </div>
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            {dictionary.hero.role}
          </p>

          <p className="max-w-xl text-base leading-relaxed md:text-lg min-h-[3lh]">
            {dictionary.hero.subtitle}&nbsp;
            <TypeAnimation
              className="text-accent"
              sequence={dictionary.hero.subtext}
              wrapper="span"
              cursor={true}
            />
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#about"
              data-aos="zoom-in"
              data-aos-offset="0"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-accent transition hover:brightness-110"
            >
              <span>{dictionary.common.nav.about}</span>
              <Iconify icon="fa7-solid:arrow-alt-circle-down" />
            </Link>
          </div>

          {/* ---------- SOCIAL ICON LINKS ---------- */}
          <div className="pt-6 border-t border-slate-300/30 dark:border-slate-800">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted">
              {dictionary.hero.connect}
            </p>
            <ul className="flex flex-wrap items-center gap-3">
              {socials.map((item, i) => (
                <li key={item.title}>
                  <a
                    title={item.title}
                    data-aos="zoom-out-down"
                    data-aos-delay={i * 150}
                    data-aos-offset="0"
                    href={item.href}
                    aria-label={item.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-transparent text-accent shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-background hover:scale-110 hover:shadow-accent"
                  >
                    <Iconify
                      icon={item.icon}
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:text-background"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- RIGHT: PROFILE IMAGE / VISUAL ---------- */}
        <div className="flex-1">
          <div className="group relative mx-auto h-72 w-72 md:h-80 md:w-80">
            <div className="absolute inset-0 rounded-full bg-accent-soft blur-3xl transition-transform duration-500 group-hover:scale-105" />
            <div className="hero-blob relative h-full w-full overflow-hidden rounded-[40%] border border-accent bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 shadow-accent">
              <Image
                src={ImagesSrc.me1}
                alt={dictionary.common.metadata.author}
                width={320}
                height={320}
                priority
                draggable={false}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
