import * as React from "react";

import { Intent, Button, ButtonProps, Menu, MenuItem, PopoverInteractionKind } from "@blueprintjs/core";
import { Select } from '@blueprintjs/select';
import { ICountry, countrySearch, ALL_COUNTRIES } from './countries';
import { highlightText, formatTargetText } from './util';

import { List, AutoSizer } from 'react-virtualized';
import { getReactElementSize } from 'app/helpers';

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
const MENU_ROW_HEIGHT = getReactElementSize(NO_RESULTS).height;

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
                return (
                    <MenuItem
                        active={modifiers.active}
                        disabled={modifiers.disabled}
                        labelElement={highlightText(item.code, query)}
                        onClick={handleClick}
                        intent={modifiers.active ? intent : 'none'}
                        text={highlightText(item.name, query)}
                    />
                );
            }}
            itemListRenderer={itemListProps => {
                let rows: React.ReactNode;
                if (itemListProps.filteredItems.length > 0) {
                    const activeItemIndex = itemListProps.filteredItems
                                            .findIndex(item => item.code == activeItem?.code);
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

                minimal: false,
                transitionDuration: 100,
                modifiers: {
                    flip: {enabled: false},
                    // preventOverflow: {enabled: false},
                },
                onClosed: () => { setFilterQuery(''); },
                onOpening: () => { setActiveItem(props.selectedCountry); },
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
                    scrollToRow={activeItemIndex}
                />
            }
        </AutoSizer>
    );
};
