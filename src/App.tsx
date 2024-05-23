import { useCallback, useState } from "react";
import pkg from "../package.json";

import "./App.css";

import { SubTitleNavigator } from "./components/subtitle-navigator";
import { NormalizedSubtitleObj } from "./utils/subtitles.types";
import { PlayBackControls } from "./components/playback-controls";

function App() {
  const [subtitles, setSubtitles] = useState<NormalizedSubtitleObj[]>();

  const dispatchCommand = async (cmd: string) => {
    await window.electronAPI.sendVLCCommand(cmd);
  };

  const processSubtitles = async (event: React.ChangeEvent) => {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const file = input.files[0];
      const { name, path } = file;

      const subs = await window.electronAPI.getObjFromSubtitleFile(
        JSON.stringify({ name, path })
      );

      setSubtitles(subs);
    }
  };

  const onSubtitleClick = async (subtitle: NormalizedSubtitleObj) => {
    await window.electronAPI.sendVLCCommand(`seek ${subtitle.startSeconds}`);
  };

  const clearSubtitles = useCallback(() => {
    setSubtitles(undefined);
  }, [subtitles]);

  return (
    <div className="w-full flex flex-col h-full">
      <nav className="grow-0 h-14 bg-black sticky top-0 left-0 text-sm justify-between flex flex-row">
        <h1>Mediawalker v{pkg.version}</h1>
        <div>
          {subtitles && (
            <button className="" onClick={clearSubtitles}>
              Remove subtitles
            </button>
          )}
        </div>
      </nav>

      <main className="subtitles grow overflow-hidden">
        <div
          className=" rounded-lg overflow-y-scroll"
          style={{ maxHeight: "600px" }}
        >
          <div className="overflow-auto h-full">
            <SubTitleNavigator
              onSubtitleFileSelect={processSubtitles}
              subtitles={subtitles}
              onSubtitleClick={onSubtitleClick}
            />
          </div>
        </div>
      </main>

      <footer className="grow-0 h-14 control-panel sticky bottom-0 left-0">
        <div className="mt-auto">
          <PlayBackControls dispatchCommand={dispatchCommand} />
        </div>
      </footer>
    </div>
  );
}

export default App;
