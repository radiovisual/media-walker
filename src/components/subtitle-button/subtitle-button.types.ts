import { NormalizedSubtitleObj } from "@/utils/subtitles.types";

type SubtitleButtonProps = {
  subtitle: NormalizedSubtitleObj;
  onSubtitleClick: (subtitle: NormalizedSubtitleObj) => void;
};

export type { SubtitleButtonProps };
