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
import { AppToaster } from '~/app/toaster';


interface ICreateCategoryFormProps {
    dataSource: () => Promise<ICategory[]>
    onSave: (name: string, parentCategory: ICategoryPreview | null) => Promise<void>
};

class CreateCategoryForm extends React.Component<ICreateCategoryFormProps, any> {
    public state = {
        data: null,
        dataFetchError: false,
        isDisabled: false,
        selectedNode: null,
        nameInputValue: "",
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

    renderForm() {
        return (
            <form
                style={{ display: 'flex', flexWrap: 'wrap', margin: "0 0 5px" }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    let selectedCategory: ICategory | null = null;
                    if (this.state.selectedNode && this.state.data) {
                        selectedCategory = findCategoryFromPath(
                            this.state.selectedNode as NodePath,
                            this.state.data,
                        );
                    }
                    try {
                        this.setState({ isDisabled: true });
                        await this.props.onSave(this.state.nameInputValue, selectedCategory);
                    }
                    catch (e: any) {
                        AppToaster.show({
                            icon: "error",
                            message: e.message,
                            intent: "danger"
                        });
                        return false;
                    }
                    finally {
                        this.setState({ isDisabled: false });
                    }

                    AppToaster.show({
                        icon: "build",
                        message: (<>
                            Category <strong>{this.state.nameInputValue}</strong> created successfully
                        </>),
                        intent: "success"
                    });
                    this.setState({ nameInputValue: "" });
                    this.refreshCategroies();
                    return false;
                }}
            >
                <FormGroup style={{ flex: 2, paddingRight: '5px', minWidth: 200 }} label="New Category Name">
                    <InputGroup
                        placeholder="Enter category name"
                        fill={true}
                        leftIcon="merge-columns"
                        value={this.state.nameInputValue}
                        onChange={(e) => this.setState({ nameInputValue: e.target.value })}
                        disabled={this.state.isDisabled}
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
                            type="submit"
                        />
                    </FormGroupWithoutLabel>
                </div>
            </form>
        );
    }

    render() {
        return (
            <React.Fragment>

                {this.renderForm()}

                <h6 className="bp3-heading">Select Parent Category</h6>

                <div style={{ margin: '15px 0' }}>
                    {this.state.dataFetchError ?
                        <Callout intent="danger" title="Error">
                            An error occured while fetching the category list.<br />
                            Please click <strong>Refresh List</strong> to try again
                        </Callout> :
                        !this.state.isDisabled && this.state.data ?
                            <CategorySelect
                                data={this.state.data}
                                selectedNodePath={this.state.selectedNode}
                                onSelectedNodeChange={nodePath =>
                                    this.setState({ selectedNode: nodePath })}
                            /> :
                            <Spinner intent="warning" size={150} />
                    }
                </div>

                <Button
                    text="Refresh List"
                    style={{ margin: "5px 0 15px" }}
                    intent="warning"
                    rightIcon="refresh"
                    small={true}
                    outlined={true}
                    onClick={() => this.refreshCategroies()}
                />
            </React.Fragment>
        );
    }
}

export const ManageCategoriesView = React.memo(() => {
    return (
        <NavPageView title="Add New Raw Material">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <h4 className="bp3-heading header-margin-b-l">
                    Raw Materials Categories
                </h4>

                <CreateCategoryForm
                    dataSource={createSourceLoader('inv:rm:cat:all')}
                    onSave={async (name, parent) => {
                        if (parent == null)
                            throw new Error("Please select a parent category");

                        const result = await window.SystemBackend.sendMessage(
                            AppChannel.DataOperations,
                            {
                                action: "inv:rm:cat:create", payload: {
                                    name, parentId: parent.id
                                }
                            }
                        );

                        if (result.type !== CommResultType.ChannelResponse) {
                            if (result.type === CommResultType.ChannelError) {
                                throw new Error(result.error);
                            } else {
                                console.log("An error occured", result);
                                throw new Error("An error occured while creating the item");
                            }
                        }
                    }}
                />
            </Card>
        </NavPageView>
    );
});

function createSourceLoader(action: string) {
    return async () => {
        const result = await window.SystemBackend.sendMessage(AppChannel.DataOperations,
            { action }
        );

        if (result.type === CommResultType.ChannelResponse) {
            return result.data as ICategory[];
        }
        else {
            console.error("A communication error occured", result);
            throw new Error("Could not fetch categories");
        }
    };
}
