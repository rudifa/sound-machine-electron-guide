'use strict';

const {app, BrowserWindow, globalShortcut, ipcMain} = require('electron');
var mainWindow = null;
var configuration = require('./configuration');
var settingsWindow = null;

app.on('ready', () => {
    if (!configuration.readSettings('shortcutKeys')) {
        configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
    }

    mainWindow = new BrowserWindow({
        frame: false,
        resizable: false,
        height: 700,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    setGlobalShortcuts();

    // uncomment to enable console.log() from renderer processes to DevTools console
    //mainWindow.webContents.openDevTools({mode: 'detach'})
});

function setGlobalShortcuts() {
    globalShortcut.unregisterAll();

    var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
    var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

    globalShortcut.register(shortcutPrefix + '1', () => {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register(shortcutPrefix + '2', () => {
        mainWindow.webContents.send('global-shortcut', 1);
    });
}

ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});

ipcMain.on('open-settings-window', () => {

    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', () => {
        settingsWindow = null;
    });
});

ipcMain.on('close-settings-window', () => {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipcMain.on('set-global-shortcuts', () => {
    setGlobalShortcuts();
});

