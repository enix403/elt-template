export type TypedOmit<T, V extends keyof T> = Omit<T, V>;

export interface IndexableIterator<T> extends Iterable<T> {
    [index: number]: T;
};
