const electron = require('electron');
const utils = require('./src/utils');
const ipc = electron.ipcMain;
const telnet = require('./telnet');

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let setupWindow;

/**
 * Show the setup page to get some configuration details on first launch.
 *
 * Note: This is currently not used in the app.
 */
function showSetup() {
	if (setupWindow) {
		return;
	}

	setupWindow = new BrowserWindow({
		width: 700,
		height: 570,
		frameless: true,
		frame: false,
		resizable: false
	});

	setupWindow.loadURL(`file://${__dirname}/src/app/setup/setup.html`);

	helpWindow.on('closed', () => {
		helpWindow = null;
	});
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 400, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools in debug mode
  if (utils.debug()) {
      mainWindow.webContents.openDevTools();
  }

  // if (utils.readSettings('firstLaunch')) {
	// 	showSetup();
  //   utils.saveSettings(); // TODO: firstLaunch = false
	// }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  utils.init().then(createWindow);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('before-quit', function () {
  telnet.send('quit');
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipc.on('play', () => {
  console.log('play function called');
  telnet.send('play');
});

ipc.on('pause', () => {
  console.log('pause function called');
  telnet.send('pause');
});

ipc.on('volume-up', () => {
  console.log('volume-up function called');
  telnet.send('volup 1');
});

ipc.on('volume-down', () => {
  console.log('volume-down function called');
  telnet.send('voldown 1');
});

ipc.on('speed-up', () => {
  console.log('speed-up function called');
  telnet.send('rate 1.5');
});

ipc.on('speed-normal', () => {
  console.log('speed-normal function called');
  telnet.send('rate 1');
});

ipc.on('speed-down', () => {
  console.log('speed-down function called');
  telnet.send('rate .5');
});

ipc.on('seek', (element, data) => {
  telnet.send(`seek ${data.start}`);
  telnet.send('play');
  console.log('seek function called to (s): ', data.start);
  console.log('seek function called to (ms): ', data.startMs);
});
