const { BrowserWindow, Notification, app, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },

        icon: path.join(__dirname, 'assets', 'logo.png'),
        width: 1280,
        height: 720,
    });

    win.menuBarVisible = false;
    win.loadFile('./index.html');

    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', createWindow);

ipcMain.on('message-notification', (event, value) => {
    new Notification({ title: value.authorName, icon: './assets/logo.png', body: value.messageContent }).show();
});