'use strict'

var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        resizable: false,
        height: 700,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});

const {ipcMain} = require('electron')
ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});

