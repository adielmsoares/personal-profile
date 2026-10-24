export const portrait = {
  basePath: '/images/portrait/adiel',
  widths: [384, 576, 768],
  width: 768,
  height: 960,
  sizes: '(min-width: 1280px) 440px, (min-width: 1024px) 36vw, (min-width: 640px) 420px, 88vw',
};

export function portraitSrcSet(format) {
  return portrait.widths.map((w) => `${portrait.basePath}-${w}.${format} ${w}w`).join(', ');
}
