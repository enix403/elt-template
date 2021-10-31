import { app, ipcMain } from 'electron';
import {
    createWindow,
    recreateWindow
} from 'main/window';
import { getPath } from '@/pathutils';
import { createDBConnection } from '@/core/db';

import { logger } from '@/logging';
import type { IpcChannel } from '@/core/channels/IpcChannel';
import { invokeChannel } from '@/core/cnl_utils';

import { InventoryChannel } from '@/core/channels/inventory';
import { SuppliersChannel } from '@/core/channels/suppliers';

const registeredChannels: IpcChannel[] = [
    new InventoryChannel(),
    new SuppliersChannel()
];

export const initApp = async () => {
    await createDBConnection();

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
        logger.info("Application Ready [Electron]");

        logger.info("Asset Path:   %s ", getPath('assets'));
        logger.info("Data Path:    %s ", getPath('data'));
        logger.info("Config Path:  %s ", getPath('config'));
        logger.info("Cache Path:   %s ", getPath('cache'));

        logger.debug("Creating main window");
        createWindow();
    }
    catch (err) {
        logger.error("Unable to start app");
        logger.error(err);
        process.exit(1);
    }

    app.on("activate", () => {
        recreateWindow();
    });

}
