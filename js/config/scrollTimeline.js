/**
 * Scroll progress is 0–1 across the sticky intro.
 * Ranges overlap so pans, zooms, and crossfades stay continuous.
 */
export const scrollTimeline = {
  skyLine: [0.12, 0.288],
  skyToGopura: [0.048, 0.408],
  gopuraToDoor: [0.36, 0.648],
  doorFadeIn: [0.504, 0.66],
  hallwayAppear: [0.576, 0.696],
  doorToHallway: [0.648, 0.792],
  hallwayZoom: [0.696, 0.91],
  nameReveal: [0.86, 0.905],
  ruleReveal: [0.875, 0.915],
  subtitleReveal: [0.89, 0.925],
  holdName: [0.925, 0.938],
  nameFadeOut: [0.938, 0.955],
  hallwayFadeOut: [0.942, 0.97],
  exitIntro: [0.948, 0.99],
};

export const motion = {
  gopuraTop: { from: 32, mid: -18, door: -125 },
  templeScale: { from: 1, to: 1.16 },
  skyScale: { from: 1.04, to: 1.1 },
  skyShift: -7,
  doorScale: { from: 1, to: 1.08 },
  hallwayScale: { from: 1.02, to: 1.22 },
};
