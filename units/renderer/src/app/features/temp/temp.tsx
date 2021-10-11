import React from 'react';
import { NavPageView } from "app/layout/views";
import { Card, Icon, Button } from '@blueprintjs/core';

const MyTable = React.memo(() => {
    return (
        <div className="table-wrapper">
            <div className="table-header">
                <span className="title">List of Customers</span>
                <Button
                    text="Export"
                    rightIcon="export"
                    intent="success"
                />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Name
                            <span style={{ margin: '0 10px' }}>
                                <Icon icon="filter" />
                                <Icon style={{ marginLeft: 6 }} icon="sort" />
                            </span>
                        </th>
                        <th>Country</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>

                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                    <tr>
                        <td>James Butt</td>
                        <td>Algeria</td>
                        <td>Ioni Bowcher</td>
                        <td>09/13/2015</td>
                        <td>$70,663.00</td>
                        <td>Unqualified</td>
                        <td>14%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export const ScratchPlace = () => {
    return (
        <NavPageView title="Scratch Place">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <MyTable />
            </Card>
        </NavPageView>
    );
};
