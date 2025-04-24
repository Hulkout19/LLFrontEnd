const { app, BrowserWindow } = require('electron');

let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    appWindow.loadFile('dist/llfront-end/index.html');

    appWindow.on('closed', function () {
        appWindow = null;
    });
}

app.whenReady().then(() => { 
    createWindow()
 })
