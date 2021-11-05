import * as React from 'react';
import './grid.scss';

export const GridRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = React.memo(props => {
    const { className, ...otherProps } = props;
    return (
        <div {...otherProps} className={`row row-sm ${className || ''}`} />
    );
});

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | 'none';

interface GridColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    colSize: ColSize;
    screenSize?: ScreenSize;
}

export const GridColumn: React.FC<GridColumnProps> = React.memo(props => {

    const { colSize, screenSize, className, ...otherProps } = props;

    let realScreenSize: ScreenSize = screenSize || 'md';
    let screenSpec = screenSize == 'none' ? '' : realScreenSize + '-';

    return (
        <div
            {...otherProps}
            className={`col-${screenSpec}${colSize} ${className || ''}`}
        />
    );
});
