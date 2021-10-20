import path from 'path';
import { app, ipcMain } from 'electron';
import {
    createWindow,
    recreateWindow
} from 'main/window';
import { getPath } from '~/pathutils';
import { createDBConnection } from '~/core/db';

import type { IpcChannel } from '~/core/channels/IpcChannel';
import { invokeChannel } from '~/core/cnl_utils';

import { InventoryChannel } from '~/core/channels/inventory';

const registeredChannels: IpcChannel[] = [
    new InventoryChannel(),
];

export const initApp = async () => {
    await createDBConnection(path.join(getPath('data'), 'storage.sqlite3'));

    // setup ipc communication channels
    for (const channel of registeredChannels) {
        ipcMain.handle(channel.channelName, (_event, arg) => invokeChannel(channel, arg));
    }

    /**
     * Add event listeners...
     */
    app.on("window-all-closed", () => {
        // Respect the OSX convention of having the application in memory even
        // after all windows have been closed
        if (process.platform !== "darwin") {
            app.quit();
            app.exit(0);
        }
    });

    try {
        await app.whenReady();
        console.log("Application Ready [Electron]");
        console.log("Asset Paths: " + getPath('assets'));
        console.log("Data Paths: " + getPath('data'));
        console.log("Config Paths: " + getPath('config'));
        console.log("Cache Paths: " + getPath('cache'));
        console.log();
        console.log("Creating window");
        createWindow();
    }
    catch (err) {
        console.error("Unable to start app");
        console.error(err);
        process.exit(1);
    }

    app.on("activate", () => {
        recreateWindow();
    });

}
