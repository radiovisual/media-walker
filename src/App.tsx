import { useCallback, useState } from "react";

import "./App.css";

import { SubTitleNavigator } from "./components/subtitle-navigator";
import { NormalizedSubtitleObj } from "./utils/subtitles.types";

function App() {
  const [isLoadingSubtitles, setIsLoadingSubtitles] = useState(true);
  const [isProcessingSubtitles, setIsProcessingSubtitles] = useState(true);
  const [subtitles, setSubtitles] = useState<NormalizedSubtitleObj[]>();

  const getLoadingMessage = useCallback(() => {
    if (isLoadingSubtitles) {
      return "Loading subtitles...";
    }
    if (isProcessingSubtitles) {
      return "Processing subtitles...";
    }
    return "";
  }, [isLoadingSubtitles, isProcessingSubtitles]);

  const dispatchCommand = async (cmd: string) => {
    await window.electronAPI.sendVLCCommand(cmd);
  };

  const processSubtitles = async (event: React.ChangeEvent) => {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const file = input.files[0];
      const { name, path } = file;

      setIsLoadingSubtitles(false);
      setIsProcessingSubtitles(true);

      const subs = await window.electronAPI.getObjFromSubtitleFile(
        JSON.stringify({ name, path })
      );

      setIsProcessingSubtitles(false);
      setSubtitles(subs);
    }
  };

  const onSubtitleClick = async (subtitle: NormalizedSubtitleObj) => {
    await window.electronAPI.sendVLCCommand(`seek ${subtitle.startSeconds}`);
  };

  return (
    <div className="App">
      <div className="">
        <button id="play-btn" onClick={() => dispatchCommand("play")}>
          Play
        </button>
        <button id="pause-btn" onClick={() => dispatchCommand("pause")}>
          Pause
        </button>
        <button id="vol-down" onClick={() => dispatchCommand("volume-down")}>
          Vol -
        </button>
        <button id="vol-up" onClick={() => dispatchCommand("volume-up")}>
          Vol +
        </button>
        <button id="speed-down" onClick={() => dispatchCommand("speed-down")}>
          Speed .5
        </button>
        <button
          id="speed-normal"
          onClick={() => dispatchCommand("speed-normal")}
        >
          Speed 1
        </button>
        <button id="speed-up" onClick={() => dispatchCommand("speed-up")}>
          Speed 1.5
        </button>
      </div>

      <div id="subtitles">
        <div id="subtitles-wrapper">
          {isLoadingSubtitles || isProcessingSubtitles
            ? getLoadingMessage()
            : ""}

          <SubTitleNavigator
            onSubtitleFileSelect={processSubtitles}
            subtitles={subtitles}
            onSubtitleClick={onSubtitleClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
