import Image from 'next/image';
import EmailForm from '@/components/contact/EmailForm';
import Iconify from '@/components/shared/Iconify';
import { socials } from '@/data/variables';
import { getDictionary, Locale } from '../dictionaries';
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

const Contact = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.contact;

  return (
    <section
      id="contact"
      className="contact py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="container overflow-hidden ">
          <div className="content flex flex-col gap-10 px-6 py-10 md:px-10 md:py-12 lg:flex-row lg:items-center">
            {/* LEFT: TEXT + SOCIALS */}
            <div className="flex-1 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  {dictionary.common.nav.contact}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {renderWithSpan(t.title)}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  <Iconify
                    icon="fa:mouse-pointer"
                    className="me-2 inline-block text-accent"
                  />
                  {dictionary.hero.connect}
                </p>
              </div>

              <p className="max-w-md text-sm text-muted md:text-[0.95rem]">
                {dictionary.common.metadata.description}
              </p>

              <div className="pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  {dictionary.common.contact_methods.email}
                </p>
                <ul className="flex flex-wrap items-center gap-4">
                  {socials.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        aria-label={item.title}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-on-accent shadow-accent transition hover:brightness-110"
                      >
                        <Iconify icon={item.icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: GLOWING FORM CARD */}
            <div className="flex-1">
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 rounded-4xl blur-3xl" />
                <div className="relative rounded-4xl border border-accent p-6 shadow-accent md:p-8 overflow-hidden">
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
