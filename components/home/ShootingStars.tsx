'use client';

import React, { useEffect, useRef, useState } from 'react';
import { randomInt } from '@/lib/getRandomInt';
import styles from '@/app/styles/shootingStars.module.css';

export default function ShootingStars() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const starsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // get the width and height of the element
    // to display the stars in the right place and amount
    // too many stars cause mobile phones to lag!!
    if (starsRef?.current) {
      setWidth(starsRef?.current?.offsetWidth);
      setHeight(starsRef?.current?.offsetHeight);
    }
  }, [starsRef.current]);

  return (
    <div className={styles.stars} ref={starsRef}>
      {Array.from({ length: width / 100 }, (_, i) => i + 1).map((star) => {
        const starStyles: React.CSSProperties & { [key: string]: string } = {
          '--posx': `${randomInt(0, width - 100)}px`,
          '--posy': `${randomInt(0, height - 70)}px`,
          '--speed': `${randomInt(2, 4)}s`,
          '--delay': `${randomInt(1, 3)}s`,
        };
        return <span key={star} className={styles.star} style={starStyles} />;
      })}
    </div>
  );
}
