import srtToObj from "srt-to-obj";
import seconds from "timestamp-to-seconds";
import milliseconds from "timestamp-to-milliseconds";

import { NormalizedSubtitleObj, Subtitles } from "./subtitles.types";

async function convertSubtitleFileToObject(
  fileName: string,
  filePath: string
): Promise<NormalizedSubtitleObj[] | null> {
  if (!filePath || !filePath.endsWith(".srt")) {
    throw new TypeError(
      `Only .srt subtitle files are supported at the moment, got ${fileName}`
    );
  }

  let subtitlesObject: Subtitles;

  const normalizedSubs: NormalizedSubtitleObj[] = [];

  try {
    subtitlesObject = await srtToObj(filePath);
    subtitlesObject.forEach((sub) => {
      if (sub) {
        const timestamp = sub.timestamp;
        const startSeconds = seconds(sub.start);
        const endSeconds = seconds(sub.end);
        const startMillseconds = milliseconds(sub.start);
        const endMilliseconds = milliseconds(sub.end);

        normalizedSubs.push({
          ...sub,
          timestamp,
          startSeconds,
          endSeconds,
          startMillseconds,
          endMilliseconds,
        });
      }
    });

    return normalizedSubs;
  } catch (err: unknown) {
    console.error("Error while attempting to process subtitle file", err);
  }

  return null;
}

export { convertSubtitleFileToObject };
