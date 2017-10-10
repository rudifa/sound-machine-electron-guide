'use strict'

var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
var mainWindow = null;
const {globalShortcut} = require('electron');

var globalShortcut = require('global-shortcut');

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        resizable: false,
        height: 700,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

    globalShortcut.register('ctrl+shift+1', function () {
        mainWindow.webContents.send('global-shortcut', 0);
    });
    globalShortcut.register('ctrl+shift+2', function () {
        mainWindow.webContents.send('global-shortcut', 1);
    });
});

const {ipcMain} = require('electron')
ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});

