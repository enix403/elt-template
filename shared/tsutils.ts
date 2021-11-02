export type TypedOmit<T, V extends keyof T> = Omit<T, V>;

export interface IndexableIterator<T> extends Iterable<T> {
    [index: number]: T;
};

export type MirrorObjectShape<T, K = any> = Record<keyof T, K>;
export type UnpackedCollection<T> = T extends (infer U)[] ? U : T;
