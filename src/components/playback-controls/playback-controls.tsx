import { PlayBackControlsProps } from "./playback-controls.types";

function PlayBackControls(props: PlayBackControlsProps) {
  const { dispatchCommand } = props;

  return (
    <div className="mt-auto playback-controls">
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
      <button id="speed-normal" onClick={() => dispatchCommand("speed-normal")}>
        Speed 1
      </button>
      <button id="speed-up" onClick={() => dispatchCommand("speed-up")}>
        Speed 1.5
      </button>
    </div>
  );
}

export { PlayBackControls };
