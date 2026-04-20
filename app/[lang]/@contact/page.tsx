import Image from 'next/image';
import EmailForm from '@/components/contact/EmailForm';
import Iconify from '@/components/shared/Iconify';
import { socials } from '@/data/variables';
import { getDictionary } from '../dictionaries';
import { ImagesSrc } from '@/data/files';

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
        ),
      )}
    </>
  );
}

const Contact = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.contact;

  return (
    <section
      id="contact"
      className="contact py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="container overflow-hidden mx-auto">
          <div className="content flex flex-col gap-10 px-0 py-10 md:px-10 md:py-12 lg:flex-row lg:items-center">
            {/* LEFT: TEXT + SOCIALS */}
            <div
              className="flex-1 space-y-8"
              data-aos="fade-right"
              data-aos-delay="0"
            >
              <div className="space-y-3 pb-7">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {renderWithSpan(t.title)}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  <Iconify
                    icon="bx:support"
                    className="me-2 inline-block text-accent"
                  />
                  {t.subtitle}
                </p>
              </div>

              <p className="max-w-md text-sm text-muted md:text-[0.95rem]">
                {dictionary.common.metadata.description}
              </p>

              <div className="pt-4">
                <ul className="flex flex-wrap items-center gap-3">
                  {socials.map((item, i) => {
                    const socialLabel =
                      dictionary.common.contact_methods[
                        item.name as keyof typeof dictionary.common.contact_methods
                      ];
                    return (
                    <li
                      key={item.name}
                      data-aos="zoom-in"
                      data-aos-delay={i * 45}
                      data-aos-offset="20"
                    >
                      <a
                        href={item.href}
                        aria-label={socialLabel}
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
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* RIGHT: GLOWING FORM CARD */}
            <div
              className="flex-1"
              data-aos="fade-left"
              data-aos-delay="60"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 rounded-4xl blur-3xl" />
                <div className="relative rounded-4xl border border-accent p-4 pt-5 shadow-accent md:p-8 md:pt-8 overflow-hidden">
                  <Image
                    src={ImagesSrc.bgHex}
                    alt="Background"
                    width={1000}
                    height={1000}
                    draggable={false}
                    className="absolute top-0 left-0 w-full h-full z-[-1] object-cover opacity-20 contact-hero-bg"
                  />
                  <div className="mb-5 flex items-center justify-between text-sm font-medium text-primary">
                    <div className="flex items-center gap-3">
                      <Iconify icon="fa6-solid:headset" className="text-accent" />
                      <span>{dictionary.common.nav.contact}</span>
                    </div>
                  </div>
                  <EmailForm t={t} lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
