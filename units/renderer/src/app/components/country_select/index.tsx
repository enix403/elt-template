import * as React from "react";

import { Button, Menu, Position, PopoverInteractionKind, MenuItem } from "@blueprintjs/core";
import { Select, ItemRenderer, IItemListRendererProps, ItemPredicate } from '@blueprintjs/select';
import { IFilm, TOP_100_FILMS } from './films';

function renderFilteredItems(
    listProps: IItemListRendererProps<any>,
    noResults?: React.ReactNode,
    initialContent?: React.ReactNode | null,
): React.ReactNode {
    if (listProps.query.length === 0 && initialContent !== undefined) {
        return initialContent;
    }
    const items = listProps.filteredItems.map(listProps.renderItem).filter(item => item != null);
    return items.length > 0 ? items : noResults;
}

export const filterFilm: ItemPredicate<IFilm> = (query, film, _index, exactMatch) => {
    const normalizedTitle = film.title.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
        return normalizedTitle === normalizedQuery;
    } else {
        return `${film.rank}. ${normalizedTitle} ${film.year}`.indexOf(normalizedQuery) >= 0;
    }
};

function highlightText(text: string, query: string) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens: React.ReactNode[] = [];
    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}

function escapeRegExpChars(text: string) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


export const renderItem: ItemRenderer<IFilm> = (film, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const text = `${film.rank}. ${film.title}`;
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={film.year.toString()}
            key={film.rank}
            onClick={handleClick}
            text={highlightText(text, query)}
        />
    );
};


const FilmSelect = Select.ofType<IFilm>();
export const SelectExample = () => {
    const [selectedItem, setSelectedItem] = React.useState<IFilm | undefined>();
    const [filterQuery, setFilterQuery] = React.useState<string>();
    return (
        <FilmSelect
            items={TOP_100_FILMS}
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
            itemPredicate={filterFilm}
            inputProps={{
                intent: "primary",
            }}
            popoverProps={{
                // minimal: true,
                popoverClassName: 'pop-temp',
                interactionKind: PopoverInteractionKind.CLICK,
                position: 'bottom-left'
            }}
            onItemSelect={setSelectedItem}
            filterable={true}
            itemsEqual='rank'
            resetOnSelect={true}
            resetOnQuery={true}
            resetOnClose={true}
            onQueryChange={setFilterQuery}
            query={filterQuery}
        >
            <Button
                icon="film"
                rightIcon="caret-down"
                text={selectedItem ? `${selectedItem.title} (${selectedItem.year})` : "(No selection)"}
            />
        </FilmSelect>
    );
}
