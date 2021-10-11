import React from 'react';
import { NavPageView } from "app/layout/views";
import { Card, Icon, Button } from '@blueprintjs/core';
import Flags from 'country-flag-icons/react/3x2';

import './style.scss';

const TableColumnHeader: React.FC<{}> = ({ children }) => {
    return (
        <th>
            {children}
            <span style={{ margin: '0 10px' }}>
                <Icon icon="filter" style={{ color: '#dc3545' }} />
                <Icon icon="sort" style={{ color: '#dc3545', marginLeft: 6 }} />
            </span>
        </th>
    );
};

const MyTable = React.memo(() => {
    return (
        <div className="table-wrapper">
            <div className="table-header">
                <span className="title center-text-flow">
                    <Icon icon='heatmap' size={20} style={{ color: '#ffc107' }} />
                    <span className="icon-text">List of Customers</span>
                </span>
                <Button
                    text="Export To Excel"
                    rightIcon="export"
                    intent="success"
                    outlined={true}
                />
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <TableColumnHeader>Name</TableColumnHeader>
                            <TableColumnHeader>Country</TableColumnHeader>
                            <TableColumnHeader>Agent</TableColumnHeader>
                            <TableColumnHeader>Date</TableColumnHeader>
                            <TableColumnHeader>Balance</TableColumnHeader>
                            <TableColumnHeader>Status</TableColumnHeader>
                            <TableColumnHeader>Activity</TableColumnHeader>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>James Match</td>
                            <td>
                                <div className="no-idea">
                                    <div className="flag-holder">
                                        <Flags.US style={{height: 20}} />
                                    </div>
                                    United States
                                </div>
                            </td>
                            <td>Ioni Bowcher</td>
                            <td>09/13/2015</td>
                            <td>$70,663.00</td>
                            <td>Unqualified</td>
                            <td>14%</td>
                        </tr>
                        <tr>
                            <td>James Match</td>
                            <td>
                                <div className="no-idea">
                                    <div className="flag-holder">
                                        <Flags.AR style={{height: 20}} />
                                    </div>
                                    Argentina
                                </div>
                            </td>
                            <td>Ioni Bowcher</td>
                            <td>09/13/2015</td>
                            <td>$70,663.00</td>
                            <td>Unqualified</td>
                            <td>14%</td>
                        </tr>

                        <tr>
                            <td>James Match</td>
                            <td>
                                <div className="no-idea">
                                    <div className="flag-holder">
                                        <Flags.BS style={{height: 20}} />
                                    </div>
                                    Algeria
                                </div>
                            </td>
                            <td>Ioni Bowcher</td>
                            <td>09/13/2015</td>
                            <td>$70,663.00</td>
                            <td>Unqualified</td>
                            <td>14%</td>
                        </tr>

                        <tr>

                            <td>James Match</td>
                            <td>
                                <div className="no-idea">
                                    <div className="flag-holder">
                                        <Flags.AG style={{height: 20}} />
                                    </div>
                                    Antigua and Barbuda
                                </div>
                            </td>
                            <td>Ioni Bowcher</td>
                            <td>09/13/2015</td>
                            <td>$70,663.00</td>
                            <td>Unqualified</td>
                            <td>14%</td>
                        </tr>

                        <tr>
                            <td>James Match</td>
                            <td>
                                <div className="no-idea">
                                    <div className="flag-holder">
                                        <Flags.CA style={{height: 20}} />
                                    </div>
                                    Canada
                                </div>
                            </td>
                            <td>Ioni Bowcher</td>
                            <td>09/13/2015</td>
                            <td>$70,663.00</td>
                            <td>Unqualified</td>
                            <td>14%</td>
                        </tr>
                        <tr>
                            <TableColumnHeader>Name</TableColumnHeader>
                            <TableColumnHeader>Country</TableColumnHeader>
                            <TableColumnHeader>Agent</TableColumnHeader>
                            <TableColumnHeader>Date</TableColumnHeader>
                            <TableColumnHeader>Balance</TableColumnHeader>
                            <TableColumnHeader>Status</TableColumnHeader>
                            <TableColumnHeader>Activity</TableColumnHeader>
                        </tr>
                        <tr>
                            <td>James Match</td>
                            <td>
                                <div className="no-idea">
                                    <div className="flag-holder">
                                        <Flags.SV style={{height: 20}} />
                                    </div>
                                    El Salvador
                                </div>
                            </td>
                            <td>Ioni Bowcher</td>
                            <td>09/13/2015</td>
                            <td>$70,663.00</td>
                            <td>Unqualified</td>
                            <td>14%</td>
                        </tr>

                    </tbody>
                </table>
            </div>
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
