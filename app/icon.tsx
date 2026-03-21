import { ImageResponse } from 'next/og';
import { cookies } from 'next/headers';

// Matches app/globals.css theme tokens
const ACCENT_LIGHT = '#2563eb';
const ACCENT_DARK = '#ef4444';
const BG_LIGHT = '#f9fafb';
const BG_DARK = '#020617';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const isDark = themeCookie === 'dark';

  const accent = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const background = isDark ? BG_DARK : BG_LIGHT;


  const fontCss = await fetch(
    'https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap'
  ).then(res => res.text());
  const fontUrl = fontCss.match(/src: url\((.+?)\)/)?.[1];
  let fontData: ArrayBuffer | undefined;

  if (fontUrl) {
    const res = await fetch(fontUrl);
    if (res.ok) {
      fontData = await res.arrayBuffer();
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background,
          color: accent,
          fontSize: 22,
          fontWeight: 400,
          fontFamily: fontData ? 'Rubik Wet Paint' : 'system-ui, sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        M
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
          fonts: [
            {
              name: 'Rubik Wet Paint',
              data: fontData,
              style: 'normal' as const,
              weight: 400,
            },
          ],
        }
        : {}),
    },
  );
}
