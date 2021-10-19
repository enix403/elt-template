import React from 'react';
import { Button, Card, Spinner } from '@blueprintjs/core';

import { CategorySelect2, ICategory } from '~/app/components/CategorySelect/select2';
import { NavPageView } from '~/app/layout/views';

const getMockData = (): ICategory[] => [
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
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class TempCategorySelectExample extends React.Component<any, any> {
    public state = {
        data: null
    };

    async componentDidMount() {
        await delay(4000);
        this.refreshCategroies();
    }

    refreshCategroies = () => {
        this.setState({ data: getMockData() });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.data ? <CategorySelect2
                    data={this.state.data}
                />: <Spinner intent="success" size={60} />}

                <br />

                <Button
                    intent="danger"
                    text="Refresh It"
                    onClick={() => this.refreshCategroies()}
                />
            </React.Fragment>
        );
    }
}

export const ScratchPlace = () => {
    return (
        <NavPageView title="Category Select 2">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <div style={{ margin: "15px 0" }}>
                    <TempCategorySelectExample />
                </div>
            </Card>
        </NavPageView>
    );
};
