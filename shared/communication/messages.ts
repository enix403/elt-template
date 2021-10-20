import { Message } from './interfaces';

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
        { static ACTION_NAME = 'inv:rm:cat:create' }

        // TODO: make proper typings
        export class GetAllCategories<CatType = any>
            extends SimpleMessage<void, Array<CatType>>
        { static ACTION_NAME = 'inv:rm:cat:all' }
    };
};
