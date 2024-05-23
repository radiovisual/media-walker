#!/bin/bash

# Generate a video with ffmpeg
ffmpeg -y \
-f lavfi -i color=c=black:s=640x480:d=5 \
-f lavfi -i color=c=blue:s=640x480:d=10 \
-f lavfi -i color=c=red:s=640x480:d=10 \
-f lavfi -i color=c=green:s=640x480:d=10 \
-f lavfi -i color=c=yellow:s=640x480:d=10 \
-f lavfi -i color=c=black:s=640x480:d=5 \
-filter_complex "[0:v]drawtext=fontfile=/path/to/font.ttf:text='Hallo, lasst uns einige Farben auf Deutsch lernen':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2[v0]; \
[1:v]drawtext=fontfile=/path/to/font.ttf:text='Diese Farbe ist Blau':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2[v1]; \
[2:v]drawtext=fontfile=/path/to/font.ttf:text='Diese Farbe ist Rot':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2[v2]; \
[3:v]drawtext=fontfile=/path/to/font.ttf:text='Diese Farbe ist Grün':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2[v3]; \
[4:v]drawtext=fontfile=/path/to/font.ttf:text='Diese Farbe ist Gelb':fontcolor=black:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2[v4]; \
[5:v]drawtext=fontfile=/path/to/font.ttf:text='Auf Wiedersehen':fontcolor=white:fontsize=24:x=(w-text_w)/2:y=(h-text_h)/2[v5]; \
[v0][v1][v2][v3][v4][v5]concat=n=6:v=1[outv]" \
-map "[outv]" sample.mp4

# Create a simple SRT subtitle file in German
cat <<EOT > sample_de.srt
1
00:00:00,000 --> 00:00:04,500
Hallo, lasst uns einige Farben auf Deutsch lernen

2
00:00:05,000 --> 00:00:14,500
Diese Farbe ist Blau

3
00:00:15,000 --> 00:00:24,500
Diese Farbe ist Rot

4
00:00:25,000 --> 00:00:34,500
Diese Farbe ist Grün

5
00:00:35,000 --> 00:00:44,500
Diese Farbe ist Gelb

6
00:00:45,000 --> 00:00:49,500
Auf Wiedersehen
EOT

# Create a simple SRT subtitle file in English
cat <<EOT > sample_en.srt
1
00:00:00,000 --> 00:00:04,500
Hello, let's study some colors in German

2
00:00:05,000 --> 00:00:14,500
This color is blue

3
00:00:15,000 --> 00:00:24,500
This color is red

4
00:00:25,000 --> 00:00:34,500
This color is green

5
00:00:35,000 --> 00:00:44,500
This color is yellow

6
00:00:45,000 --> 00:00:49,500
Goodbye
EOT

