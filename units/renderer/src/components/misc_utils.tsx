import React from 'react';
import { Divider, IDividerProps } from '@blueprintjs/core';
import classNames from 'classnames';

export const HorizontalDivider: React.FC<IDividerProps> = React.memo(props =>
    <Divider
        {...props}
        className={classNames('app-divider', props.className)}
    />
);
