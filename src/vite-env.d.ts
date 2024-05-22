/// <reference types="vite/client" />

interface Window {
  // Exposed in the `electron/preload/index.ts`
  electronAPI: {
    getObjFromSubtitleFile: (fileData: string) => Promise<any>;
    sendVLCCommand: (cmd: string) => Promise<any>;
  };
}
