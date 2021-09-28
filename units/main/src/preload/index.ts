import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('system', {
    ping() {
        console.log("In preload");
        return 'pong';
    }
});
