process.env.NODE_ENV = 'development';

import type { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { configureApplicationPaths, getPath } from '~/pathutils';

// --- tables
import { Post } from '~/core/database/Post';

// --- config
if (process.env.APP_PATHS_CONFIGURED !== 'yes')
    configureApplicationPaths('', true);

export default {

    migrations: {
        path: path.join(getPath('cache'), 'migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[jt]s$/, // regex pattern for the migration files
    },

    dbName: path.join(getPath('data'), 'storage.sqlite3'),
    debug: true,
    type: 'sqlite',

    entities: [Post]
} as Parameters<typeof MikroORM.init>[0];
