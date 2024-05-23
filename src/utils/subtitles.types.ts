type Subtitle = {
  index: string;
  timestamp: string;
  start: string;
  end: string;
  text: string;
};

type Subtitles = Subtitle[];

type NormalizedSubtitleObj = Subtitle & {
  startSeconds: number;
  endSeconds: number;
  startMillseconds: number;
  endMilliseconds: number;
};

export type { Subtitle, Subtitles, NormalizedSubtitleObj };
