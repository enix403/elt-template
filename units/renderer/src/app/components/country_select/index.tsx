import * as React from "react";
import { Select, ItemRenderer } from '@blueprintjs/select';
import { Button, MenuItem } from "@blueprintjs/core";

interface IFilm {
    id: number;
    name: string;
};

const items: IFilm[] = [
    { name: "Film 1" },
    { name: "Film 2" },
    { name: "Film 3" },
    { name: "Film 4" },
    { name: "Film 5" },
    { name: "Film 6" },
    { name: "Film 7" },
    { name: "Film 8" },
].map((m, index) => ({ id: index + 1, ...m }));

const renderItem: ItemRenderer<IFilm> = (item, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    return (
        <MenuItem
            key={item.id}
            text={item.name}
            onClick={handleClick}
            active={modifiers.active}
            disabled={modifiers.disabled}
        />
    );
};


const FilmSelect = Select.ofType<IFilm>();
export const SelectExample = () => {
    return (
        <FilmSelect
            items={items}
            itemRenderer={renderItem}
            onItemSelect={item => {}}

            fill={true}
            matchTargetWidth={true}
            filterable={true}
            // popoverProps={{ minimal: true, usePortal: true }}
        >
            <Button
                icon="film"
                rightIcon="caret-down"
                text={"(No selection)"}
                disabled={false}
                fill={true}
            />
        </FilmSelect>
    );
}
