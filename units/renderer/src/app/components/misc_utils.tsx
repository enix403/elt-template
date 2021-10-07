import React from 'react';
import { Divider } from '@blueprintjs/core';

export const SectionHeading: React.FC<{}> = React.memo(props => {
    return (
        <h5 className="bp3-heading" style={{ marginBottom: 20 }}>
            {props.children}
        </h5>
    );
});

export const HorizontalSectionDivider = React.memo(_ =>
    <Divider style={{ marginTop: 10, marginBottom: 20 }} />
);
