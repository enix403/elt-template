process.env.NODE_ENV = 'development';

// Clear the screen
process.stdout.write('\x1Bc');

// -- imports
import express from 'express';
import cors from 'cors';

import { configureApplicationPaths } from '@/pathutils';
import { createDBConnection } from '@/database';
import { initLogging, logger } from '@/logging';

import { invokeChannel, IpcChannel } from '@/channel';

import type { ChannelResponse } from '@shared/communication/interfaces';
import { CommResultType } from '@shared/communication/constants';

import { InventoryChannel } from '@/core/InventoryChannel';
import { SuppliersChannel } from '@/core/SuppliersChannel';

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

const registeredChannels: IpcChannel[] = [
    new InventoryChannel(),
    new SuppliersChannel()
];

async function processRequest(payload: any): Promise<ChannelResponse> {
    const targetChannelName = payload.channel;
    const targetChannel = registeredChannels.find(c => c.channelName == targetChannelName);

    if (!targetChannel) {
        logger.error(`InvalidChannel: Not a valid channel '${targetChannelName}'`);
        return { type: CommResultType.InvalidChannel };
    }

    return invokeChannel(targetChannel, payload.message || null);
}

async function main() {
    configureApplicationPaths(null, false);
    initLogging();

    logger.debug("Connecting to database");
    await createDBConnection();
    setupExpressApp();

    logger.info("Application Ready [NodeJS]:");
    app.listen(PORT, () => logger.info(`Listening on http://localhost:${PORT}`))
}


main()
