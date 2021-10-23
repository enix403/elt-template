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
    Classes,
    Card,
} from '@blueprintjs/core';

import { ChooseCategoryForm } from './commom/ChooseCategory';
import type { ICategoryPreview } from 'app/components/CategorySelect/utils';

import { AppToaster } from '@/app/toaster';

import { AppChannel, CommResultType, AllMessages } from '@shared/communication';

type ProductPropNames = 'm_unit' | 'i_unit';

type IProductPropertiesProps = {
    store: {
        [key in ProductPropNames]: {
            value: string | number;
            setValue: (val: any) => void;
        }
    }
};

const ProductProperties: React.FC<IProductPropertiesProps> = ({ store }) => {
    return (
        <GridRow>
            <GridColumn colSize='auto'>
                <FormGroup style={{ minWidth: 200 }} label="Measurement Unit">
                    <HTMLSelect
                        value={store.m_unit.value}
                        onChange={e => store.m_unit.setValue(e.target.value)}
                        fill={true}
                    >
                        <option value="item">Individual Item</option>
                        <option value="mt">Meters</option>
                        <option value="in">Inches</option>
                        <option value="kg">Kilograms</option>
                        <option value="gm">Grams</option>
                        <option value="lt">Litres</option>
                        <option value="oz">Ounces</option>
                    </HTMLSelect>
                </FormGroup>
            </GridColumn>
            <GridColumn colSize='auto'>
                <FormGroup label="Iventory Unit">
                    <ControlGroup>
                        <HTMLSelect
                            value={store.i_unit.value}
                            onChange={e => store.i_unit.setValue(e.target.value)}
                            fill={true}
                        >
                            <option value="carton">Carton Of</option>
                            <option value="tank">Tank Of</option>
                            <option value="item">Individual Item</option>
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
    const [cat, setCat] = React.useState<ICategoryPreview | null>(null);
    const [name, setName] = React.useState<string>('');
    const [mUnit, setMUnit] = React.useState<string>('item');
    const [iUnit, setIUnit] = React.useState<string>('carton');

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
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <Divider style={{ marginBottom: 10 }} />

                {/*<h6 className="bp3-heading">Choose Category</h6>*/}

                <label className={Classes.LABEL}>Select Category</label>
                <ChooseCategoryForm
                    dataSource={async () => {
                        const result = await window.SystemBackend.sendMessage(
                            AppChannel.Inventory,
                            new AllMessages.Inv.RM.GetAllCategories()
                        );

                        if (result.type === CommResultType.ChannelResponse) {
                            return result.data!;
                        }
                        else {
                            console.error("A communication error occured", result);
                            throw new Error("Could not fetch categories");
                        }
                    }}
                    onCategoryChange={cat => {
                        // console.log(cat);
                        setCat(cat);
                    }}
                />
                <ProductProperties
                    store={{
                        m_unit: { value: mUnit, setValue: setMUnit },
                        i_unit: { value: iUnit, setValue: setIUnit },
                    }}
                />

                <Button
                    text="Add Raw Material"
                    intent="success"
                    icon="new-grid-item"
                    onClick={async () => {
                        if (!cat || !cat.id || cat.id == 0) {
                            showError("Please choose a valid category");
                            return;
                        }

                        if (!name) {
                            showError("Please enter a name");
                            return;
                        }

                        const createMsg = new AllMessages.Inv.RM.CreateMaterial({
                            name: name,
                            categoryId: cat.id,
                            inventory_unit: iUnit,
                            measurement_unit: mUnit,
                        });

                        const result = await window.SystemBackend.sendMessage(AppChannel.Inventory, createMsg);
                        if (result.type === CommResultType.ChannelResponse) {
                            setName("");
                        } else if (result.type === CommResultType.ChannelError) {
                            showError(result.error || "An error occured");
                        }
                        else {
                            showError("An error occured");
                        }
                    }}
                />
            </Card>
        </NavPageView>
    );
});


function showError(msg: string) {
    AppToaster.show({
        icon: "error",
        message: msg,
        intent: "danger"
    })
}
