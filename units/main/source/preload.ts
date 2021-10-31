import { contextBridge, ipcRenderer } from 'electron';

import { AppChannel, AllMessages, Message, CommResultType } from '@shared/communication';
import { IS_RUNNING_DEV } from '@/utils';

import type { ISystemBackendAPI } from '@shared/system_api';
import type { ChannelResponse } from '@shared/communication';


async function _sendPlainMessage(channel: AppChannel, message: any): Promise<ChannelResponse<any>> {
    // TODO: Check for channel validity at runtime using:
    // Object.values(AppChannel).includes(channel);

    try {
        return await ipcRenderer.invoke(channel.toString(), message);
    }
    catch (e) {
        console.error("CommunicationError:", "Electron IPC communication error");
        return { type: CommResultType.CommunicationError };
    }
}

const electronBackendApi: ISystemBackendAPI = {
    sendPlainMessage: _sendPlainMessage,
    sendMessage: (channel, message) =>
        _sendPlainMessage(channel, Message.serialize(message))
};

contextBridge.exposeInMainWorld('SystemBackend', electronBackendApi);

if (IS_RUNNING_DEV) {
    contextBridge.exposeInMainWorld('AppChannel', AppChannel)
    contextBridge.exposeInMainWorld('AllMessages', AllMessages)
}
