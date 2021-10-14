import path from "path";
import { BrowserWindow, shell } from "electron";
import { resolveHtmlPath, IS_RUNNING_DEV } from '~/utils';

import {
    default_win_title
} from '~/appconfig.json';

export let mainWindow: BrowserWindow | null = null;

const getPreloadScriptPath = (): string => {
    // the string below will be replaced by the build system with the actual preload file name
    let preloadName = '#__APP_PRE_COMPILED_PRELOAD_SCRIPT_NAME__#';
    return path.join(__dirname, preloadName);
}

export const createWindow = async () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        title: default_win_title,
        backgroundColor: '#fff',
        webPreferences: {
            nodeIntegration: false,
            preload: getPreloadScriptPath(),
            devTools: IS_RUNNING_DEV
        },
    });

    mainWindow.loadURL(resolveHtmlPath("index.html"));


    mainWindow.webContents.on("did-finish-load", () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on("closed", () => {
        console.log("Main window closed");
        mainWindow = null;
    });

    // Open urls in the user's browser
    mainWindow.webContents.on("new-window", (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });
};

export const recreateWindow = () => {
    if (mainWindow === null) {
        createWindow();
    }
};
