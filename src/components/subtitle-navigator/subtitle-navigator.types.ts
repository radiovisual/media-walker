import { NormalizedSubtitleObj } from "@/utils/subtitles.types";

type SubTitleNavigatorProps = {
  subtitles?: NormalizedSubtitleObj[];
  onSubtitleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => {};
  onSubtitleClick: (subtitle: NormalizedSubtitleObj) => void;
};

export type { SubTitleNavigatorProps };
