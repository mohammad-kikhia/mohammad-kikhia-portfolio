import React from 'react';
import Image from 'next/image';
import Iconify from '@/components/shared/Iconify';
import { Trans } from '@/types';

type Props = {
  lang: 'ar' | 'en';
  project: {
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
  t: Trans['projects'];
};

export default function Project({ project, t, lang }: Props) {
  return (
    <li className="box tilt" data-aos="zoom-in-down">
      <picture>
        <source media="(min-width: 768px)" srcSet={project.imageLg} />
        <Image
          width={860}
          height={860}
          draggable={false}
          src={project.imageSm}
          alt={project.name_en}
        />
      </picture>
      <div className="content">
        <div className="tag">
          <h3>{project[`name_${lang}`] || project.name_en}</h3>
        </div>
        <div className="desc">
          <p>{project[`desc_${lang}`] || project.desc_en}</p>
          <div className="btns">
            <a
              href={project.links.visit}
              className="btn"
              target="_blank"
              rel="noreferrer">
              <Iconify icon="fa:eye" /> {t?.visit}
            </a>
            <a
              href={project.links.code}
              className="btn"
              target="_blank"
              rel="noreferrer">
              <Iconify icon="fa:code" /> {t?.code}
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
