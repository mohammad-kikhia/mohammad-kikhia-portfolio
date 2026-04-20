import Iconify from "@/components/shared/Iconify";
import { getDictionary } from "../dictionaries";

function renderWithSpan(template: string) {
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
        ),
      )}
    </>
  );
}

type ExperienceItem = {
  title: string;
  company: string;
  /** HTTPS company site from localized copy; rendered only if valid. */
  companyUrl?: string;
  employment: string;
  period: string;
  description: string;
  highlights?: string[];
};

function safeHttpsUrl(url: string | undefined) {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? u.href : undefined;
  } catch {
    return undefined;
  }
}

const Experience = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.experience;
  const items = (t?.items ?? []) as ExperienceItem[];

  return (
    <section id="experience" className="py-16 text-primary">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="space-y-3 pb-10" data-aos="fade-up" data-aos-delay="0">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {renderWithSpan(t.title)}
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            <Iconify
              icon="mdi:briefcase-outline"
              className="me-2 inline-block text-accent"
            />
            {t.subtitle}
          </p>
        </div>

        <ol className="relative ms-1 space-y-10 border-s border-accent/30 ps-4 md:ms-3 md:ps-10">
          {items.map((item, i) => {
            const companyHref = safeHttpsUrl(item.companyUrl);
            return (
              <li
                key={`${item.company}-${item.period}`}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={40 + i * 60}
              >
                <span
                  className="absolute -inset-s-[25px] top-7 h-4 w-4 rounded-full border-2 border-accent bg-background md:-inset-s-[50px] md:top-7 md:h-5 md:w-5"
                  aria-hidden
                />
                <article className="rounded-2xl border border-slate-300/40 bg-foreground/2 p-5 shadow-sm transition dark:border-slate-700/80 dark:bg-slate-950/40 md:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {item.title}
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        ·{" "}
                        {companyHref ? (
                          <a
                            href={companyHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex max-w-full items-center gap-1 rounded-md px-0.5 py-0.5 text-accent underline decoration-accent/70 underline-offset-[3px] transition hover:bg-accent/10 hover:decoration-accent"
                          >
                            <span className="truncate">{item.company}</span>
                            <Iconify
                              icon="tabler:external-link"
                              className="size-[1em] shrink-0 text-accent opacity-90"
                              aria-hidden
                            />
                          </a>
                        ) : (
                          item.company
                        )}
                      </span>
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {item.period}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted">
                    {item.employment}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                    {item.description}
                  </p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted">
                      {item.highlights.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
