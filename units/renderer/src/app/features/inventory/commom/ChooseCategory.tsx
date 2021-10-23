import React from 'react';
import {
    Callout,
    Button,
    Spinner,
} from '@blueprintjs/core';
import { CategorySelect } from 'app/components/CategorySelect';
import { findCategoryFromPath } from 'app/components/CategorySelect/utils';
import type { ICategoryPreview } from 'app/components/CategorySelect/utils';
import type { NodePath } from '~/app/components/tree_utils';
import type {
    WithoutID,
    ICategory,
    IRawMaterial
} from '@shared/object_types';


interface IChooseCategoryFormProps {
    dataSource: () => Promise<ICategory[]>
    onCategoryChange: (cat: ICategoryPreview | null) => void
};


export class ChooseCategoryForm extends React.Component<IChooseCategoryFormProps, any> {
    public state = {
        data: null,
        dataFetchError: false,
        selectedNode: null,
    };

    componentDidMount() {
        this.refreshCategroies();
    }

    refreshCategroies = async () => {
        this.setState({ data: null, dataFetchError: false });
        try {
            const data = await this.props.dataSource();
            this.setState({ data });
        }
        catch (e) {
            this.setState({ data: null, dataFetchError: true });
            console.error(e);
        }
    };

    onChoose = (nodePath: NodePath | null) => {
        let selectedCategory: ICategory | null = null;
        if (nodePath && this.state.data) {
            selectedCategory = findCategoryFromPath(
                nodePath,
                this.state.data,
            );
        }
        this.setState({ selectedNode: nodePath });
        this.props.onCategoryChange(selectedCategory);
    }

    render() {
        return (
            <div style={{ margin: '0 0 15px' }}>
                {this.state.dataFetchError ?
                    <Callout intent="danger" title="Error">
                        An error occured while fetching the category list.<br />
                        Please click <strong>Refresh List</strong> to try again <br />
                        <Button
                            text="Refresh List"
                            style={{ margin: "5px 0 15px" }}
                            intent="danger"
                            rightIcon="refresh"
                            small={true}
                            outlined={true}
                            onClick={() => this.refreshCategroies()}
                        />
                    </Callout> :
                    this.state.data ?
                        <CategorySelect
                            data={this.state.data}
                            selectedNodePath={this.state.selectedNode}
                            onSelectedNodeChange={this.onChoose}
                        /> :
                        <Spinner intent="warning" size={150} />
                }
            </div>
        );
    }
}
