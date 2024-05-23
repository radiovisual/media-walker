import { useCallback } from "react";
import { SubTitleNavigatorProps } from "./subtitle-navigator.types";
import { NormalizedSubtitleObj } from "@/utils/subtitles.types";
import { SubTitlePicker } from "./subtitle-picker";
import { SubTitleButton } from "../subtitle-button";

function SubTitleNavigator(props: SubTitleNavigatorProps) {
  const { onSubtitleFileSelect, subtitles, onSubtitleClick } = props;

  const onSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("hi!");
      onSubtitleFileSelect(event);
    },
    [onSubtitleFileSelect]
  );

  const handleSubtitleClick = useCallback(
    (subtitle: NormalizedSubtitleObj) => {
      console.log("subtitle clicked", subtitle);
      onSubtitleClick(subtitle);
    },
    [onSubtitleClick]
  );

  return (
    <div className="subtitle-navigator h-full p-y-3">
      {!subtitles ? (
        <SubTitlePicker onSubtitleFileSelect={onSelectFile} />
      ) : (
        <div className="h-full overflow-auto">
          <ul role="list" className="">
            {subtitles.map((subtitle) => {
              const { index } = subtitle;

              return (
                <li key={index} className="p-1">
                  <SubTitleButton
                    subtitle={subtitle}
                    onSubtitleClick={handleSubtitleClick}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export { SubTitleNavigator };
