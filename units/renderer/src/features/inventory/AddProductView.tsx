import React from 'react';
import { GridRow, GridColumn } from '@/components/Grid';
import { NavPageView } from '@/layout/views';
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

const CategorySelection = () => {

    return (
        <GridRow>
            <GridColumn colSize={7}>
                <FormGroup
                    label="Select Category"
                    inline={false}
                    helperText={"You can create a new category if it does not exist"}
                >
                    <HTMLSelect fill={true}>
                        <option value="0">Electronic Appliances</option>
                        <option value="2">Category 1</option>
                        <option value="3">Category 2</option>
                        <option value="4">Category 3</option>
                    </HTMLSelect>
                </FormGroup>
            </GridColumn>
            <GridColumn colSize={5}>
                <FormGroup
                    label={<>&nbsp;</>}
                    inline={false}
                >
                    <Button
                        fill={false}
                        text="Create a new (sub)category"
                        intent='primary'
                        icon="path"
                    />
                </FormGroup>

            </GridColumn>
        </GridRow>
    );
};

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
                    label="Stock Keeping Unit"
                >
                    <ControlGroup>
                        <HTMLSelect>
                            <option value="1">Single Item</option>
                            <option value="1">Crate Of</option>
                            <option value="1">Container Of</option>
                        </HTMLSelect>
                        <NumericInput
                            fill={true}
                            // style={{ maxWidth: 130 }}
                            buttonPosition='none'
                            // leftIcon="shopping-cart"
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

const ProductVariantHeaders = React.memo(() => {
    return (
        <GridRow>
            <GridColumn colSize={4}><FormGroup label="Name" /></GridColumn>
            <GridColumn colSize={3}><FormGroup label="Size" /></GridColumn>
            <GridColumn colSize={3}><FormGroup label="Color/Other Identity" /></GridColumn>
        </GridRow>
    );
});

const ProductVariant = () => {
    return (
        <GridRow>
            <GridColumn colSize={4}>
                <FormGroup>
                    <InputGroup
                        defaultValue="Variant 1"
                        placeholder="Enter the variant name"
                        fill={true}
                        leftIcon='selection'
                    />
                </FormGroup>
            </GridColumn>
            <GridColumn colSize={3}>
                <FormGroup>
                    <InputGroup
                        placeholder="Enter size"
                        fill={true}
                        leftIcon="zoom-to-fit"
                    />
                </FormGroup>
            </GridColumn>

            <GridColumn colSize={3}>
                <FormGroup>
                    <InputGroup
                        placeholder="Enter color"
                        fill={true}
                        leftIcon="tint"
                    />
                </FormGroup>
            </GridColumn>
            <GridColumn colSize={2}>
                <FormGroup>
                    <Button
                        intent="warning"
                        text="Remove"
                        icon="remove"
                        minimal={true}
                        fill={true}
                    />
                </FormGroup>
            </GridColumn>
        </GridRow>
    );
};

export const AddProductView = React.memo(() => {
    return (
        <NavPageView title="Add a New Product">
            <div style={{
                padding: "10px 40px"
            }}>
                <GridRow>
                    <GridColumn colSize={12}>
                        <FormGroup
                            label="Product Name"
                            inline={false}
                        >
                            <InputGroup
                                // intent='danger'
                                placeholder="Enter the product name"
                                fill={true}
                                leftIcon='layers'
                            />
                        </FormGroup>
                    </GridColumn>
                </GridRow>

                <Divider style={{ marginBottom: 20 }} />
                <CategorySelection />

                <Divider style={{ marginBottom: 20 }} />
                <ProductProps />

                <Divider style={{ marginBottom: 20 }} />
                <h5 className="bp3-heading">
                    <Icon icon="duplicate" size={16} />
                    &nbsp;
                    Variants
                </h5><br />

                <ProductVariantHeaders />
                <ProductVariant />
                <ProductVariant />
                <ProductVariant />

                <br />
                <Button
                    text="Add Another Variant"
                    icon="add-to-artifact"
                    outlined={true}
                />
            </div>
        </NavPageView>
    );
});
