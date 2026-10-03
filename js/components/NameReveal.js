import { scrollTimeline } from "../config/scrollTimeline.js?v=inv69";
import { easeInOutCubic, segmentProgress } from "../utils/interpolate.js";

export function NameReveal() {
  return {
    compute(progress) {
      const titleIn = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.nameReveal)
      );
      const ruleIn = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.ruleReveal)
      );
      const subtitleIn = easeInOutCubic(
        segmentProgress(progress, ...scrollTimeline.subtitleReveal)
      );
      const exitT = easeInOutCubic(
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
