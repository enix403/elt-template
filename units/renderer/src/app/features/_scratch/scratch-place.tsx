import React from 'react';
import './style.scss';


import immer from "immer";
import { NavPageView } from "app/layout/views";
import {
    Card,
    Tree,
    Icon,
    FormGroup,
    InputGroup,
    Button,
    Classes,
    TreeNodeInfo
} from '@blueprintjs/core';

import { GridColumn, GridRow } from "app/components/Grid";
import { NodePath, forEachNode, forNodeAtPath, nodeFromPath } from 'app/components/tree_utils';
import { FormGroupWithoutLabel } from 'app/components/form_group_utils';
import classNames from 'classnames';

interface ICategoryInfo {
    id: string | number;
    name: string;
    subcategories?: ICategoryInfo[];
};

const FAKE_CATEGORIES_DATA: ICategoryInfo[] = [
    {
        id: 1,
        name: "Electronic Accessories",
        subcategories: [
            { id: 0, name: "E Sub-Category 1" },
            { id: 1, name: "E Sub-Category 2" },
            { id: 2, name: "E Sub-Category 3" },
        ]
    },
    { id: 4, name: "Groceries & Pets" },
    {
        id: 2, name: "Home & Lifestyle",
        subcategories: [
            { id: 0, name: "H Sub-Category 1" },
            {
                id: 1,
                name: "H Sub-Category 2",
                subcategories: [
                    { id: 0, name: "Sub H Sub-Category 1" },
                ]
            },
            { id: 2, name: "H Sub-Category 3" },
        ]
    },
    {
        id: 3, name: "Sports & Outdoor",
        subcategories: [
            { id: 0, name: "S Sub-Category 1" },
            { id: 1, name: "S Sub-Category 2" },
            { id: 2, name: "S Sub-Category 3" },
        ]
    },
];

function createTreeNodes(data: ICategoryInfo[]): TreeNodeInfo[] {
    const nodes: TreeNodeInfo[] = [];

    for (const cat of data) {
        const { subcategories } = cat;
        const hasChildren = subcategories && subcategories.length > 0;
        const targetNode: TreeNodeInfo = {
            id: cat.id,
            label: cat.name,
            icon: 'folder-close',
            hasCaret: hasChildren,
            isExpanded: false,
        };

        if (hasChildren) {
            const children = createTreeNodes(subcategories);
            targetNode.childNodes = children;
        }

        nodes.push(targetNode);
    }

    return nodes;
}

const createInitialState = (data: ICategoryInfo[]): TreeNodeInfo[] =>
    [{
        id: 0,
        label: "All Categories",
        icon: 'flash',
        isExpanded: true,
        hasCaret: true,

        childNodes: createTreeNodes(data)
    }];

const getFreshData = () => createInitialState(FAKE_CATEGORIES_DATA);


/**
 * Returns true if nodeB is child of nodeA, false otherwise
 * */
function isNodeChild(nodeA: NodePath, nodeB: NodePath) {
    if (nodeA.length >= nodeB.length)
        return false;

    for (let i = 0; i < nodeA.length; i++) {
        if (nodeA[i] != nodeB[i])
            return false;
    }

    return true;
}

type TreeAction =
    | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean, recursive?: boolean } }
    | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } }
    | { type: "DESELECT_ALL" }
    | { type: "RELOAD_STATE" };


function treeExampleReducer(state: TreeNodeInfo[], action: TreeAction) {

    if (action.type == 'RELOAD_STATE')
        return getFreshData();

    return immer(state, newState => {
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
}


const ParentCatergorySelection = () => {
    const [nodes, dispatch] = React.useReducer(
        treeExampleReducer, getFreshData()
    );
    const [selectedNodePath, setSelectedNodePath] = React.useState<NodePath | null>();

    const handleNodeClick = React.useCallback(
        (node: TreeNodeInfo, nodePath: NodePath) => {
            const targetSelected = !node.isSelected;
            dispatch({ type: "DESELECT_ALL" });
            dispatch({
                payload: { path: nodePath, isSelected: targetSelected },
                type: "SET_IS_SELECTED",
            });

            setSelectedNodePath(targetSelected ? nodePath : null);
        },
        [],
    );

    const handleNodeCollapse = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
        if (selectedNodePath && isNodeChild(nodePath, selectedNodePath)) {
            dispatch({ type: "DESELECT_ALL" });
            setSelectedNodePath(null);
        }

        dispatch({
            type: "SET_IS_EXPANDED",
            payload: { path: nodePath, isExpanded: false, recursive: true },
        });
    }, [selectedNodePath]);

    const handleNodeExpand = React.useCallback(
        (_node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
            dispatch({
                type: "SET_IS_EXPANDED",
                payload: {
                    path: nodePath,
                    isExpanded: true,
                    recursive: e.altKey
                },
            });
        }, []);

    return (
        <div style={{ marginBottom: 20, width: '100%' }}>
            <Tree
                contents={nodes}
                onNodeClick={handleNodeClick}
                onNodeCollapse={handleNodeCollapse}
                onNodeExpand={handleNodeExpand}
                className={classNames(Classes.ELEVATION_0, 'rounded-tree')}
            />
        </div>
    );
};

export const ScratchPlace = () => {
    return (
        <NavPageView title="Define New Category (Scratch Place)">
            <Card elevation={2} style={{ margin: "15px 25px" }}>

                <div style={{ margin: '0 0 15px' }}>
                    <h5 className="bp3-heading">Select Parent Category</h5>
                </div>
                <ParentCatergorySelection />

                <GridRow>
                    <GridColumn colSize={5}>
                        <FormGroup label="New Category Name">
                            <InputGroup
                                placeholder="Enter category name"
                                fill={true}
                                leftIcon="merge-columns"
                            />
                        </FormGroup>
                    </GridColumn>
                    <GridColumn colSize={7}>
                        <FormGroupWithoutLabel>
                            <Button
                                text="Add Category"
                                intent="success"
                                fill={false}
                                rightIcon="group-objects"
                            />
                        </FormGroupWithoutLabel>
                    </GridColumn>
                </GridRow>
            </Card>
        </NavPageView>
    );
};
