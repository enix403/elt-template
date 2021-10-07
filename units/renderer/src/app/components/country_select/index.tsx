import * as React from "react";

import {
    Button,
    Menu,
    PopoverInteractionKind,
    MenuItem
} from "@blueprintjs/core";
import { Select, ItemRenderer } from '@blueprintjs/select';
import { ICountry, ALL_COUNTRIES, CountryCode, ALL_COUNTRIES_MAPPING_ARRAY, ALL_COUNTRIES_MAPPING } from './countries';
import {
    highlightText,
    renderFilteredItems,
    filterItem
} from './util';

export const renderItem: ItemRenderer<ICountry> = (item, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            labelElement={highlightText(item.code, query)}
            key={item.code}
            onClick={handleClick}
            text={highlightText(item.name, query)}
        />
    );
};


const CountrySelect = Select.ofType<ICountry>();
const DEFAULT_COUNTRY = ALL_COUNTRIES_MAPPING_ARRAY['PK'];
export const CountrySelectWrapper = () => {
    const [filterQuery, setFilterQuery] = React.useState<string>();

    const [activeItem, setActiveItem] = React.useState<ICountry | null>();
    const [selectedCountry, setSelectedCountry] = React.useState<ICountry | undefined>(DEFAULT_COUNTRY);

    return (
        <CountrySelect
            items={ALL_COUNTRIES}
            itemRenderer={renderItem}
            itemListRenderer={itemListProps => {
                return (
                    <Menu
                        ulRef={itemListProps.itemsParentRef}
                        style={{ maxHeight: 305, overflowY: 'auto', padding: '5px 0 0' }}
                    >
                        {renderFilteredItems(
                            itemListProps,
                            <MenuItem disabled={true} text="No results." />
                        )}
                    </Menu>
                );
            }}
            itemPredicate={filterItem}
            inputProps={{
                intent: "primary",
            }}
            popoverProps={{
                popoverClassName: 'pop-temp',
                interactionKind: PopoverInteractionKind.CLICK,
                position: 'bottom-left',

                minimal: false,
                transitionDuration: 100,
                onClosed: () => {setFilterQuery('')},
                onOpening: () => {setActiveItem(selectedCountry)},
            }}
            onItemSelect={setSelectedCountry}
            filterable={true}
            itemsEqual='code'
            resetOnSelect={false}
            resetOnQuery={true}
            resetOnClose={false}
            query={filterQuery}
            onQueryChange={setFilterQuery}
            activeItem={activeItem}
            onActiveItemChange={setActiveItem}
            scrollToActiveItem={true}
        >
            <Button
                icon="globe"
                rightIcon="caret-down"
                intent="primary"
                text={
                    selectedCountry ?
                        `${selectedCountry.name} (${selectedCountry.code})`
                        : "(No selection)"
                }
            />
        </CountrySelect>
    );
}
