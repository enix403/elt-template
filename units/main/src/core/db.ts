import 'reflect-metadata';

import { IS_RUNNING_DEV } from '~/utils';

import type { ConnectionOptions } from 'typeorm';
import { createConnection } from 'typeorm';
import { allEntities } from './entities';

import { getStoragePath } from '@/common_paths';

export function getDBConnectionOptions(): ConnectionOptions {
    return {
        // Connection
        type: 'sqlite',
        database: getStoragePath(),

        // Behaviour
        logging: false,
        synchronize: !IS_RUNNING_DEV,

        // Database itself
        entities: allEntities,
    }
}

export async function createDBConnection() {
    await createConnection(getDBConnectionOptions());
}
