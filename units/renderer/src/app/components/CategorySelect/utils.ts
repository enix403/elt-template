import type { NodePath } from "~/app/components/tree_utils";
import type { ICategory } from '@shared/object_types';
import type { TypedOmit } from '@shared/tsutils';

export type ICategoryPreview = TypedOmit<ICategory, 'children'>;

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
