import { contextBridge } from 'electron';
import { ISystemBackendAPI } from '@shared/system_api';

const api: ISystemBackendAPI = {
    sendPrefs: (cname: string): Promise<void> => {
        return Promise.resolve();
    }
};

contextBridge.exposeInMainWorld('SystemBackend', api);

