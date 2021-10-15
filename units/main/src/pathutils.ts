import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { IS_RUNNING_DEV } from './utils';
import {
    app_name,
    app_data_directory_name,
    electron_data_directory_name
} from '~/appconfig.json';

type PathSpec = 'userData'
    | 'data'
    | 'config'
    | 'cache'
    | 'assets';

let runtimePaths = {
    userDataDir: '',
    appDataDir: '',
    appConfigDir: '',
    appCacheDir: '',

    assetsPath: '',
};

function createDirectoryIfNotExists(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}

export const configure = () => {
    // Couldn't find any other place to do this
    app.setName(app_name);

    // We will use our own custom data directory and give the default system data directory to
    // electron because electron clutters that up with its cache.
    // See: https://github.com/electron/electron/issues/8124
    app.setPath('userData', path.join(app.getPath('appData'), electron_data_directory_name));


    /**
     * Use a different and easily accessible userdata directory during development
     *
     * In dev mode: units/main/runtime-dev/SysAppData
     * else in production:
     *      On Linux: $XDG_CONFIG_HOME (Usually ~/.config)
     *      On Windows: %APPDATA%
     *      On MacOs: ~/Library/Application
     * */
    let sysData: string;

    if (IS_RUNNING_DEV) {
        sysData = path.join(__dirname, '..', 'runtime-dev', 'SysAppData');
    }
    else {
        sysData = app.getPath('appData');
    }

    runtimePaths.userDataDir = path.join(sysData, app_data_directory_name);

    runtimePaths.appDataDir = path.join(runtimePaths.userDataDir, 'data');
    runtimePaths.appConfigDir = path.join(runtimePaths.userDataDir, 'config');
    runtimePaths.appCacheDir = path.join(runtimePaths.userDataDir, 'cache');

    createDirectoryIfNotExists(runtimePaths.appDataDir);
    createDirectoryIfNotExists(runtimePaths.appConfigDir);
    createDirectoryIfNotExists(runtimePaths.appCacheDir);

    if (app.isPackaged) {
        // If the app is packaged than the assets live in the electron-provided resources folder
        // (See toolchain/config/build.ts)
        runtimePaths.assetsPath = path.join(process.resourcesPath, 'assets');
    }
    else if (IS_RUNNING_DEV) {
        // If in development we use the actual assets folder (relative to the dev main.js bundle inside main/build-dev)
        runtimePaths.assetsPath = path.join(__dirname, '..', 'assets');
    }
    else {
        // If it is not packaged and not running in development mode then it must be
        // the unpackaged but bundled app ready to be packaged. In this case the build system
        // places the assets right next to the main.js bundle
        runtimePaths.assetsPath = path.join(__dirname, 'assets');
    }
};

export const getPath = (spec: PathSpec): string | undefined => {
    if (spec == 'userData')
        return runtimePaths.userDataDir;
    if (spec == 'data')
        return runtimePaths.appDataDir;
    if (spec == 'config')
        return runtimePaths.appConfigDir;
    if (spec == 'cache')
        return runtimePaths.appCacheDir;
    if (spec == 'assets')
        return runtimePaths.assetsPath;

    return;
}
