import { AppChannel, CommResultType } from "@shared/communication";
import { ChannelResponse } from '@shared/system_api';

export interface IpcChannel {
    channelName: AppChannel;
    handle(message: object): any;
};


export class ChannelError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "ChannelError";
    }
}

export async function invokeChannel(ipcChannel: IpcChannel, message: object): Promise<ChannelResponse> {
    try {
        return {
            type: CommResultType.ChannelResponse,
            data: await ipcChannel.handle(message)
        };
    }
    catch (err) {
        if (err instanceof ChannelError) {
            return {
                type: CommResultType.ChannelError,
                error: err.toString()
            };
        }
        // TODO: Use a real logging library
        console.log(err);
        return { type: CommResultType.SystemError };
    }
}
