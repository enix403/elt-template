import 'reflect-metadata';

import { IS_RUNNING_DEV } from '~/utils';

import { createConnection } from 'typeorm';
import { allEntities } from './entities';

export async function createDBConnection(storagePath: string) {
    await createConnection({
        type: 'sqlite',
        database: storagePath,

        // logging: IS_RUNNING_DEV,
        logging: false,
        synchronize: IS_RUNNING_DEV,

        entities: allEntities
    });
}
