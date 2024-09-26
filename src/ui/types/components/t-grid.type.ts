import { ComputedRef } from 'vue';

export interface IGridLayoutItem {
    i: number; // Индекс элемента
    x: number; // Позиция в ячейке по оси x
    y: number; // Позиция в ячейке по оси y
    w: number; // Высота ячейки
    h: number; // Ширина ячейки
}

export interface IGridLayoutInstance {
    layout: Array<IGridLayoutItem>;
    rowHeight: ComputedRef<number>;
    margin: ComputedRef<[number, number, number, number]>;
    gap: ComputedRef<[number, number]>;
    colNum: ComputedRef<number>;
    colWidth: ComputedRef<number>;
}