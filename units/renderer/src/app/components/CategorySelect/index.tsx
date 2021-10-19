import React from 'react';

import immer from "immer";
import {
    Tree,
    Classes,
    TreeNodeInfo
} from '@blueprintjs/core';

import { NodePath, forEachNode, forNodeAtPath, nodeFromPath, isNodeChild } from 'app/components/tree_utils';
import classNames from 'classnames';

export interface ICategory {
    id: string | number;
    name: string;
    children?: ICategory[];
};

type TreeAction =
    | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean, recursive?: boolean } }
    | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } }
    | { type: "DESELECT_ALL" }

type INodeStateInfo = TreeNodeInfo[];

interface IProps {
    data: ICategory[];
    selectedNodePath: NodePath | null;
    onSelectedNodeChange: (path: NodePath | null) => void;
}

interface IState {
    nodes: INodeStateInfo;
}

export class CategorySelect extends React.Component<IProps, IState> {
    calculateInitialState = (props: IProps): IState => {
        const initialNodesState = createInitialState(props.data);
        const {selectedNodePath} = props;
        if (selectedNodePath !== null) {
            for (let i = selectedNodePath.length; i > 0; i--) {
                const chunk = selectedNodePath.slice(0, i);
                const targetNode = nodeFromPath(chunk, initialNodesState);
                targetNode.isExpanded = targetNode.childNodes ? targetNode.childNodes.length > 0 : false;
            }
            nodeFromPath(selectedNodePath, initialNodesState).isSelected = true;
        }
        return {
            nodes: initialNodesState
        };
    }

    public state: IState = this.calculateInitialState(this.props);

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.data !== this.props.data)
            this.setState(this.calculateInitialState(this.props));
    }

    static treeReducer = (state: INodeStateInfo, action: TreeAction) =>
        immer(state, newState => {
            switch (action.type) {
                case "DESELECT_ALL":
                    forEachNode(newState, node => (node.isSelected = false));
                    break;
                case "SET_IS_EXPANDED":
                    if (action.payload.recursive) {
                        const nodeAtPath = nodeFromPath(action.payload.path, newState);
                        forEachNode(
                            [nodeAtPath],
                            node => (node.isExpanded = action.payload.isExpanded),
                            // if recursively collapsing, do it from bottom to top
                            !action.payload.isExpanded
                        );
                    }
                    else {
                        forNodeAtPath(
                            newState,
                            action.payload.path,
                            node => (node.isExpanded = action.payload.isExpanded)
                        );
                    }
                    break;
                case "SET_IS_SELECTED":
                    forNodeAtPath(newState, action.payload.path, node => (node.isSelected = action.payload.isSelected));
                    break;
                default:
                    return;
            }
        });

    applyNodesActions = (oldState: INodeStateInfo, actions: TreeAction[]) => {
        let newNodesState = oldState;

        for (const action of actions) {
            newNodesState = CategorySelect.treeReducer(newNodesState, action);
        }

        return newNodesState;
    }

    handleNodeClick = (node: TreeNodeInfo, nodePath: NodePath) => {
        const targetSelected = !node.isSelected;

        const newNodesState = this.applyNodesActions(this.state.nodes,
            [{ type: "DESELECT_ALL" },
            {
                payload: { path: nodePath, isSelected: targetSelected },
                type: "SET_IS_SELECTED",
            }]
        );

        this.setState({
            nodes: newNodesState
        });
        this.props.onSelectedNodeChange(targetSelected ? nodePath : null);
    }

    handleNodeCollapse = (_node: TreeNodeInfo, nodePath: NodePath) => {
        const shouldDeselect = this.props.selectedNodePath && isNodeChild(nodePath, this.props.selectedNodePath);

        const actions: TreeAction[] = [];
        if (shouldDeselect) {
            this.props.onSelectedNodeChange(null);
            actions.push({ type: 'DESELECT_ALL' });
        }

        actions.push({
            type: "SET_IS_EXPANDED",
            payload: { path: nodePath, isExpanded: false, recursive: true },
        });

        this.setState({
            nodes: this.applyNodesActions(this.state.nodes, actions),
        });
    }

    handleNodeExpand = (_node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
        this.setState({
            nodes: this.applyNodesActions(this.state.nodes, [{
                type: "SET_IS_EXPANDED",
                payload: {
                    path: nodePath,
                    isExpanded: true,
                    recursive: e.altKey
                },
            }])
        });
    };

    render() {
        return (
            <Tree
                contents={this.state.nodes}
                onNodeClick={this.handleNodeClick}
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
                className={classNames(Classes.ELEVATION_0, 'rounded-tree')}
            />
        );
    }
}

function createTreeNodes(data: ICategory[]): INodeStateInfo {
    const nodes: INodeStateInfo = [];

    for (const cat of data) {
        const { children: childNodesInfo } = cat;
        const hasChildren = childNodesInfo && childNodesInfo.length > 0;
        const targetNode: TreeNodeInfo = {
            id: cat.id,
            label: cat.name,
            icon: 'folder-close',
            hasCaret: hasChildren,
            isExpanded: false,
        };

        if (hasChildren) {
            targetNode.childNodes = createTreeNodes(childNodesInfo);
        }

        nodes.push(targetNode);
    }

    return nodes;
}


const createInitialState = (data: ICategory[]): INodeStateInfo =>
    [{
        id: 0,
        label: "All Categories",
        icon: 'flash',
        isExpanded: true,
        hasCaret: true,

        childNodes: createTreeNodes(data)
    }];
