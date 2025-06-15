//INFO: "type": "module" doesn’t apply to the preload script
// the VM Electron uses to run preload doesn’t support ESM.
// import { contextBridge, ipcRenderer } from 'electron'; 
const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('api',{
    // Version info
    versions: {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
        // we can also expose variables, not just functions
    },
    // Send an IPC message to main
    send: (channel, data) => {
        const validChannels = ['toMain']; // whitelist channels
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
  
    // Receive an IPC message from main
    receive: (channel, func) => {
        const validChannels = ['fromMain']; // whitelist channels
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});