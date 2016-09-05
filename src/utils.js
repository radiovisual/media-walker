'use strict';
const path = require('path');
const shell = require('shelljs');
const userHome = require('user-home');
const isVideo = require('is-video');


// Set settings.json as the main config file
// but also listen for command-line args for debugging
const nconf = require('nconf')
	.argv()
	.file({file: settingsPath('settings.json')});

// Get the path to the .mediawalker config location
function settingsPath(file) {
  file = file || '';
  return path.join(userHome, '.mediawalker', file);
}

// Get the path to the .mediawalker defaults location
function defaultsPath(file) {
	file = file || '';
	return path.join(process.cwd(), 'src', 'defaults', 'config', '.mediawalker', file);
}

// Save key/value to the settings.json file
function saveSettings(settingKey, settingValue) {
	nconf.set(settingKey, settingValue);
	nconf.save();
}

// Read a value from the settings.json file
function readSettings(settingKey) {
	nconf.load();
	return nconf.get(settingKey);
}

// Force the reloading of the default .mediawalker config files
// Note: This function is [currently] not used anywhere in the app,
// but can be used in the future to "restore defaults" from the settings UI.
function reloadDefaults() {
	shell.cp('-Rf', defaultsPath(), settingsPath());
}


// Setup/check the .mediawalker config files
function init() {
  const args = nconf.stores.argv.store;

	return new Promise((resolve, reject) => {
		// get a list of files (if any) at the default location
		const settingsFiles = shell.ls(settingsPath());

		if (!settingsFiles.length) {
			// No settings exist. Copy the defaults to the settings location
			shell.cp('-R', defaultsPath(), settingsPath());
		} else if (settingsFiles.indexOf('settings.json') === -1) {
			// Copy the missing settings file to the settings location
			shell.cp('-R', defaultsPath('settings.json'), settingsPath());
		}

    // if (!args || !args.hasOwnProperty('video')) {
    //   reject('video parameter is required');
    // } else if (!args || !args.hasOwnProperty('subs')) {
    //   reject('subs parameter is required');
    // } else if (!isVideo(args.video)) {
    //   reject('invalid video file supplied');
    // } else {
    //   saveSettings('video', args.video);
    //   saveSettings('subs', args.subs);
    //   resolve();
    // }

    if (args && args.subs) {
      saveSettings('subs', args.subs);
    }
    resolve();
	});
}

function getVLCPath() {
		if (process.platform === 'darwin') {
			return '/Applications/VLC.app/Contents/MacOS/VLC';
		}
		if (process.platform === 'win32') {
			return 'C:\Program Files (x86)\VideoLAN\VLC\vlc.exe';
		}
		return '/usr/bin/vlc'
}

// Checks if --debug flag was passed
function debug() {
	const args = nconf.stores.argv.store;
	return args && args.hasOwnProperty('debug');
}

// Public API
module.exports = {
	reloadDefaults,
	saveSettings,
	readSettings,
	debug,
	init,
	getVLCPath
};
