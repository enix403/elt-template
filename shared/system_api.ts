import { CommResultType, AppChannel } from './communication';

export type ChannelResponse<T = any> = { type: CommResultType, data?: T, error?: string };

export interface ISystemBackendAPI {
    sendMessage<T = void>(channel: AppChannel, message: T): Promise<ChannelResponse>;
};
