import { spawn } from "child_process";

export default class VLCTelnet {
  private telnetInstance;

  private VLC_TELNET_COMMAND = {
    play: "play",
    pause: "pause",
    volumeUp: "volup 1",
    volumeDown: "voldown 1",
    speedDown: "rate .5",
    speedNormal: "rate 1",
    speedUp: "rate 1.5",
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
