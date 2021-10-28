import { mkdirSync } from 'fs';
import path from 'path';
import pino from 'pino';
import { getPath } from './pathutils';
import { IS_RUNNING_DEV } from './utils';

export let logger: pino.Logger;

export function initLogging() {

    const parentDir = path.join(getPath('data'), 'logs');
    mkdirSync(parentDir, { recursive: true });

    const allTargets = [
        {
            level: 'warn',
            target: 'pino/file',
            options: { destination: path.join(parentDir, 'app.log') }
        },
    ] as pino.TransportTargetOptions[];

    if (IS_RUNNING_DEV)
        allTargets.push({
            target: 'pino-pretty',
            level: 'debug',
            options: { colorize: true },
        });
    else
        allTargets.push({
            level: 'info',
            target: 'pino/file',
            options: { destination: 1 /* stdout */ }
        });

    logger = pino({
        name: "MAIN",
        level: IS_RUNNING_DEV ? "debug" : 'info',

        base: undefined,
        timestamp: true,

    }, pino.transport({ targets: allTargets }));

}
