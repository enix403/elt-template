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
            options: {
                colorize: true,
                singleLine: true,
                ignore: "lvlLabel",
                levelFirst: false,
                translateTime: "SYS:yyyy-mm-dd HH:MM:ss"
            },
        });
    else
        allTargets.push({
            level: 'info',
            target: 'pino/file',
            options: { destination: 1 /* stdout */ }
        });

    logger = pino({
        name: "main",
        level: IS_RUNNING_DEV ? "debug" : 'info',

        base: undefined,
        timestamp: true,

        formatters: {
            level: (level, value) => ({ level: value, lvlLabel: level })
        }
    }, pino.transport({ targets: allTargets }));

}


function pad(padding: string, str: string | number, padLeft: boolean) {
    if (typeof str === 'undefined')
        return padding;
    if (padLeft) {
        return (padding + str).slice(-padding.length);
    } else {
        return (str + padding).substring(0, padding.length);
    }
}
