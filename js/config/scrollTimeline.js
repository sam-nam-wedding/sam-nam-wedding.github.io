/**
 * Scroll progress is 0–1 across the sticky intro (640vh of scroll, 740vh tall).
 * One viewport is ~0.156 of progress. Every beat is one scroll, except SAM-NAM,
 * which eases in and then holds for about two scrolls before the blur.
 */
export const scrollTimeline = {
  skyLine: [0.02, 0.172],
  skyToGopura: [0.02, 0.096],
  gopuraToDoor: [0.065, 0.176],
  doorFadeIn: [0.176, 0.25],
  hallwayAppear: [0.34, 0.43],
  doorToHallway: [0.34, 0.43],
  hallwayZoom: [0.36, 0.5],
  nameReveal: [0.5, 0.59],
  ruleReveal: [0.53, 0.62],
  subtitleReveal: [0.56, 0.65],
  holdName: [0.59, 0.843],
  nameFadeOut: [0.99, 1],
  blurToDark: [0.843, 0.93],
  hallwayFadeOut: [1.01, 1.02],
  exitIntro: [1, 1],
};

export const motion = {
  gopuraTop: { from: 32, mid: -18, door: -125 },
  templeScale: { from: 1, to: 1.16 },
  skyScale: { from: 1.04, to: 1.1 },
  skyShift: -7,
  doorScale: { from: 1, to: 1.08 },
  hallwayScale: { from: 1.02, to: 1.22 },
};
