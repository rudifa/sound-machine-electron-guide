'use strict';

const {ipcRenderer} = require('electron')

var closeEl = document.querySelector('.close');
closeEl.addEventListener('click', function (e) {
    ipcRenderer.send('close-settings-window');
});
