import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// ✅ Creates __dirname equivalent in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
function createWindow() {
    console.log('HTML path:', path.join(app.getAppPath(), 'src', 'renderer', 'views', 'welcome.html'));
    console.log('Preload mjs path: ',path.join(app.getAppPath(), 'src', 'preload', 'preload.mjs'));
   
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'src', 'preload', 'preload.js'),
        }
    })
    window.loadFile(path.join(app.getAppPath(), 'src', 'renderer', 'views', 'welcome.html'));
}
// IPC listener in main process
ipcMain.on('toMain', (event, message) => {
    console.log('Message from renderer:', message);
    event.reply('fromMain', 'Hello from main process!');
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})