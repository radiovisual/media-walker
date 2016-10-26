# Media Walker

> Use a video's subtitles as a remote control for the VLC Media Player

 This app will render a simple interface allowing you to use a video's subtitle
 file as a way of navigating and controlling playback of a video in the VLC Media Player, utilizing VLC's telnet interface. It was built as a language-learning
 tool for those who like to use movies as a way to study languages.

:boom: *NOTE:* **This is very much a work in progress!** :boom:

# TODO

- [ ] Style the UI
- [ ] Load the movies and subs via the UI
- [ ] Cleanup the codebase
- [ ] Auto-scrolling subtitle list to sync with video playback
- [ ] Search the subtitles
- [ ] Open DVDs
- [ ] Easy lookup of words on Google Translate
- [ ] Plugins that allow different type of word lookup (APIs, etc)
- [ ] Wordbank to store translation of words
- [ ] Internationalized UI
- [ ] Turn on/off the subtitle track on VLC (not sure this is possible with telnet interface)
- [ ] When scrolling the subtitles, the video will seek "in sync" with scrolling.

# Install

Until this module reaches `v1.0.0`, you must clone this repo to use the app.
```
$ npm install -g electron
$ git clone https://github.com/radiovisual/media-walker.git
$ cd media-walker
$ npm install
```

# Usage

**Step One:** Launch your video file along with VLC's Telnet interface from your **terminal** application.
```
$ <path_to_vlc> --extraintf telnet --telnet-password mediawalker file://<path_to_file>
```

Where `<path_to_vlc>` could be any use of these three default locations (if VLC is not on your system PATH):

- **MacOS**: `/Applications/VLC.app/Contents/MacOS/VLC`
- **Windows**: `C:\Program Files (x86)\VideoLAN\VLC\vlc.exe`
- **Linux**: `/usr/bin/vlc`

**Step Two:** In a new terminal window (seperate from the one used in step one), browse to your cloned media-walker repo and launch mediawalker with your subtitle file for the video file you just launched.
```
$ electron main.js --subs=<path_to_srt_file>
```

# Example Setup

Here is an example of launching the movie **inception.mp4** using the subtitle file called **inception.srt**. Each command is launched in a *seperate terminal window*:

```
/Applications/VLC.app/Contents/MacOS/VLC --extraintf telnet --telnet-password mediawalker file://inception.mp4
/Applications/VLC.app/Contents/MacOS/VLC --extraintf telnet --telnet-password mediawalker file://inception-subs.srt
```

# License

MIT @ [Michael Wuergler](https://numetriclabs.com)
