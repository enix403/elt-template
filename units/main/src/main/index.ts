import { configure as configurePath } from '~/pathutils';
import { IS_RUNNING_DEV } from '~/utils';
import { initApp } from './init';

configurePath();

if (IS_RUNNING_DEV) {
    console.log("Application is running with NODE_ENV=development. Development features are enabled");
    require('electron-debug')({ showDevTools: false });
}

initApp();
