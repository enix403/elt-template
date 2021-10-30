import React, { useEffect } from 'react';
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
    Spinner,
} from '@blueprintjs/core';

import { ChooseCategoryForm } from './commom/ChooseCategory';
import { AppToaster } from '@/app/toaster';
import { AppChannel, CommResultType, AllMessages } from '@shared/communication';

import type { IRawMaterial, ICategoryPreview } from '@shared/object_types';

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
                <FormGroup label="Inventory Unit">
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

const MaterialForm: React.FC<{ afterCreate?: () => void }> = props => {
    const [cat, setCat] = React.useState<ICategoryPreview | null>(null);
    const [name, setName] = React.useState('');
    const [mUnit, setMUnit] = React.useState('item');
    const [iUnit, setIUnit] = React.useState('carton');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    return (
        <React.Fragment>
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
                    disabled={isSubmitting}
                />
            </FormGroup>
            <Divider style={{ marginBottom: 10 }} />

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
                loading={isSubmitting}
                text="Add Raw Material"
                intent="success"
                icon="new-grid-item"
                onClick={async () => {
                    if (isSubmitting) return;
                    if (!cat || !cat.id || cat.id == 0) {
                        showError("Please choose a valid category");
                        return;
                    }

                    if (!name) {
                        showError("Please enter a name");
                        return;
                    }
                    setIsSubmitting(true);
                    const createMsg = new AllMessages.Inv.RM.CreateMaterial({
                        name: name,
                        category: { id: cat.id },
                        inventory_unit: iUnit,
                        measurement_unit: mUnit,
                    });

                    const result = await window.SystemBackend.sendMessage(AppChannel.Inventory, createMsg);
                    if (result.type === CommResultType.ChannelResponse) {
                        setName("");
                        props.afterCreate?.();
                    } else if (result.type === CommResultType.ChannelError) {
                        showError(result.error || "An error occured");
                    }
                    else {
                        showError("An error occured");
                    }
                    setIsSubmitting(false);
                }}
            />
        </React.Fragment>
    );
}

const RawMaterialList: React.FC<{ rows: IRawMaterial[] }> = ({ rows }) => {

    return (
        <div className="table-wrapper">
            <div className="table-header">
                <span className="title">
                    Raw Materials Added
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
                        <tr className="small">
                            <th>Name</th>
                            <th>Measurement Unit</th>
                            <th>Inventory Unit</th>
                            <th>Number Of Suppliers</th>
                            <th>Available Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(row =>
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.measurement_unit}</td>
                                <td>{row.inventory_unit} of 45</td>
                                <td>12</td>
                                <td>40</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const AddRawMaterialView = React.memo(() => {
    const [rows, setRows] = React.useState<IRawMaterial[]>([]);
    const [rowsLoading, setRowsLoading] = React.useState(false);

    const refreshList = React.useCallback(() => {
        setRowsLoading(true);
        window.SystemBackend.sendMessage(
            AppChannel.Inventory,
            new AllMessages.Inv.RM.GetAllMaterials()
        )
            .then(result => {
                if (result.type == CommResultType.ChannelResponse)
                    setRows(result.data!);
                else
                    console.error(result.error);
            })
            .finally(() => setRowsLoading(false))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        refreshList();
    }, []);

    return (
        <NavPageView title="Add New Raw Material">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <MaterialForm afterCreate={refreshList} />
            </Card>

            <Card elevation={2} style={{ margin: "15px 25px 150px" }}>
                {rowsLoading ?
                    <Spinner intent="primary" size={120} /> :
                    <RawMaterialList rows={rows} />
                }
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
