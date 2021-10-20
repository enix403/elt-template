import { AppChannel, AllMessages } from '@shared/communication';
import { ActionMessageChannel } from '~/core/channels/ActionMessageChannel';
import { ChannelError } from '~/core/cnl_utils';
import { RMCategory } from '~/core/entities';
import { getManager } from 'typeorm';

async function createRootCategoryIfNotExists() {
    const rootNode = await RMCategory.findOne(0);
    if (!rootNode) {
        const node = new RMCategory();
        node.id = 0;
        node.name = '-ROOT-';
        await node.save();
    }
}

export class InventoryChannel extends ActionMessageChannel {
    channelName = AppChannel.Inventory;

    constructor() {
        super();

        this.registerHandler(
            AllMessages.Inv.RM.CreateCategory,
            async ({ name, parentId }) => {
                await createRootCategoryIfNotExists();

                if (!name)
                    throw new ChannelError("Invalid name");

                if (parentId == undefined || parentId == null)
                    throw new ChannelError("Invalid parentId");

                parentId = parseInt(parentId.toString());

                let parentNode: RMCategory;
                try { parentNode = await RMCategory.findOneOrFail(parentId); }
                catch (e) { throw new ChannelError("Invalid parentId"); }

                const node = new RMCategory();
                node.name = name;
                node.parent = parentNode;
                await node.save();
            }
        );


        this.registerHandler(
            AllMessages.Inv.RM.GetAllCategories,
            async (): Promise<RMCategory[]> => {
                const tree = await getManager()
                                    .getTreeRepository(RMCategory)
                                    .findTrees();
                const treeRoot = tree[0];
                return treeRoot ? treeRoot.children : [];
            }
        );
    }
}
