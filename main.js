const { app, Menu, BrowserWindow, shell, globalShortcut } = require('electron')

const path = require('path')
const url = require('url')
const version = app.getVersion()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1280, height: 720})
  // and load the index.html of the app.
  mainWindow.loadURL("https://webcr.moedev.co/")
  mainWindow.webContents.userAgent = "Crunchyroll Desktop - "+version

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  
  app.whenReady().then(() => {
		globalShortcut.register("CommandOrControl+Shift+I", () => {
			mainWindow.webContents.openDevTools();
		});
		globalShortcut.register("CommandOrControl+Q", () => {
			app.quit();
		});
		globalShortcut.register("F11", () => {
			fullscreen();
		});
	});

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function disableMenu() {
	Menu.setApplicationMenu(null);
}

function fullscreen() {
	if (BrowserWindow.getFocusedWindow().isFullScreen()) {
		BrowserWindow.getFocusedWindow().setFullScreen(false);
		createMenu();
	} else {
		BrowserWindow.getFocusedWindow().setFullScreen(true);
	}
}


function createMenu() {
	const template = [
		{
			label: "Home",
			click: () => {
				console.log("Home Clicked");
				mainWindow.loadURL("https://webcr.moedev.co/");
			},
		},
		{
			label: "Dashboard",
			click: () => {
				mainWindow.loadURL("https://webcr.moedev.co/dashboard");
			},
		},
		{
			label: "Browse",
			click: () => {
				mainWindow.loadURL("https://webcr.moedev.co/browse");
			},
		},
		{
			label: "Queue",
			click: () => {
				mainWindow.loadURL("https://webcr.moedev.co/queue");
			},
		},
		{
			label: "History",
			click: () => {
				mainWindow.loadURL("https://webcr.moedev.co/history");
			},
		},
		{
			label: "Check For Updates",
			click: () => {
				shell.openExternal(
					"https://github.com/py7hon/dcr/releases/latest"
				);
			},
		},
		{
			label: "Exit",
			click: async () => {
				app.quit();
			},
		},
	];

	menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => { 
  createWindow()
	createMenu()
  })

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
