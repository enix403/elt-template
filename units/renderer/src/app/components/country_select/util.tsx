// import { IItemListRendererProps, ItemPredicate } from "@blueprintjs/select";
import { ICountry } from './countries';

// export const filterItem: ItemPredicate<ICountry> = (query, item, _index, exactMatch) => {
//     const normalizedName = item.name.toLowerCase();
//     const normalizedCode = item.code.toLowerCase();
//     const normalizedQuery = query.toLowerCase();

//     if (exactMatch) {
//         console.log("Found exactMatch");
//         return normalizedName === normalizedQuery;
//     } else {
//         return `${normalizedCode}. ${normalizedName}`.indexOf(normalizedQuery) >= 0;
//     }
// };


export const formatTargetText = (country: ICountry) => `${country.name} (${country.code})`;

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
