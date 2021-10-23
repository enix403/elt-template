/* TypeORM config */

process.env.NODE_ENV = 'development';

require('tsconfig-paths/register');
require('dotenv/config');

import { configureApplicationPaths } from '@/pathutils';
import { getDBConnectionOptions } from '@/core/db';
import type { ConnectionOptions } from 'typeorm';

configureApplicationPaths(null, true);

export default {
    ...getDBConnectionOptions(),

    migrations: ["./migrations/*.ts", "./migrations/*.js"],

    cli: {
        migrationsDir: "./migrations",

        // Where to create new entities.
        // Relative to ormconfig.ts
        entitiesDir: "./src/core/entities"
    }
} as ConnectionOptions;
