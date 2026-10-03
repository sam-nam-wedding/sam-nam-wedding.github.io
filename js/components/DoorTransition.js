import { motion, scrollTimeline } from "../config/scrollTimeline.js?v=inv69";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  segmentProgress,
} from "../utils/interpolate.js";

export function DoorTransition() {
  return {
    compute(progress) {
      const fadeIn = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.doorFadeIn)
      );
      const fadeOut = easeOutCubic(
        segmentProgress(progress, ...scrollTimeline.doorToHallway)
      );
      const zoomT = easeInOutCubic(
        segmentProgress(
          progress,
          scrollTimeline.doorFadeIn[0],
          scrollTimeline.doorToHallway[1]
        )
      );

      return {
        opacity: fadeIn * (1 - fadeOut),
        scale: lerp(motion.doorScale.from, motion.doorScale.to, zoomT),
      };
    },
  };
}
