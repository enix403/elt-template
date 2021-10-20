import { contextBridge, ipcRenderer } from 'electron';

import type { ISystemBackendAPI } from '@shared/system_api';
import { AppChannel, AllMessages } from '@shared/communication';
import { IS_RUNNING_DEV } from './utils';


async function _sendPlainMessage(channel: AppChannel, message: any) {
    // TODO: Check for channel validity at runtime using:
    // Object.values(AppChannel).includes(channel);

    // TODO: Instead of directly returning the promise wrap it in a
    // try-catch block to prevent possible (unlikely) unhandled rejected promises.
    // Also return a CommResultType.SystemError in this case
    return ipcRenderer.invoke(channel.toString(), message);
}

const electronBackendApi: ISystemBackendAPI = {
    sendPlainMessage: _sendPlainMessage,
    sendMessage: (channel, message) =>
        _sendPlainMessage(channel, message.serialize())
};

contextBridge.exposeInMainWorld('SystemBackend', electronBackendApi);
if (IS_RUNNING_DEV) {
    contextBridge.exposeInMainWorld('AppChannel', AppChannel)
    contextBridge.exposeInMainWorld('AllMessages', AllMessages)
}
