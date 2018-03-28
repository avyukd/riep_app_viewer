var path = require('path');
var app = require('electron').app;
const electron = require('electron');
var {BrowserWindow, dialog, Menu, MenuItem} = electron;
//var ipc = require('ipc');
///var Menu = require('menu');
//var MenuItem = require('menu-item');
var cliUrl = process.argv.slice(2).join(' ');

require('crashreporter').start();

var mainWindow;

var openFile = function() {
  var filepath = dialog.showOpenDialog({
    properties: ['openFile']
  });

  if (filepath) {
    mainWindow.webContents.send('open-file', filepath);
  }
};

var openLocation = function() {
  mainWindow.webContents.executeJavaScript([
    'videojs.players.vid.pause();   ' +
    'swal({                         ' +
    '  title: "Open Location",      ' +
    '  type: "input",               ' +
    '  showCancelButton: true,      ' +
    '  closeOnConfirm: true,        ' +
    '  animation: "slide-from-top", ' +
    '  inputPlaceholder: "Location" ' +
    '},                             ' +
    'function(file){                ' +
    '  if (!file) return;           ' +
    '  playFile(file);              ' +
    '});                            '
  ].join(''));
};

app.on('window-all-closed', function(  ){
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    //width: 720,
    //height: 300
    width: 1200,
    height: 1000,
    'web-preferences': {
      'web-security': false
    }
  });

  

    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.on('did-finish-load', function() {
    if (cliUrl) {
      mainWindow.webContents.send('open-file', cliUrl);
    }
  });


  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
