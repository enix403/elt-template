export interface ICategory {
    id: number;
    name: string;
    children?: ICategory[];
};
