import { AppChannel, AllMessages } from '@shared/communication';
import { ActionMessageChannel } from '@/channel/ActionMessageChannel';
import { ChannelError } from '@/channel/exceptions';

import {
    RMCategory,
    RawMaterial,
    entt_relation_list,
    entt_field_list,
} from '@/entities';
import { orm, EnttManager } from '@/database';
import { QueryOrderNumeric, wrap } from '@mikro-orm/core';

import type { ICategory } from '@shared/object_types';

async function createRootCategoryIfNotExists(em: EnttManager) {
    const rootNode = await em.findOne(RMCategory, { id: 0 });
    if (!rootNode)
        await em.persistAndFlush(em.create(RMCategory, { id: 0, name: '--ROOT--' }));
}

/**
 * Convert adjency list to tree object
 *
 * @see https://stackoverflow.com/a/21343255
 * */
function toTree(flatNodes: RMCategory[]) {

    const nodes = [] as ICategory[];
    const toplevelNodes = [] as ICategory[];
    const lookupList = {};

    for (var i = 0; i < flatNodes.length; i++) {
        const fnode = flatNodes[i];
        let lnode: ICategory = {
            id: fnode.id,
            name: fnode.name,
            children: []
        };
        lookupList[lnode.id] = lnode;
        nodes.push(lnode);
        if (fnode.parent == null) {
            toplevelNodes.push(lnode);
        }
    }

    for (var i = 0; i < nodes.length; i++) {
        const fnode = flatNodes[i];
        if (!(fnode.parent == null)) {
            lookupList[fnode.parent.id].children = lookupList[fnode.parent.id].children.concat([nodes[i]]);
        }
    }

    return toplevelNodes;
}

export class InventoryChannel extends ActionMessageChannel {
    channelName = AppChannel.Inventory;

    constructor() {
        super();

        this.registerHandler(
            AllMessages.Inv.RM.CreateCategory,
            async ({ name, parentId }) => {
                const em = orm.em.fork();
                await createRootCategoryIfNotExists(em);

                if (!name)
                    throw new ChannelError("Invalid name");

                if (parentId == undefined || parentId == null)
                    throw new ChannelError("Invalid parentId");

                parentId = parseInt(parentId.toString());

                let parentNode: RMCategory;
                try { parentNode = await em.findOneOrFail(RMCategory, { id: parentId }); }
                catch (e) { throw new ChannelError("Invalid parentId"); }

                await em.persistAndFlush(
                    em.create(RMCategory, {
                        name,
                        parent: parentNode
                    })
                );
            }
        );

        this.registerHandler(
            AllMessages.Inv.RM.GetAllCategories,
            async () => {
                const em = orm.em.fork();
                const nodes = await em.find(RMCategory, {},
                    {
                        orderBy: {
                            parent: QueryOrderNumeric.ASC
                        }
                    }
                );

                const tree = toTree(nodes);
                const treeRoot = tree[0];
                return treeRoot ? treeRoot.children : [];
            }
        );

        this.registerHandler(
            AllMessages.Inv.RM.CreateMaterial,
            async ({ name, category, measurement_unit, inventory_unit, description }) => {
                const em = orm.em.fork();

                let targetCat: RMCategory;
                try {
                    targetCat = await em.findOneOrFail(RMCategory, { id: category.id });
                }
                catch (e) {
                    throw new ChannelError("Category not found");
                }

                const mat = em.create(RawMaterial, {
                    name,
                    description,
                    inventory_unit,
                    measurement_unit,
                    category: targetCat
                });

                await em.persistAndFlush(mat);
            }
        );

        this.registerHandler(
            AllMessages.Inv.RM.GetAllMaterials,
            async ({ preloadSuppliers, withDescription }) => {

                const populate = entt_relation_list<RawMaterial>(preloadSuppliers && 'suppliers');
                const fields = entt_field_list<RawMaterial>('id', 'name', 'category', 'inventory_unit', 'measurement_unit');
                if (withDescription)
                    fields.push('description');

                const mats = await orm.em.fork().find(
                    RawMaterial, {}, { populate, fields });

                return mats.map(m => wrap(m).toObject());
            }
        );
    }
}

const delayPromiseBy = (pr: Promise<any>, ms: number) =>
    new Promise(res => setTimeout(res, ms)).then(() => pr);
