import { Message } from './interfaces';
import type {
    WithoutID,
    ICategory,
    IRawMaterial,
    ICreateRawMaterial,
    ISupplier,
    ISupplierInfo
} from '@shared/object_types';

abstract class SimpleMessage<T, K> extends Message<T, K> {
    constructor(payload: T) {
        super();
        this.payload = payload;
    }
}

export interface SimpleMessageFactory<T, K> {
    new(payload: T): SimpleMessage<T, K>;
};

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
            extends SimpleMessage<ICreateRawMaterial, void>
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

        interface IGetAllSuppliersOpts {
            preloadMaterials?: boolean;
        };
        export class GetAllSuppliers
            extends Message<IGetAllSuppliersOpts, ISupplier[]>
        {
            static ACTION_NAME = 'supl:all';
            constructor(options?: IGetAllSuppliersOpts) {
                super();
                this.payload = options || {};
            }
        }
    }
};
