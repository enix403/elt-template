import { IpcChannel, ChannelError } from '~/core/index';
import { AppChannel } from '@shared/communication';
import { RawMaterial, RMCategory } from '~/core/entities';
import { getManager } from 'typeorm';

export class DataOpChannel implements IpcChannel {
    channelName = AppChannel.DataOperations;

    static async createRootCategoryIfNotExists() {
        const rootNode = await RMCategory.findOne(0);
        if (!rootNode) {
            const node = new RMCategory();
            node.id = 0;
            node.name = '-ROOT-';
            await node.save();
        }
    }

    async handle(message: any) {
        const action = message?.action;
        const payload = message?.payload || {};

        if (action == 'inv:rm:cat:all') {
            const tree = await getManager().getTreeRepository(RMCategory).findTrees();
            const treeRoot = tree[0];
            return treeRoot ? treeRoot.children : [];
        }

        if (action == 'inv:rm:cat:create') {
            await DataOpChannel.createRootCategoryIfNotExists();
            const { name, parentId } = payload;

            if (!name)
                throw new ChannelError("Invalid name");

            if (parentId != 0 && !parentId)
                throw new ChannelError("Invalid parentId");

            let parentNode: RMCategory;
            try { parentNode = await RMCategory.findOneOrFail(parentId); }
            catch (e) { throw new ChannelError("Invalid parentId"); }

            const node = new RMCategory();
            node.name = name;
            node.parent = parentNode;
            await node.save();

            return node;
        }

        throw new ChannelError("Invalid message payload received...");
    }
};
