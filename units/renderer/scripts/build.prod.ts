// @ts-nocheck

import { spawnSync } from 'child_process';
import { resolveProjectRoot, RP_BUILD_COMPILED_RENDERER } from '@shared/app_paths';

spawnSync(
    'yarn',
    ['run', 'cmd:build'],
    {
        env: {
            BUILD_PATH: resolveProjectRoot(RP_BUILD_COMPILED_RENDERER)
        },
        stdio: 'inherit'
    }
);
