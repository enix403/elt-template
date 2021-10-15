import * as React from "react";

import { Intent, Icon, Button, ButtonProps, Menu, MenuItem, PopoverInteractionKind } from "@blueprintjs/core";
import { Select } from '@blueprintjs/select';
import { ICountry, countrySearch, ALL_COUNTRIES } from './countries';
import { highlightText, formatTargetText } from './util';

import { List, AutoSizer } from 'react-virtualized';
import Flags from 'country-flag-icons/react/3x2';

interface CountrySelectProps {
    selectedCountry?: ICountry;
    onCountryChange?: (country: ICountry) => void;
    intent?: Intent;
    targetButtonProps?: ButtonProps;
    fill?: boolean;
    placeholder?: string;
};

const COUNTRIES_COUNT = ALL_COUNTRIES.length;
const POPOVER_MENU_HEIGHT = 305;
const NO_RESULTS = <MenuItem disabled={true} text="No results." />;

// The following does not work in chrome (and electron)
// Thus until we find a way to make it work, we will use the manually computed
// constant height (taken from css stylesheet)
//
// import { getReactElementSize } from "app/helpers";
// const MENU_ROW_HEIGHT = getReactElementSize(NO_RESULTS).height;

const MENU_ROW_HEIGHT = 30;

window['MENU_ROW_HEIGHT'] = MENU_ROW_HEIGHT;
const FLAG_STYLES: React.CSSProperties = {
    height: MENU_ROW_HEIGHT / 2 - 2,
    marginRight: 7
};
const PLACEHOLDER_FLAG = <Icon icon="help" style={{ marginRight: 10 }} />

const CountrySelect = Select.ofType<ICountry>();
export const CountrySelectWrapper: React.FC<CountrySelectProps> = (props) => {
    const {
        intent = 'none',
        fill = false,
        targetButtonProps = {},
        placeholder = '( Select Country )'
    } = props;

    const [filterQuery, setFilterQuery] = React.useState<string>();
    const [activeItem, setActiveItem] = React.useState<ICountry | null>();

    return (
        <CountrySelect
            items={ALL_COUNTRIES}
            itemRenderer={(item, { handleClick, modifiers, query }) => {
                const cname = highlightText(item.name, query);
                const ccode = highlightText(item.code, query);

                const FlagComponent = Flags[item.code];
                const flag = FlagComponent ? <FlagComponent style={FLAG_STYLES}/> : PLACEHOLDER_FLAG;
                return (
                    <MenuItem
                        active={modifiers.active}
                        disabled={modifiers.disabled}
                        labelElement={ccode}
                        onClick={handleClick}
                        intent={modifiers.active ? intent : 'none'}
                        text={
                            <span className="center-text-flow">
                                {flag} <span className="icon-text-sm">{cname}</span>
                            </span>
                        }
                    />
                );
            }}
            itemListRenderer={itemListProps => {
                let rows: React.ReactNode;
                if (itemListProps.filteredItems.length > 0) {
                    const activeItemIndex = activeItem ? itemListProps.filteredItems
                                            .findIndex(item => item.code == activeItem.code) : -1;
                    rows = renderVirtualList(itemListProps.filteredItems, activeItemIndex, itemListProps.renderItem);
                }
                else {
                    rows = NO_RESULTS;
                }

                return (
                    <Menu
                        ulRef={itemListProps.itemsParentRef}
                        style={{
                            height: POPOVER_MENU_HEIGHT,
                            maxHeight: POPOVER_MENU_HEIGHT,
                            minWidth: 300,
                            overflowY: 'hidden',
                            margin: '5px 0 0',
                            padding: '0'
                        }}
                    >
                        {rows}
                    </Menu>
                );
            }}
            itemListPredicate={(query, items) => query ? countrySearch(query) : items}
            inputProps={{
                intent: intent,
                placeholder: `Filter ${COUNTRIES_COUNT} countries...`
            }}
            popoverProps={{
                popoverClassName: 'general-popover',
                interactionKind: PopoverInteractionKind.CLICK,
                position: 'bottom-left',
                lazy: true,

                minimal: false,
                transitionDuration: 250,
                modifiers: {
                    flip: {enabled: false}
                },
                onClosed: () => { setFilterQuery(''); },
                onOpening: () => { setActiveItem(props.selectedCountry); }
            }}
            onItemSelect={props.onCountryChange || (_ => {})}
            filterable={true}
            itemsEqual='code'

            // The following 3 props MUST be false (resetOnSelect, resetOnQuery, resetOnClose)
            resetOnSelect={false}
            resetOnQuery={false}
            resetOnClose={false}

            query={filterQuery}
            onQueryChange={setFilterQuery}
            activeItem={activeItem}
            onActiveItemChange={setActiveItem}
            fill={fill}
        >
            <Button
                icon="globe"
                rightIcon="double-caret-vertical"
                intent='none'
                outlined={true}
                text={
                    props.selectedCountry ?
                        formatTargetText(props.selectedCountry)
                        : placeholder
                }
                {...targetButtonProps}
                fill={fill}
            />
        </CountrySelect>
    );
}


function renderVirtualList<T>(
    rows: T[],
    activeItemIndex: number,
    renderItem: (item: T, index: number) => JSX.Element | null
)
{
    return (
        <AutoSizer>
            {({ width, height }) =>
                <List
                    width={width}
                    height={height}
                    rowHeight={MENU_ROW_HEIGHT}
                    rowRenderer={({ index, style, key }) =>
                        // @ts-ignore
                        React.cloneElement(renderItem(rows[index], index), {style, key})}
                    rowCount={rows.length}
                    overscanRowCount={20}
                    scrollToIndex={activeItemIndex}
                />}
        </AutoSizer>
    );
};
