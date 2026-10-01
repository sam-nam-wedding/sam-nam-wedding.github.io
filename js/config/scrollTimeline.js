/**
 * Scroll progress is 0–1 across the sticky intro.
 * Ranges overlap so pans, zooms, and crossfades stay continuous.
 */
export const scrollTimeline = {
  skyLine: [0.024, 0.142],
  skyToGopura: [0.024, 0.083],
  gopuraToDoor: [0.059, 0.145],
  doorFadeIn: [0.344, 0.438],
  hallwayAppear: [0.403, 0.498],
  doorToHallway: [0.462, 0.581],
  hallwayZoom: [0.51, 0.699],
  nameReveal: [0.638, 0.758],
  ruleReveal: [0.677, 0.774],
  subtitleReveal: [0.713, 0.792],
  holdName: [0.758, 0.86],
  nameFadeOut: [0.99, 1],
  blurToDark: [0.86, 0.93],
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
