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
    Icon
} from '@blueprintjs/core';

const ProductProps = () => {
    return (
        <GridRow>
            <GridColumn colSize={3}>
                <FormGroup
                    label="Measurement Unit"
                >
                    <HTMLSelect fill={true}>
                        <option value="1">Meters</option>
                        <option value="1">Inches</option>
                        <option value="1">Kilograms</option>
                        <option value="1">Grams</option>
                        <option value="1">Litres</option>
                        <option value="1">Ounces</option>
                        <option value="1">Quantity</option>
                    </HTMLSelect>
                </FormGroup>
            </GridColumn>
            <GridColumn colSize={5}>
                <FormGroup
                    label="Weight"
                >
                    <ControlGroup>
                        <HTMLSelect fill={true}>
                            <option value="1">Kilograms (kg)</option>
                            <option value="1">Grams (gm)</option>
                        </HTMLSelect>
                        <NumericInput
                            style={{ maxWidth: 130 }}
                            leftIcon="shopping-cart"
                            placeholder="Enter weight"
                        />
                    </ControlGroup>
                </FormGroup>
            </GridColumn>
            <GridColumn colSize={4}>
                <FormGroup
                    label="Type"
                >
                    <HTMLSelect fill={true}>
                        <option value="1">Single Item</option>
                        <option value="1">Container Of Items</option>
                    </HTMLSelect>
                </FormGroup>
            </GridColumn>

        </GridRow>
    );
};



export const AddRawMaterial = React.memo(() => {
    return (
        <NavPageView title="Add a New Product">
            <div style={{
                padding: "10px 40px"
            }}>
                <GridRow>
                    <GridColumn colSize={12}>
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
                    </GridColumn>
                </GridRow>


                <Divider style={{ marginBottom: 20 }} />
                <ProductProps />
            </div>
        </NavPageView>
    );
});
