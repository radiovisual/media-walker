'use strict';

const ipc = require('electron').ipcRenderer;
const $ = require('jquery');
const srtToObj = require('srt-to-obj');
const utils = require('./src/utils');
const seconds = require('timestamp-to-seconds');
const milliseconds = require('timestamp-to-milliseconds');
const path = require('path');
const {dialog} = require('electron').remote;
const telnet = require('./telnet');

console.log('dialog', dialog);

window.setupPage = function() {
  console.log('setting up index.html page');

  $('#play-btn').click(e => {
      ipc.send('play');
  });

  $('#pause-btn').click(e => {
      ipc.send('pause');
  });

  $('#vol-up').click(e => {
      ipc.send('volume-up');
  });

  $('#vol-down').click(e => {
      ipc.send('volume-down');
  });

  $('#speed-down').click(e => {
      ipc.send('speed-down');
  });

  $('#speed-normal').click(e => {
      ipc.send('speed-normal');
  });

  $('#speed-up').click(e => {
      ipc.send('speed-up');
  });

  loadSubtites();
};


function loadSubtites() {
  renderSubtitles().then(subtitleMarkup => {
    $('#subtitles-wrapper').html(subtitleMarkup);

    const subtitles = document.querySelectorAll('.subtitle');

    [].forEach.call(subtitles, item => {
      const start = parseInt(item.getAttributeNode('data-start').value, 10);
      const startMs = parseInt(item.getAttributeNode('data-start-ms').value, 10);

      item.addEventListener('click', () => {
        ipc.send('seek', { start, startMs });
      });
    });
  });
}

function renderSubtitles() {
  var s = '';
  const subtitlePath = utils.readSettings('subs');

  return new Promise(resolve => {
    srtToObj(path.resolve(subtitlePath)).then(subs => {
      subs.forEach((sub, index) => {
        if (sub) {
          const index = sub.index;
          const timestamp = sub.timestamp;
          const start = sub.start;
          const end = sub.end;
          const startSeconds = seconds(sub.start);
          const endSeconds = seconds(sub.end);
          const startMillseconds = milliseconds(sub.start);
          const endMilliseconds = milliseconds(sub.end);
          const text = sub.text.replace('\n', '<br/>');

          s += `<div class="subtitle" data-start="${startSeconds}" data-end="${endSeconds}" data-start-ms="${startMillseconds}" data-end=ms="${endMilliseconds}"><p>${text}</p><small>${timestamp}</small></div>`;
        } else {
          console.log('unknown sub pattern: ', sub);
        }
      });
      resolve(s);
    });
  });
}
