// import React from 'react';
// import { Button, HTMLSelect } from "@blueprintjs/core";
import { NavPageView } from "app/layout/views";
import Flags from 'country-flag-icons/react/3x2'


export const ScratchPlace = () => {
    return (
        <NavPageView title="Scratch Place">
            <div style={{ padding: "10px 40px" }}>
                <Flags.PK title="United States" />
            </div>
        </NavPageView>
    );
};
