# Media Walker

> Use a video's subtitles as a remote control for the VLC Media Player. Great for language learning!

:boom: **This is very much a work in progress!** :boom:

# TODO

- [ ] Style the UI
- [ ] Load dual-language subtitles
- [ ] Bundle the app for distribution in app stores
- [ ] Load the movies and subs via the UI
- [ ] Loop video playback around a specific subtitle (or group of subtitles)
- [ ] Cleanup the codebase
- [ ] Find the subtitle files automatically
- [ ] Auto-scrolling subtitle list to sync with video playback
- [ ] Search the subtitles
- [ ] Open DVDs
- [ ] Easy lookup of words on Google Translate, DeepL, etc
- [ ] Plugins that allow different type of word lookup (APIs, etc)
- [ ] Wordbank to store translation of words
- [ ] Create a quizlet of unique words used in the subtitles
- [ ] Internationalized UI
- [ ] Turn on/off the subtitle track on VLC
- [ ] Dynamically change the subtitle track
- [ ] e2e tests in playwright
- [ ] Improve the telnet interface with auto-discovery/re-connect of telnet connection

# Install

Until this application is bundled for distribution, you must clone this repo to use the app.

```
$ npm install -g electron
$ git clone https://github.com/radiovisual/media-walker.git
$ cd media-walker
$ npm install
```

# Usage

**Step One:** Launch your video file along with VLC's Telnet interface from your **terminal** application.

```
$ vlc --extraintf telnet --telnet-password mediawalker <path_to_file>
```

Note, if the `vlc` command is not on your system path, then you can also use the full path to your VLC installation, for example:

- **MacOS**: `/Applications/VLC.app/Contents/MacOS/VLC`
- **Windows**: `C:\Program Files (x86)\VideoLAN\VLC\vlc.exe`
- **Linux**: `/usr/bin/vlc`

**Step Two:** In a new terminal window, launch media-walker:

```
$ npm run start
```

# Example Setup

Here is an example of launching the movie **sample.mp4** using the subtitle file called **sample.srt**. Each command is launched in a _seperate terminal window_:

```
vlc --extraintf telnet --telnet-password mediawalker sample-media/sample.mp4
```

```
npm run start
```

:bulb: For a quick demo you can use the files: sample-media/sample.mp4 and sample-media/sample.srt in this repo.

# Sample Video with Subtitles

There is a test video file along with sample subtitle files in the sample-media folder. These files were auto-generated with the code you can find in the sample-media/generate-video.sh file.

:nerd_face: If you want to try and create your own test video and subtitles (to test certain features of media-walker, etc), feel free to modify the [ffmpeg](https://ffmpeg.org/) code in the file and run it via:

```bash
./sample-media/generate-video.sh
```

Pull requests are welcome if you want to make updates to the sample.mp4 file or the subtitles, but only pull requests that make justified changes will be accepted (for example, if the change is relevant to demonstrating a media-walker feature, or working around a known bug, etc).

# License

MIT @ [Michael Wuergler](https://github.com/radiovisual)
