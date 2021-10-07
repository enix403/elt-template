import { Button, HTMLSelect } from "@blueprintjs/core";
import { NavPageView } from "app/layout/views";
import { SelectExample } from 'app/components/country_select';

const MySelect = () => {
    return (
        <>
            <SelectExample />
        </>
    );
};

export const ScratchPlace = () => {
    return (
        <NavPageView title="Scratch Place">
            <div style={{ padding: "10px 40px" }}>
                {/*<Button*/}
                    {/*text="Add Vendor"*/}
                    {/*rightIcon="chevron-right"*/}
                    {/*intent="primary"*/}
                {/*/>*/}
                {/*<br />*/}
                {/*<br />*/}
                <MySelect />
            </div>
        </NavPageView>
    );
};
