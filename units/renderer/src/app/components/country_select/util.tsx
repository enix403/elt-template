import { IItemListRendererProps, ItemPredicate } from "@blueprintjs/select";
import { ICountry } from './countries';

export function renderFilteredItems(
    listProps: IItemListRendererProps<any>,
    noResults?: React.ReactNode,
): React.ReactNode {
    const items = listProps.filteredItems.map(listProps.renderItem).filter(item => item != null);
    return items.length > 0 ? items : noResults;
}

export const filterItem: ItemPredicate<ICountry> = (query, item, _index, exactMatch) => {
    const normalizedName = item.name.toLowerCase();
    const normalizedCode = item.code.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
        return normalizedName === normalizedQuery;
    } else {
        return`${normalizedCode}. ${normalizedName}`.indexOf(normalizedQuery) >= 0;
    }
};

export function highlightText(text: string, query: string) {
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
