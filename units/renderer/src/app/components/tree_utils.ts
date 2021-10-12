import { Tree, TreeNodeInfo } from '@blueprintjs/core';

export type NodePath = number[];

export const nodeFromPath = Tree.nodeFromPath;

export function forEachNode(nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) {
    if (nodes === undefined) {
        return;
    }

    for (const node of nodes) {
        callback(node);
        forEachNode(node.childNodes, callback);
    }
}

export function forNodeAtPath(nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) {
    callback(nodeFromPath(path, nodes));
}

