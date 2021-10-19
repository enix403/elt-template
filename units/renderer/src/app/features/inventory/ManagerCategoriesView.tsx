import React from 'react';
import { GridRow, GridColumn } from 'app/components/Grid';
import { NavPageView } from 'app/layout/views';
import {
    Button,
    FormGroup,
    InputGroup,
    Card,
    Spinner,
    Callout
} from '@blueprintjs/core';

import { FormGroupWithoutLabel } from '~/app/components/form_group_utils';
import { CategorySelect2, ICategory } from 'app/components/CategorySelect/select2';
import { AppChannel, CommResultType } from '@shared/communication';

/*const getMockData = (): ICategory[] => [
    {
        id: 1,
        name: "Electronic Accessories",
        children: [
            { id: 0, name: "E Sub-Category 1" },
            { id: 1, name: "E Sub-Category 2" },
            { id: 2, name: "E Sub-Category 3" },
        ]
    },
    { id: 4, name: "Groceries & Pets" },
    {
        id: 2, name: "Home & Lifestyle",
        children: [
            { id: 0, name: "H Sub-Category 1" },
            {
                id: 1,
                name: "H Sub-Category 2",
                children: [
                    { id: 0, name: "Sub H Sub-Category 1" },
                ]
            },
            { id: 2, name: "H Sub-Category 3" },
        ]
    },
    {
        id: 3, name: "Sports & Outdoor",
        children: [
            { id: 0, name: "S Sub-Category 1" },
            { id: 1, name: "S Sub-Category 2" },
            { id: 2, name: "S Sub-Category 3" },
        ]
    },
];*/

interface ICreateCategoryFormProps {
    dataSource: () => Promise<ICategory[]>
};

class CreateCategoryForm extends React.Component<ICreateCategoryFormProps, any> {
    public state = {
        data: null,
        dataFetchError: false
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
            console.log(e);
        }
    };

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
                            <CategorySelect2 data={this.state.data} /> :
                            <Spinner intent="warning" size={150} />
                    }
                </div>


                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormGroup style={{ flex: 2, padding: '0 5px', minWidth: 200 }} label="New Category Name">
                        <InputGroup
                            placeholder="Enter category name"
                            fill={true}
                            leftIcon="merge-columns"
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
                            />
                        </FormGroupWithoutLabel>
                    </div>
                </div>
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
                />
            </Card>
        </NavPageView>
    );
});
