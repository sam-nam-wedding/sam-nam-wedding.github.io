/**
 * Scroll progress is 0–1 across the sticky intro (500vh of scroll, 600vh tall).
 * One viewport is 0.2 of progress. The invitation page follows SAM-NAM.
 */
export const scrollTimeline = {
  skyLine: [0.004, 0.12],
  skyToGopura: [0.004, 0.11],
  gopuraToDoor: [0.05, 0.26],
  doorFadeIn: [0.12, 0.28],
  hallwayAppear: [0.34, 0.5],
  doorToHallway: [0.34, 0.5],
  hallwayZoom: [0.42, 0.64],
  nameReveal: [0.64, 0.755],
  ruleReveal: [0.678, 0.794],
  subtitleReveal: [0.717, 0.832],
  holdName: [0.755, 0.8],
  nameFadeOut: [0.8, 0.89],
  blurToDark: [1.01, 1.02],
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
