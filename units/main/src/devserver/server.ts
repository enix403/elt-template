process.env.NODE_ENV = 'development';

// -- imports

import path from 'path';

import express from 'express';
import cors from 'cors';

import { configureApplicationPaths, getPath } from '~/pathutils';
import { createDBConnection } from '~/core/db';
import { InventoryChannel } from '~/core/channels/inventory';

import type { IpcChannel } from '~/core/channels/IpcChannel';
import type { ChannelResponse } from '@shared/communication/interfaces';
import { CommResultType } from '@shared/communication/constants';
import { invokeChannel } from '~/core/cnl_utils';

// -- code body

const app = express();
const PORT = process.env.DEV_MOCK_SERVER_PORT || 7050;

function setupExpressApp() {
    app.set('etag', false);

    app.use(express.json({
        limit: '50mb',
        type: ["application/json"],
        strict: true // accept only toplevel objecs and arrays
    }));

    app.use(cors({
        origin: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true,
        maxAge: 1000,
        preflightContinue: false
    }));

    app.all('/', async (req, res) => {
        res.status(200);

        res.header('Surrogate-Control', 'no-store');
        res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', '0');

        res.json(await processRequest(req.body || {}));
    });
}

const registeredChannels: IpcChannel[] = [new InventoryChannel()];

async function processRequest(payload: any): Promise<ChannelResponse> {
    const targetChannelName = payload.channel;
    const targetChannel = registeredChannels.find(c => c.channelName == targetChannelName);

    if (!targetChannel) {
        return {
            type: CommResultType.InvalidChannel,
            error: "Please specify a valid message channel"
        };
    }

    return await invokeChannel(targetChannel, payload.message || null);
}

async function main() {
    configureApplicationPaths(null, false);
    await createDBConnection(path.join(getPath('data'), 'storage.sqlite3'));
    setupExpressApp();

    console.log("Application Ready [NodeJS]:");
    app.listen(PORT, () => console.log(`\nlistening on http://localhost:${PORT}\n`))
}


main()
