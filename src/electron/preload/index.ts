import { ipcRenderer, contextBridge } from "electron";

// Expose APIs to the Renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  getObjFromSubtitleFile: (fileData: string) =>
    ipcRenderer.invoke("subtitles:convert-to-object", fileData),
  sendVLCCommand: (cmd: string) => ipcRenderer.invoke("vlc:send-command", cmd),
});
