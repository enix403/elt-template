import { IpcChannel } from './IpcChannel';
import { ChannelError } from '~/core/cnl_utils';
import type { AppChannel } from '@shared/communication/constants';
import type { SerializedMessage, Message, MessageFactory } from '@shared/communication/interfaces';

type HandlerMap = {
    [name: string]: (payload: any) => Promise<any>;
};

export abstract class ActionMessageChannel implements IpcChannel {
    public abstract channelName: AppChannel;

    private allHandlers: HandlerMap = {};

    protected registerHandler<T, K>(
        factory: MessageFactory<T, K>,
        handler: (payload: Partial<T>) => Promise<K>
    ): void {
        const actionName = (factory as any as typeof Message).ACTION_NAME;
        this.allHandlers[actionName] = handler;
    }

    async handle(message: SerializedMessage<any> | void) {
        if (!message)
            throw new ChannelError("Invalid message.");

        const reg = this.allHandlers[message.action || ''];

        if (reg)
            return reg(message.payload || {});

        throw new ChannelError("Invalid action.");
    }
}
