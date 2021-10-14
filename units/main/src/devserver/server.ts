import express from 'express';
import cors from 'cors';

import { invokeChannel, IpcChannel } from '~/core/index';
import { DataOpChannel } from '~/core/channels/operations';
import { CommResultType } from '@shared/communication';
import { ChannelResponse } from '@shared/system_api';


const app = express();
const PORT = process.env.DEV_MOCK_SERVER_PORT || 7050;

function setupApp() {
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

const registeredChannels: IpcChannel[] = [new DataOpChannel()];

async function processRequest(payload: any): Promise<ChannelResponse> {
    const targetChannelName = payload.channel;
    const targetChannel = registeredChannels.find(c => c.channelName == targetChannelName);

    if (!targetChannel) {
        return { type: CommResultType.InvalidChannel };
    }

    return await invokeChannel(targetChannel, payload.message || null);
}

setupApp();
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))


