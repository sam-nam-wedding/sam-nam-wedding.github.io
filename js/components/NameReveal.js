import { scrollTimeline } from "../config/scrollTimeline.js?v=inv11";
import { easeOutCubic, segmentProgress } from "../utils/interpolate.js";

export function NameReveal() {
  return {
    compute(progress) {
      const titleIn = easeOutCubic(
        segmentProgress(progress, ...scrollTimeline.nameReveal)
      );
      const ruleIn = easeOutCubic(
        segmentProgress(progress, ...scrollTimeline.ruleReveal)
      );
      const subtitleIn = easeOutCubic(
        segmentProgress(progress, ...scrollTimeline.subtitleReveal)
      );
      const exitT = easeOutCubic(
        segmentProgress(progress, ...scrollTimeline.nameFadeOut)
      );

      return {
        title: titleIn * (1 - exitT),
        rule: ruleIn * (1 - exitT),
        subtitle: subtitleIn * (1 - exitT),
      };
    },
  };
}
