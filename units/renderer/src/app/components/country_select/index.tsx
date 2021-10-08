import * as React from "react";

import {
    Button,
    Menu,
    PopoverInteractionKind,
    MenuItem,
    Intent,
} from "@blueprintjs/core";
import { Select } from '@blueprintjs/select';
import {
    ICountry,
    ALL_COUNTRIES,
} from './countries';
import {
    highlightText,
    renderFilteredItems,
    filterItem,
    formatTargetText
} from './util';


interface CountrySelectProps {
    selectedCountry: ICountry;
    onCountryChange?: (country: ICountry) => void;
    intent?: Intent;
    fill?: boolean;
};

const CountrySelect = Select.ofType<ICountry>();
export const CountrySelectWrapper: React.FC<CountrySelectProps> = (props) => {
    const { intent = 'none', fill = false } = props;

    const [filterQuery, setFilterQuery] = React.useState<string>();
    const [activeItem, setActiveItem] = React.useState<ICountry | null>();

    return (
        <CountrySelect
            items={ALL_COUNTRIES}
            itemRenderer={(item, { handleClick, modifiers, query }) => {
                if (!modifiers.matchesPredicate) return null;
                return (
                    <MenuItem
                        active={modifiers.active}
                        disabled={modifiers.disabled}
                        labelElement={highlightText(item.code, query)}
                        key={item.code}
                        onClick={handleClick}
                        intent={modifiers.active ? intent : 'none'}
                        text={highlightText(item.name, query)}
                    />
                );
            }}
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
                intent: intent,
            }}
            popoverProps={{
                popoverClassName: 'pop-temp',
                interactionKind: PopoverInteractionKind.CLICK,
                position: 'bottom-left',

                minimal: false,
                transitionDuration: 100,
                onClosed: () => { setFilterQuery(''); },
                onOpening: () => { setActiveItem(props.selectedCountry); },
            }}
            onItemSelect={props.onCountryChange || (_ => {})}
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
            fill={fill}
        >
            <Button
                icon="globe"
                rightIcon="caret-down"
                intent='none'
                outlined={true}
                text={
                    props.selectedCountry ?
                        formatTargetText(props.selectedCountry)
                        : "(No selection)"
                }
                fill={fill}
            />
        </CountrySelect>
    );
}
