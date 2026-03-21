import Link from 'next/link';
import Image from 'next/image';
import Iconify from '@/components/shared/Iconify';
import { getDictionary, Locale } from '../dictionaries';
import { FilesSrc, ImagesSrc } from '@/data/files';

function renderWithSpan(template: string) {
  const parts = template.split('{span}');
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

const HEX_CLIP_PATH =
  'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';

const About = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary?.about;

  return (
    <section
      id="about"
      className="py-16 text-primary"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="">
          <div className="flex flex-col gap-10 md:flex-row">
            {/* LEFT: IMAGE */}
            <div className="flex-1 md:max-w-sm md:self-center">
              {/* Fixed-size hex image (outside glow/border + inside zoom animation) */}
              <div
                className="relative mx-auto h-64 w-80"
                aria-hidden="true"
              >
                {/* Outside frame: strong color + border + glow */}
                <div
                  className="absolute inset-0 border-2 border-accent/90 bg-linear-to-br from-accent/45 via-accent-soft/20 to-slate-900/0 dark:from-accent-soft/45 dark:via-accent-soft/15 about-hex-glow"
                  style={{ clipPath: HEX_CLIP_PATH }}
                />

                {/* Inner mask: clip so the image stays inside, and allow zooming */}
                <div
                  className="absolute inset-[2px] overflow-hidden z-10 bg-slate-50/10 dark:bg-slate-950/15"
                  style={{ clipPath: HEX_CLIP_PATH }}
                >
                  <div className="h-full w-full about-hex-image-zoom">
                    <Image
                      src={ImagesSrc.laptop}
                      alt={dictionary.common.metadata.author}
                      width={420}
                      height={420}
                      draggable={false}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: TEXT */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {renderWithSpan(t?.section_title)}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  <Iconify
                    icon="fa:mouse-pointer"
                    className="me-2 inline-block text-accent"
                  />
                  {t?.subtitle}
                </p>
              </div>

              <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
                {t?.subtext}
              </p>

              <Link
                href={FilesSrc.resumePath}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-accent transition hover:brightness-110"
              >
                <span>{t?.resume}</span>
                <Iconify icon="fa6-solid:download" className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
