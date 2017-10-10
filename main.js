'use strict'

var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
const {ipcMain} = require('electron')
var mainWindow = null;

ipcMain.on('close-main-window', (event, arg) => {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        frame: false,
        resizable: false,
        height: 700,
        width: 368
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
