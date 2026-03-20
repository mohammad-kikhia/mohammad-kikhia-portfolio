import Image from 'next/image';
import { skills } from '@/data/skills';
import Iconify from '@/components/shared/Iconify';
import { getDictionary, Locale } from '../dictionaries';
import './skills-hex.css';
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
        )
      )}
    </>
  );
}

const Skills = async ({ params }: { params: { lang: Locale } }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const t = dictionary.skills;

  return (
    <section
      id="skills"
      className="py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {renderWithSpan(t.title)}
          </h2>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            <Iconify
              icon="fa:mouse-pointer"
              className="me-2 inline-block text-accent"
            />
            {t.subtitle}
          </p>
        </div> */}

        <div className="mt-8 flex flex-col gap-10 md:mt-12 md:flex-row md:items-start md:justify-between">
          {/* ===== SKILLS DESCRIPTION ===== */}
          <div className="md:w-5/12">
            <div className="space-y-3 pb-7">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {renderWithSpan(t.title)}
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                <Iconify
                  icon="fa:mouse-pointer"
                  className="me-2 inline-block text-accent"
                />
                {t.subtitle}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground mt-10">
              {t.intro}
            </p>
            {t.highlights && Array.isArray(t.highlights) && (
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {t.highlights.map((item: string) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* ===== SKILLS HEX GRID ===== */}
          <div className="mt-4 flex justify-center md:mt-0 md:w-6/12 relative">
            <Image
              src={ImagesSrc.bgStars}
              alt="Background"
              width={1000}
              height={1000}
              draggable={false}
              className="absolute top-0 left-0 w-full h-full z-[-1] object-cover opacity-30 mix-blend-lighten"
            />
            <ul id="skillsHexGrid">
              {skills.map((skill) => (
                <li key={skill.name} className="skill-hex">
                  <div className="skill-hex-inner">
                    <div className="skill-hex-content">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={32}
                        height={32}
                        draggable={false}
                        className="object-contain"
                      />
                      <span className="skill-hex-label">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
