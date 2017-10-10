'use strict';

const {ipcRenderer} = require('electron')

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipc.ipcRenderer('close-settings-window');
});
