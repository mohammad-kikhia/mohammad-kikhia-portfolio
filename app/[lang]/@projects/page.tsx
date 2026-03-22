import Iconify from '@/components/shared/Iconify';
import { getDictionary, Locale } from '../dictionaries';
import { projects } from '@/data/projects';
import { ProjectsCarousel } from '@/components/projects/ProjectsCarousel';

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

const Work = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.projects;
  const currentLang: 'en' | 'ar' = lang === 'ar' ? 'ar' : 'en';

  return (
    <section
      id="projects"
      className="py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6 overflow-hidden">
        {/* <div className="border rounded-2xl border-accent shadow-accent px-6 py-10 md:px-10 md:py-12"> */}
        <div className="">
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* LEFT: HEADING + CAROUSEL */}
            <div className="flex-1 space-y-6">
              <div
                className="space-y-3 pb-7"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {renderWithSpan(t.title)}
                </h2>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  <Iconify
                    icon="eos-icons:application-outlined"
                    className="me-2 inline-block text-accent"
                  />
                  {t.subtitle}
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="70"
              >
                <ProjectsCarousel projects={projects} t={t} lang={currentLang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
