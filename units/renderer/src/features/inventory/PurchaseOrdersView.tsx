import React from 'react';

import { NavPageView } from '@/layout/views';
import { HTMLSelect, FormGroup, Card, Button } from '@blueprintjs/core';

import { useRawMaterialList } from '../hooks';
import { IRawMaterial } from '@shared/object_types';

export const PurchaseOrdersView: React.FC = () => {

    const [selectedRawMaterial, setSelectedRawMaterial] = React.useState<IRawMaterial>();
    const [mats, loading, refreshMats] = useRawMaterialList(allMats => {
        setSelectedRawMaterial(allMats.length > 0 ? allMats[0] : undefined);
    });

    const onSelectedRawMaterialChange = React.useCallback(e => {
        const id = e.target.value;
        setSelectedRawMaterial(mats.find(mat => mat.id == id));
    }, [mats]);

    return (
        <NavPageView title="Purchase Orders">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <h5 className="bp3-heading header-margin-b-l">
                    Generate New Purchase Order
                </h5>

                <p>Loading: {JSON.stringify(loading)}</p>

                <Button
                    text="Refresh"
                    intent="primary"
                    outlined={true}
                    onClick={() => {setSelectedRawMaterial(undefined); refreshMats()}}
                />

                <br />
                <br />

                <FormGroup
                    label="Select Raw Material"
                    helperText="The raw material that this vendor supplies"
                >
                    {loading ?
                        <Button disabled={true} fill={true} text="Loading Materials..." /> :
                        <HTMLSelect
                            fill={true}
                            value={selectedRawMaterial?.id}
                            onChange={onSelectedRawMaterialChange}
                        >
                            {mats.map(mat =>
                                <option key={mat.id} value={mat.id}>{mat.name}</option>
                            )}
                        </HTMLSelect>
                    }
                </FormGroup>

                <p>Selected material is: {selectedRawMaterial?.name}</p>

            </Card>
        </NavPageView>
    );
};
