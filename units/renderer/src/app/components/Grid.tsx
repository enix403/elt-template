import * as React from 'react';
import 'styles/grid.min.css';

interface GridRowProps extends React.PropsWithChildren<{}> {
    extraClasses?: string;
}

export const GridRow = React.memo((props: GridRowProps) => {
    return (
        <div className={`row row-sm ${props.extraClasses || ''}`}>{props.children}</div>
    );
});

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | 'none';

interface GridColumnProps extends React.PropsWithChildren<{}> {
    colSize: ColSize;
    screenSize?: ScreenSize;
    extraClasses?: string;
}

export const GridColumn: React.FC<GridColumnProps> = React.memo(props => {
    let screenSize: ScreenSize = props.screenSize ? props.screenSize : 'sm';
    let screenSpec = screenSize == 'none' ? '' : screenSize + '-';

    return (
        <div className={`col-${screenSpec}${props.colSize} ${props.extraClasses || ''}`}>
            {props.children}
        </div>
    );
});
