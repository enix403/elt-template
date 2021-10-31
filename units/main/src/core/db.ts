import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import type { IDatabaseDriver, Connection } from '@mikro-orm/core';

import { getStoragePath } from '@/common_paths';
import { IS_RUNNING_DEV } from '@/utils';
import { logger } from '@/logging';
import allEntities from './entities';

export let orm: MikroORM<IDatabaseDriver<Connection>>;
export type EnttManager = (typeof orm)['em'];

export function getMDBConfig(): Parameters<typeof MikroORM.init>[0] {
    return {
        driver: SqliteDriver,

        dbName: getStoragePath(),
        // debug: IS_RUNNING_DEV && ['query', 'query-params'],
        debug: IS_RUNNING_DEV && [],

        logger: msg => logger.verbose(msg),

        entities: allEntities,

        cache: { enabled: false },

        discovery: {
            disableDynamicFileAccess: true
        }
    };
}

export async function createDBConnection() {
    orm = await MikroORM.init(getMDBConfig());
    if (!IS_RUNNING_DEV) {
        await orm.getSchemaGenerator().updateSchema();
    }
}
