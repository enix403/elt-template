import { contextBridge, ipcRenderer } from 'electron';
import { AppChannel, CommResultType } from '@shared/communication';
import { ChannelResponse, ISystemBackendAPI } from '@shared/system_api';

async function sendMessage<T = void>(channel: AppChannel, message: T): Promise<ChannelResponse> {
    // TODO: check for channel validity at runtime using:
    // Object.values(AppChannel).includes(channel);

    return await ipcRenderer.invoke(channel.toString(), message);
}


const api: ISystemBackendAPI = { sendMessage };
contextBridge.exposeInMainWorld('SystemBackend', api);
