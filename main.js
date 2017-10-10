'use strict'

var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
var mainWindow = null;
const {globalShortcut} = require('electron');

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        resizable: false,
        height: 700,
        width: 368
    });

    globalShortcut.register('ctrl+shift+1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register('ctrl+shift+2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

});

const {ipcMain} = require('electron')
ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});

