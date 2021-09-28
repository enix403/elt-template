import path from 'path';
import { URL } from 'url';
import {
    RP_BUILD_COMPILED_MAIN,
    RP_BUILD_COMPILED_RENDERER
} from '@shared/app_paths';

export const IS_RUNNING_DEV = process.env.NODE_ENV === 'development';
export let resolveHtmlPath: (htmlFileName: string) => string;

if (IS_RUNNING_DEV) {
    const port = process.env.FRONTEND_PORT;
    resolveHtmlPath = (htmlFileName: string) => {
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    };
} else {
    resolveHtmlPath = (htmlFileName: string) => {
        const filepath = path.resolve(
            __dirname,
            path.relative(RP_BUILD_COMPILED_MAIN, RP_BUILD_COMPILED_RENDERER),
            htmlFileName
        )
        return `file://${filepath}`;
    };
}
