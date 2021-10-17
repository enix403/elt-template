import { IpcChannel, ChannelError } from '~/core/index';
import { AppChannel } from '@shared/communication';
import { Category } from '~/core/entities';
import { getManager } from 'typeorm';

export class DataOpChannel implements IpcChannel {
    channelName = AppChannel.DataOperations;

    async handle(message: any) {
        const action = message && message.action || null;

        if (action == 'category:all') {
            const tree = await getManager().getTreeRepository(Category).findTrees();
            const treeRoot = tree[0];
            return treeRoot ? treeRoot.children : [];
        }

        throw new ChannelError("Invalid message payload received...");
    }
};
