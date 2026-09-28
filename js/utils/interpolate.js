export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from, to, t) {
  return from + (to - from) * t;
}

export function segmentProgress(progress, start, end) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp((progress - start) / (end - start), 0, 1);
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function easeInCubic(t) {
  return t * t * t;
}
