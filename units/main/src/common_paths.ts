import path from 'path';
import { getPath } from './pathutils';

export const getStoragePath = () =>
    path.join(getPath('data'), 'storage.sqlite3')
