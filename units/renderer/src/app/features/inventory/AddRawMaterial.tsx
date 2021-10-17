import React from 'react';
import { GridRow, GridColumn } from 'app/components/Grid';
import { NavPageView } from 'app/layout/views';
import {
    Button,
    Divider,
    NumericInput,
    FormGroup,
    HTMLSelect,
    InputGroup,
    ControlGroup,
    Card,
    Icon,
    Classes
} from '@blueprintjs/core';

import { CatergorySelect } from 'app/components/CategorySelect';

const ProductProps = () => {
    return (
        <GridRow>
            <GridColumn colSize='auto'>
                <FormGroup style={{minWidth: 200}} label="Measurement Unit">
                    <HTMLSelect fill={true}>
                        <option value="1">Individual Item</option>
                        <option value="1">Meters</option>
                        <option value="1">Inches</option>
                        <option value="1">Kilograms</option>
                        <option value="1">Grams</option>
                        <option value="1">Litres</option>
                        <option value="1">Ounces</option>
                    </HTMLSelect>
                </FormGroup>
            </GridColumn>
            <GridColumn colSize='auto'>
                <FormGroup label="Stock Keeping Unit">
                    <ControlGroup>
                        <HTMLSelect fill={true}>
                            <option value="1">Group Of</option>
                            <option value="1">Carton Of</option>
                            <option value="1">Tank Of</option>
                            <option value="1">Individual Item</option>
                        </HTMLSelect>
                        <NumericInput
                            style={{ maxWidth: 150 }}
                            placeholder="Enter Amount"
                            min={0}
                        />
                    </ControlGroup>
                </FormGroup>
            </GridColumn>
        </GridRow>
    );
};


export const AddRawMaterialView = React.memo(() => {
    return (
        <NavPageView title="Add New Raw Material">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <FormGroup
                    label="Material Name"
                    inline={false}
                >
                    <InputGroup
                        placeholder="Enter the material name"
                        fill={true}
                        leftIcon='layers'
                    />
                </FormGroup>
                <Divider style={{ marginBottom: 10 }} />

                <label className={Classes.LABEL}>Select Category</label>
                <CatergorySelect />
                <ProductProps />

                <Button
                    text="Add Raw Material"
                    intent="success"
                    icon="new-grid-item"
                />
            </Card>
        </NavPageView>
    );
});
