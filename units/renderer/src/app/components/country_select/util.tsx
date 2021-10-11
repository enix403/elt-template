// import { IItemListRendererProps, ItemPredicate } from "@blueprintjs/select";
import { ICountry } from './countries';
import Flags from 'country-flag-icons/react/3x2';

const FLAG_STYLES: React.CSSProperties = {
    height: 16,
    margin: '0 10px'
};

export const formatTargetText = (country: ICountry) => {
    const FlagComponent = Flags[country.code];
    const flag = FlagComponent && <FlagComponent style={FLAG_STYLES} />;

    return (
        <span style={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <span>{country.name} ({country.code})</span> {flag}
        </span>
    );
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
