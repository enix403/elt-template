import React from 'react';
import { Icon, IconProps } from '@blueprintjs/core';

export const HeaderIcon: React.FC<IconProps> = React.memo((props) => {
    const { style = {}, ...restPtops } = props;
    return (
        <Icon
            {...restPtops}
            style={{
                position: 'relative',
                top: -2,
                marginRight: 6,
                ...style
            }}
        />
    );
});
