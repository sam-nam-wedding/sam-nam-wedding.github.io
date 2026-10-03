import { motion, scrollTimeline } from "../config/scrollTimeline.js?v=inv76";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  segmentProgress,
} from "../utils/interpolate.js";

export function HallwayReveal() {
  return {
    compute(progress) {
      const appear = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.hallwayAppear)
      );
      const zoomT = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.hallwayZoom)
      );
      const exitT = easeOutCubic(
        segmentProgress(progress, ...scrollTimeline.hallwayFadeOut)
      );

      return {
        opacity: appear * (1 - exitT),
        scale: lerp(motion.hallwayScale.from, motion.hallwayScale.to, zoomT),
      };
    },
  };
}
