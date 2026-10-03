import { motion, scrollTimeline } from "../config/scrollTimeline.js?v=inv85";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  segmentProgress,
} from "../utils/interpolate.js";

export function TempleScene() {
  return {
    compute(progress) {
      const panT = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.skyToGopura)
      );
      const zoomT = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.gopuraToDoor)
      );
      const exitT = segmentProgress(progress, ...scrollTimeline.doorToHallway);

      const top = lerp(
        lerp(motion.gopuraTop.from, motion.gopuraTop.mid, panT),
        motion.gopuraTop.door,
        zoomT
      );
      const scale = lerp(motion.templeScale.from, motion.templeScale.to, zoomT);
      const skyShift = lerp(0, motion.skyShift, Math.max(panT, zoomT * 0.4));
      const skyScale = lerp(motion.skyScale.from, motion.skyScale.to, panT);
      const opacity = 1 - easeOutCubic(exitT);

      return { top, scale, skyShift, skyScale, opacity };
    },
  };
}
