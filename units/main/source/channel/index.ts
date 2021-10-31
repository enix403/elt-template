import type { AppChannel } from '@shared/communication/constants';
import type { ChannelResponse } from '@shared/communication/interfaces';

import { CommResultType } from '@shared/communication/constants';
import { ChannelError } from './exceptions';

import { logger } from '@/logging';

export interface IpcChannel {
    channelName: AppChannel;
    handle(message: any | void): any;
};


export async function invokeChannel(
    ipcChannel: IpcChannel,
    message: object
): Promise<ChannelResponse> {
    try {
        return {
            type: CommResultType.ChannelResponse,
            data: await ipcChannel.handle(message)
        };
    }
    catch (err: any) {
        if (err instanceof ChannelError) {
            return {
                type: CommResultType.ChannelError,
                error: err.message
            };
        }
        logger.error("invoke-channel SysError: %s", err.message);
        return { type: CommResultType.SystemError };
    }
}
