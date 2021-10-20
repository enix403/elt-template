import type { AppChannel, ChannelResponse, Message } from './communication'

// This API is here in shared code instead of the renderer unit because
// preload.ts (from the main unit) needs access to this API

export interface ISystemBackendAPI {
    sendPlainMessage(
        channel: AppChannel,
        message: any
    ): Promise<ChannelResponse<any>>;

    sendMessage<T, K>(
        channel: AppChannel,
        message: Message<T, K>
    ): Promise<ChannelResponse<K>>;
}
