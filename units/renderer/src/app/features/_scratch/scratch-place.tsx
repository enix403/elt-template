import React from 'react';
import './style.scss';

import { Card, Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { FormGroupWithoutLabel } from 'app/components/form_group_utils';
import { NavPageView } from 'app/layout/views';
import { CatergorySelect } from 'app/components/CategorySelect';

export const ScratchPlace = () => {
    return (
        <NavPageView title="Define New Category (Scratch Place)">
            <Card elevation={2} style={{ margin: "15px 25px" }}>

                <div style={{ margin: '0 0 15px' }}>
                    <h5 className="bp3-heading">Select Parent Category</h5>
                </div>
                <CatergorySelect />

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
            </Card>
        </NavPageView>
    );
};
