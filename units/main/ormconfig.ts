process.env.NODE_ENV = 'development';

require('tsconfig-paths/register');
require('dotenv/config');

import { configureApplicationPaths } from '@/pathutils';
import { getDBConnectionOptions } from '@/core/db';
import type { ConnectionOptions } from 'typeorm';

configureApplicationPaths(null, true);

export default {
    ...getDBConnectionOptions(),

    migrations: ["./src/migrations/*.ts", "./src/migrations/*.js"],

    cli: {
        // relative to ormconfig.ts
        entitiesDir: "./src/core/entities",
        migrationsDir: "./src/migrations"
    }
} as ConnectionOptions;
