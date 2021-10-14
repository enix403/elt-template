import { IpcChannel, ChannelError } from '~/core/index';
import { AppChannel } from '@shared/communication';

export class DataOpChannel implements IpcChannel {
    channelName = AppChannel.DataOperations;

    handle(message: any) {
        const action = message && message.action || null;

        if (action == 'ping-1') {
            return 'pong-1';
        }
        else if (action == 'ping-2') {
            return 'pong-2';
        }
        else if (action == 'die') {
            throw new Error("I died");
        }

        throw new ChannelError("Invalid message payload received...");
    }
};
