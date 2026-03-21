import Link from 'next/link';
import FaChevronCircleEnd from '@/components/shared/FaChevronCircleEnd';
import { sections, socials, contactMethods } from '@/data/variables';
import Iconify from '../shared/Iconify';
import { Locale } from '@/app/[lang]/dictionaries';

const Footer = ({ lang, t }: { lang: Locale; t: any }) => {
  return (
    <footer>
      <div className="mx-auto w-full max-w-7xl px-6 py-10 space-y-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* ---------- TEXT ---------- */}
          <div
            data-aos="zoom-in"
            className="flex-1 space-y-3"
          >
            <h3 className="text-lg font-semibold tracking-tight">
              {t.footer.title}
            </h3>
            <p className="max-w-md text-sm text-muted">
              {t.footer.subtext}
            </p>
          </div>

          {/* ---------- QUICK LINKS ---------- */}
          <div
            data-aos="zoom-in"
            className="flex-1 space-y-3 md:max-w-xs"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">
              {t.footer.links}
            </h3>
            <nav>
              <ul className="space-y-2 text-sm text-muted">
                {sections.map((section, i) => (
                  <li
                    key={section}
                    data-aos="zoom-in"
                    data-aos-delay={i * 100}
                  >
                    <Link
                      href={`#${section}`}
                      className="inline-flex items-center gap-2 hover:text-accent transition"
                    >
                      <FaChevronCircleEnd lang={lang} className="text-accent" />
                      <span className="capitalize">
                        {t.common.nav[section as keyof typeof t.common.nav]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ---------- CONTACT METHODS + SOCIALS ---------- */}
          <div className="flex-1 space-y-4 md:max-w-xs">
            <div className="space-y-3">
              <h3
                data-aos="zoom-in"
                className="text-sm font-semibold uppercase tracking-[0.25em] text-muted"
              >
                {t.footer.contact_methods}
              </h3>
              <div className="space-y-2 text-sm text-muted">
                {contactMethods.map((item, i) =>
                  item.href ? (
                    <a
                      key={item.title}
                      title={t.footer[item.name]}
                      data-aos="zoom-in"
                      data-aos-delay={i * 100}
                      data-aos-offset="50"
                      href={item.href}
                      className="flex items-center gap-2 hover:text-accent transition"
                    >
                      <Iconify icon={item.icon} className="text-accent" />
                      <span dir="ltr">{item.title}</span>
                    </a>
                  ) : (
                    <p
                      key={item.title}
                      title={t.footer[item.name]}
                      data-aos="zoom-in"
                      data-aos-delay={i * 100}
                      data-aos-offset="50"
                      className="flex items-center gap-2"
                    >
                      <Iconify icon={item.icon} className="text-accent" />
                      <span dir="ltr">{item.title}</span>
                    </p>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="socials">
                <ul className="flex flex-wrap items-center gap-3">
                  {socials.map((item, i) => (
                    <li
                      key={item.title}
                      title={item.title}
                      data-aos="zoom-in"
                      data-aos-delay={i * 100}
                      data-aos-offset="0"
                    >
                      <a
                        href={item.href}
                        aria-label={item.title}
                        target="_blank"
                        rel="noreferrer"
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
          </div>
        </div>

        {/* ---------- CREDIT ---------- */}
        <div className="border-t border-slate-800 pt-4 text-center text-xs text-muted">
          <span>{t.footer.signature.made_with} </span>
          <Iconify icon="fa:heart" className="text-red-500 inline-block mx-1" />
          <span>{t.footer.signature.by} </span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.github.com/M7MD-abo-jacob/"
            className="text-accent hover:underline"
          >
            {t.footer.signature.name}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
