import { Message } from './interfaces';
import type {
    WithoutID,
    ICategory,
    IRawMaterial,
    ISupplier,
    ISupplierInfo
} from '@shared/object_types';

abstract class SimpleMessage<T, K> extends Message<T, K> {
    constructor(payload: T) {
        super();
        this.payload = payload;
    }
}

export namespace AllMessages {
    export namespace Inv.RM {
        export class CreateCategory
            extends SimpleMessage<
                {name: string, parentId: number | string}, void>
        { static ACTION_NAME = 'inv:rm:cat:create'; }

        export class GetAllCategories
            extends SimpleMessage<void, Array<ICategory>>
        { static ACTION_NAME = 'inv:rm:cat:all'; }

        export class CreateMaterial
            extends SimpleMessage<WithoutID<IRawMaterial>, void>
        { static ACTION_NAME = 'inv:rm:create'; }

        export class GetAllMaterials
            extends SimpleMessage<{ preloadSuppliers?: boolean } | void, Array<IRawMaterial & { suppliers?: ISupplier[] }>>
        { static ACTION_NAME = 'inv:rm:all'; }
    };

    export namespace Supl {
        export class AddSupplier
            extends SimpleMessage<
                WithoutID<ISupplier> & ISupplierInfo & {
                    rawMaterialId: number,
                    capacity: number
                }
            , void>
        { static ACTION_NAME = 'supl:add'; }
    }
};
