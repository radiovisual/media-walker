import { spawn } from "child_process";

/*
| add XYZ  . . . . . . . . . . . . . . . . . . . . add XYZ to playlist
| enqueue XYZ  . . . . . . . . . . . . . . . . . queue XYZ to playlist
| playlist . . . . . . . . . . . . .  show items currently in playlist
| search [string]  . .  search for items in playlist (or reset search)
| delete [X] . . . . . . . . . . . . . . . . delete item X in playlist
| move [X][Y]  . . . . . . . . . . . . move item X in playlist after Y
| sort key . . . . . . . . . . . . . . . . . . . . . sort the playlist
| sd [sd]  . . . . . . . . . . . . . show services discovery or toggle
| play . . . . . . . . . . . . . . . . . . . . . . . . . . play stream
| stop . . . . . . . . . . . . . . . . . . . . . . . . . . stop stream
| next . . . . . . . . . . . . . . . . . . . . . .  next playlist item
| prev . . . . . . . . . . . . . . . . . . . .  previous playlist item
| goto, gotoitem . . . . . . . . . . . . . . . . .  goto item at index
| repeat [on|off]  . . . . . . . . . . . . . .  toggle playlist repeat
| loop [on|off]  . . . . . . . . . . . . . . . .  toggle playlist loop
| random [on|off]  . . . . . . . . . . . . . .  toggle playlist random
| clear  . . . . . . . . . . . . . . . . . . . . .  clear the playlist
| status . . . . . . . . . . . . . . . . . . . current playlist status
| title [X]  . . . . . . . . . . . . . . set/get title in current item
| title_n  . . . . . . . . . . . . . . . .  next title in current item
| title_p  . . . . . . . . . . . . . .  previous title in current item
| chapter [X]  . . . . . . . . . . . . set/get chapter in current item
| chapter_n  . . . . . . . . . . . . . .  next chapter in current item
| chapter_p  . . . . . . . . . . . .  previous chapter in current item
|
| seek X . . . . . . . . . . . seek in seconds, for instance `seek 12'
| pause  . . . . . . . . . . . . . . . . . . . . . . . .  toggle pause
| fastforward  . . . . . . . . . . . . . . . . . . set to maximum rate
| rewind . . . . . . . . . . . . . . . . . . . . . set to minimum rate
| faster . . . . . . . . . . . . . . . . . .  faster playing of stream
| slower . . . . . . . . . . . . . . . . . .  slower playing of stream
| normal . . . . . . . . . . . . . . . . . .  normal playing of stream
| rate [playback rate] . . . . . . . . . .  set playback rate to value
| frame  . . . . . . . . . . . . . . . . . . . . . play frame by frame
| fullscreen, f, F [on|off]  . . . . . . . . . . . . toggle fullscreen
| info [X] . .  information about the current stream (or specified id)
| stats  . . . . . . . . . . . . . . . .  show statistical information
| get_time . . . . . . . . .  seconds elapsed since stream's beginning
| is_playing . . . . . . . . . . . .  1 if a stream plays, 0 otherwise
| get_title  . . . . . . . . . . . . . the title of the current stream
| get_length . . . . . . . . . . . .  the length of the current stream
|
| volume [X] . . . . . . . . . . . . . . . . . .  set/get audio volume
| volup [X]  . . . . . . . . . . . . . . .  raise audio volume X steps
| voldown [X]  . . . . . . . . . . . . . .  lower audio volume X steps
| achan [X]  . . . . . . . . . . . .  set/get stereo audio output mode
| atrack [X] . . . . . . . . . . . . . . . . . . . set/get audio track
| vtrack [X] . . . . . . . . . . . . . . . . . . . set/get video track
| vratio [X] . . . . . . . . . . . . . . .  set/get video aspect ratio
| vcrop, crop [X]  . . . . . . . . . . . . . . . .  set/get video crop
| vzoom, zoom [X]  . . . . . . . . . . . . . . . .  set/get video zoom
| vdeinterlace [X] . . . . . . . . . . . . . set/get video deinterlace
| vdeinterlace_mode [X]  . . . . . . .  set/get video deinterlace mode
| snapshot . . . . . . . . . . . . . . . . . . . . take video snapshot
| strack [X] . . . . . . . . . . . . . . . . .  set/get subtitle track
|
| vlm  . . . . . . . . . . . . . . . . . . . . . . . . .  load the VLM
| description  . . . . . . . . . . . . . . . . .  describe this module
| help, ? [pattern]  . . . . . . . . . . . . . . . . .  a help message
| longhelp [pattern] . . . . . . . . . . . . . . a longer help message
| lock . . . . . . . . . . . . . . . . . . . .  lock the telnet prompt
| logout . . . . . . . . . . . . . .  exit (if in a socket connection)
| quit . . . . . . . .  quit VLC (or logout if in a socket connection)
| shutdown . . . . . . . . . . . . . . . . . . . . . . .  shutdown VLC
*/

export default class VLCTelnet {
  private telnetInstance;

  private VLC_TELNET_COMMAND = {
    play: "play",
    pause: "pause",
    volumeUp: "volup 2",
    volumeDown: "voldown 2",
    speedDown: "slower",
    speedNormal: "normal",
    speedUp: "faster",
    seek: (timestampToSeek: string) => `seek ${timestampToSeek}`,
  };

  public static VLC_COMMAND = {
    play: "play",
    pause: "pause",
    volumeUp: "volume-up",
    volumeDown: "volume-down",
    speedDown: "speed-down",
    speedNormal: "speed-normal",
    speedUp: "speed-up",
    seek: "seek",
  };

  constructor(port = 4212) {
    this.telnetInstance = spawn("telnet", ["localhost", String(port)]);

    this.telnetInstance.stdout.on("data", (data) => {
      if (data.indexOf("Password:") > -1) {
        this.telnetInstance.stdin.write("mediawalker\n");
      }
      console.log(`stdout: ${data}`);
    });

    this.telnetInstance.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });

    this.telnetInstance.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      this.telnetInstance.stdin.end();
    });
  }

  public processCommand(commandString: string) {
    const command = VLCTelnet.VLC_COMMAND;

    if (commandString.startsWith("seek")) {
      return this.seek(commandString);
    }

    switch (commandString) {
      case command.play:
        return this.play();
      case command.pause:
        return this.pause();
      case command.volumeDown:
        return this.volumeDown();
      case command.volumeUp:
        return this.volumeUp();
      case command.speedUp:
        return this.speedUp();
      case command.speedDown:
        return this.speedDown();
      case command.speedNormal:
        return this.speedNormal();
      default:
        console.log(`Unknown command: ${commandString}`);
    }
  }

  public shutDown() {
    this.telnetInstance.stdin.end();
  }

  public send(cmd: string) {
    this.telnetInstance.stdin.write(`${cmd}\n`);
  }

  public play() {
    this.send(this.VLC_TELNET_COMMAND.play);
  }

  public volumeDown() {
    this.send(this.VLC_TELNET_COMMAND.volumeDown);
  }

  public volumeUp() {
    this.send(this.VLC_TELNET_COMMAND.volumeUp);
  }

  public speedDown() {
    this.send(this.VLC_TELNET_COMMAND.speedDown);
  }

  public speedUp() {
    this.send(this.VLC_TELNET_COMMAND.speedUp);
  }

  public speedNormal() {
    this.send(this.VLC_TELNET_COMMAND.speedNormal);
  }

  public pause() {
    this.send(this.VLC_TELNET_COMMAND.pause);
  }

  public seek(timeToSeek: string | number) {
    let normalizedTime = timeToSeek;
    if (typeof timeToSeek === "string" && timeToSeek.startsWith("seek")) {
      normalizedTime = timeToSeek.substring(4).trim();
    }
    this.send(this.VLC_TELNET_COMMAND.seek(String(normalizedTime)));
  }
}
