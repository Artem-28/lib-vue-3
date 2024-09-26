export interface ICoords {
    x: number,
    y: number,
}

export interface IMap<T> {
    [key: string] : T
}

export interface IRelatedIdx {
    prevIdx: number;
    nextIdx: number;
    currentIdx: number;
}

export interface IRelated<T> {
    prevIdx: number;
    nextIdx: number;
    currentIdx: number;
    prev: () => IRelated<T>;
    next: () => IRelated<T>;
    data: T
}

export interface ISize {
    width: number;
    height: number;
}

export interface IPositionLtr {
    left: number;
    top: number;
}

export type HTMLElementEventHandler = {
    [K in keyof HTMLElementEventMap as `on${Capitalize<K>}`]?: (ev: HTMLElementEventMap[K]) => any;
};

export type AspectRatio = `${number}:${number}`;