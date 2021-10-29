import type { ChannelResponse } from '@shared/communication/interfaces';
import type { IpcChannel } from './channels/IpcChannel';
import { CommResultType } from '@shared/communication/constants';
import { logger } from '@/logging';

export class ChannelError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "ChannelError";
    }
}

export async function invokeChannel(
    ipcChannel: IpcChannel,
    message: object
): Promise<ChannelResponse>
{
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
        logger.error("invoke-channel SysError: %s",  err.message);
        return { type: CommResultType.SystemError };
    }
}
