import type { NodePath } from "../tree_utils";
import type { ICategory, ICategoryPreview } from '@shared/object_types';

export type { ICategoryPreview };

export function findCategoryFromPath(path: NodePath, nodes?: Array<ICategory>): ICategoryPreview {
    if (path.length === 1 && path[0] == 0) {
        return { id: 0, name: "-ROOT-" };
    }
    return categoryFromPathRecursive(path.slice(1), nodes);
}

function categoryFromPathRecursive(path: NodePath, nodes?: Array<ICategory>): ICategoryPreview {
    if (path.length === 1) {
        return nodes![path[0]];
    }
    else {
        return categoryFromPathRecursive(path.slice(1), nodes![path[0]].children);
    }
}
