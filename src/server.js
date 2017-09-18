import { app, BrowserWindow, Menu, ipcMain, dialog, shell } from 'electron';
import path from 'path';
import fs from 'fs-extra';
import reload from 'electron-reload';
const appDir = app.getPath('userData');
const dbDir = path.resolve(appDir,"./db");
const themesDir = path.resolve(appDir,"./themes");
const mdDir = path.resolve(appDir,"./src");
const template = [{
    label: "Yogurt",
    submenu: [
        { label: "About Yogurt", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];
reload(`${process.cwd()}/app/`);

ipcMain.on('init', (event, argv) => {
  if(!fs.existsSync(appDir)){
    fs.mkdirSync(appDir)
  }
  if(!fs.existsSync(dbDir)){
    fs.copySync(path.resolve(__dirname,"../db"),dbDir);
  }
  if(!fs.existsSync(themesDir)){
    fs.copySync(path.resolve(__dirname,"../themes"),themesDir);
  }

  event.sender.send('directories',{
    appDir:appDir,
    dbDir:dbDir,
    themesDir:themesDir,
    mdDir:mdDir
  })
});



ipcMain.on('setFilesDir', (event, argv) => {
  dialog.showOpenDialog(
  { properties: ['openDirectory'] },
  (files) => {
      if (files) {
        event.sender.send('getFilesDir', files[0]);
      }
  });
})
app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    'titleBarStyle': 'hidden-inset',
    'frame': false,
    'width': 1200,
    'height': 700,
    'node-integration': false,
    'webPreferences': { 'node-integration': false },
  });
  mainWindow.loadURL(`file://${process.cwd()}/app/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});
