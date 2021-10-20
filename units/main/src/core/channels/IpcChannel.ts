import type { AppChannel } from '@shared/communication/constants';

export interface IpcChannel {
    channelName: AppChannel;
    handle(message: any | void): any;
};
