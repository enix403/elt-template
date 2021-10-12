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

/*
id
childNodes
nodeData

disabled
isExpanded
isSelected

label
icon
hasCaret: true;
secondaryLabel

*/

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


type TreeAction =
    | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean } }
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
                forNodeAtPath(newState, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
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
        (node: TreeNodeInfo, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
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
        dispatch({
            payload: { path: nodePath, isExpanded: false },
            type: "SET_IS_EXPANDED",
        });
    }, []);

    const handleNodeExpand = React.useCallback((_node: TreeNodeInfo, nodePath: NodePath) => {
        dispatch({
            payload: { path: nodePath, isExpanded: true },
            type: "SET_IS_EXPANDED",
        });
    }, []);

    return (
        <div style={{ marginBottom: 20 }}>
            <Tree
                contents={nodes}
                onNodeClick={handleNodeClick}
                onNodeCollapse={handleNodeCollapse}
                onNodeExpand={handleNodeExpand}
                className={Classes.ELEVATION_0}
            />
            <br />
            <p>Selected node: {!selectedNodePath ? "-none-" : nodeFromPath(selectedNodePath, nodes).label}</p>
            <p>Selected node path: <code>[{selectedNodePath?.join(', ')}]</code></p>
            <Button
                text="Reload"
                intent="primary"
                fill={true}
                onClick={() => {
                    dispatch({ type: 'RELOAD_STATE' });
                    setSelectedNodePath(null);
                }}
            />
        </div>
    );
};

export const ScratchPlace = () => {
    return (
        <NavPageView title="Define New Category (Scratch Place)">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <GridRow>
                    <GridColumn colSize={6}>
                        <div style={{ margin: '0 0 15px' }}>
                            <h5 className="bp3-heading">Select Parent Category</h5>
                        </div>
                        <ParentCatergorySelection />
                        <FormGroup label="New Category Name">
                            <InputGroup
                                placeholder="Enter category name"
                                fill={true}
                                leftIcon="merge-columns"
                            />
                        </FormGroup>
                    </GridColumn>
                    <GridColumn colSize={6}>
                        <Button
                            style={{ marginTop: 30 }}
                            text="Add Category"
                            intent="success"
                            fill={true}
                            rightIcon="group-objects"
                        />
                    </GridColumn>
                </GridRow>
            </Card>
        </NavPageView>
    );
};
