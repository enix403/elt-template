import path from 'path';

import winston, { format } from 'winston';

import { getPath } from './pathutils';
import { IS_RUNNING_DEV } from './utils';

export let logger: winston.Logger;

export function initLogging() {

    const logsDir = path.join(getPath('data'), 'logs');

    const commonFormats = format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm' }),
        format.splat()
    );

    /**
     * Levels
     *      error       = 0
     *      warn        = 1
     *      info        = 2
     *      http        = 3
     *      verbose     = 4
     *      debug       = 5
     *      silly       = 6
     * */

    // const generalFileTransport = new winston.transports.File({
        // level: IS_RUNNING_DEV ? 'debug' : 'info',
        // filename: path.join(logsDir, "combined.log"),
        // format: format.json()
    // });

    const errorFileTransport = new winston.transports.File({
        level: 'warn',
        filename: path.join(logsDir, "error.log"),
        format: format.json()
    });

    let consoleFormat: winston.Logform.Format;

    if (IS_RUNNING_DEV) {
        consoleFormat = format.combine(
            format(info => {
                info.level = `(${info.level.toUpperCase()})`;
                info.message = `: ${info.message}`;
                return info;
            })(),
            format.colorize({ all: true }),
            format.padLevels(),
            format.printf(info =>
                `[ ${info.timestamp} ] ${info.level} ${info.message}`)
        );
    }
    else {
        consoleFormat = format.combine(
            format.printf(info =>
                `[ ${info.timestamp} ] ${info.level} ${info.message}`)
        )
    }

    let stdoutTransport = new winston.transports.Console({
        format: consoleFormat,
        debugStdout: IS_RUNNING_DEV,
        level: IS_RUNNING_DEV ? 'debug' : 'info',
    });


    logger = winston.createLogger({
        format: commonFormats,
        transports: [
            // generalFileTransport,
            errorFileTransport,
            stdoutTransport,
        ]
    });
}
