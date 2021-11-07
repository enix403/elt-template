import { Message } from './interfaces';
import { RequireKeys } from '../tsutils';
import type {
    WithoutID,
    ICategory,
    IRawMaterial,
    ISupplier,
    ISupplierInfo
} from '../object_types';

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
            extends SimpleMessage<RequireKeys<WithoutID<IRawMaterial>, 'description'>, void>
        { static ACTION_NAME = 'inv:rm:create'; }

        export interface IGetAllMaterialsOpts {
            preloadSuppliers?: boolean;
            withDescription?: boolean;
        }
        export class GetAllMaterials
            extends Message<IGetAllMaterialsOpts, Array<IRawMaterial>>
        {
            static ACTION_NAME = 'inv:rm:all';
            constructor(options?: IGetAllMaterialsOpts) {
                super();
                this.payload = options || {};
            }
        }
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

        export interface IGetAllSuppliersOpts {
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
