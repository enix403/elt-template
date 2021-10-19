import React from 'react';
import { NavPageView } from 'app/layout/views';
import {
    Button,
    FormGroup,
    InputGroup,
    Card,
    Spinner,
    Callout
} from '@blueprintjs/core';

import { NodePath } from '~/app/components/tree_utils';
import { FormGroupWithoutLabel } from '~/app/components/form_group_utils';
import { CategorySelect, ICategory } from 'app/components/CategorySelect';
import { ICategoryPreview, findCategoryFromPath } from 'app/components/CategorySelect/utils';
import { AppChannel, CommResultType } from '@shared/communication';


interface ICreateCategoryFormProps {
    dataSource: () => Promise<ICategory[]>
    onSave: (name: string, parentCategory: ICategoryPreview | null) => void
};

class CreateCategoryForm extends React.Component<ICreateCategoryFormProps, any> {
    public state = {
        data: null,
        dataFetchError: false,
        selectedNode: null,
        nameInputValue: ""
    };

    componentDidMount() {
        this.refreshCategroies();
    }

    refreshCategroies = async () => {
        this.setState({ data: null, dataFetchError: false, selectedNode: null });
        try {
            const data = await this.props.dataSource();
            this.setState({ data });
        }
        catch (e) {
            this.setState({ data: null, dataFetchError: true });
            console.log(e);
        }
    };

    renderForm() {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: "0 0 20px" }}>
                <FormGroup style={{ flex: 2, padding: '0 5px', minWidth: 200 }} label="New Category Name">
                    <InputGroup
                        placeholder="Enter category name"
                        fill={true}
                        leftIcon="merge-columns"
                        value={this.state.nameInputValue}
                        onChange={(e) => this.setState({ nameInputValue: e.target.value })}
                    />
                </FormGroup>
                <div
                    style={{ flex: 3, padding: '0 5px' }}
                >
                    <FormGroupWithoutLabel>
                        <Button
                            text="Add Category"
                            intent="success"
                            fill={false}
                            rightIcon="group-objects"
                            onClick={() => {
                                let selectedCategory: ICategory | null = null;
                                if (this.state.selectedNode && this.state.data) {
                                    selectedCategory = findCategoryFromPath(
                                        this.state.selectedNode as NodePath,
                                        this.state.data,
                                    );
                                }
                                this.props.onSave(this.state.nameInputValue, selectedCategory);
                            }}
                        />
                    </FormGroupWithoutLabel>
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <h5 className="bp3-heading">Select Parent Category</h5>

                <Button
                    text="Refresh List"
                    style={{ margin: "15px 0 5px" }}
                    intent="warning"
                    rightIcon="refresh"
                    small={true}
                    outlined={true}
                    onClick={() => this.refreshCategroies()}
                />

                <div style={{ margin: '15px 0' }}>
                    {this.state.dataFetchError ?
                        <Callout intent="danger" title="Error">
                            An error occured while fetching the category list.<br />
                            Please click <strong>Refresh List</strong> to try again
                        </Callout> :
                        this.state.data ?
                            <CategorySelect
                                data={this.state.data}
                                selectedNodePath={this.state.selectedNode}
                                onSelectedNodeChange={nodePath =>
                                    this.setState({ selectedNode: nodePath })}
                            /> :
                            <Spinner intent="warning" size={150} />
                    }
                </div>

                {this.renderForm()}
            </React.Fragment>
        );
    }
}

export const ManageCategoriesView = React.memo(() => {
    return (
        <NavPageView title="Add New Raw Material">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <CreateCategoryForm
                    dataSource={async () => {
                        const result = await window.SystemBackend.sendMessage(AppChannel.DataOperations, {
                            action: 'inv:rm:cat:all'
                        });

                        if (result.type === CommResultType.ChannelResponse) {
                            return result.data as ICategory[];
                        }
                        else {
                            console.error("A communication error occured", result);
                            throw new Error("Could not fetch categories");
                        }
                    }}
                    onSave={(name, parent) => {
                        console.log("Name = ", name);
                        console.log("Parent = ", parent);
                    }}
                />
            </Card>
        </NavPageView>
    );
});
