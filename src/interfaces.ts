export interface Item {
    type: string;
    title: string;
    position: number;
    image: string;
};

export enum LocalStorageKeys {
    list = "list",
    lastUpdated = "lastUpdated",
}