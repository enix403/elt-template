import { AppChannel, AllMessages } from '@shared/communication';
import { ActionMessageChannel } from '~/core/channels/ActionMessageChannel';
import { ChannelError } from '~/core/cnl_utils';
import { getManager } from 'typeorm';

import {
    RMCategory,
    RawMaterial
} from '~/core/entities';

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
            async () => {
                const tree = await getManager()
                                    .getTreeRepository(RMCategory)
                                    .findTrees();
                const treeRoot = tree[0];
                return treeRoot ? treeRoot.children : [];
            }
        );

        this.registerHandler(
            AllMessages.Inv.RM.CreateMaterial,
            async ({ name, categoryId, measurement_unit, inventory_unit }) => {
                const mat = new RawMaterial();
                mat.name = name!;
                mat.inventory_unit = inventory_unit!;
                mat.measurement_unit = measurement_unit!;
                try {
                    mat.category = await RMCategory.findOneOrFail(categoryId);
                }
                catch {
                    throw new ChannelError("Category not found");
                }

                await mat.save();
            }
        );
    }
}
