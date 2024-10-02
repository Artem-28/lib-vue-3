import { IMap } from '@/ui/types/common.type';

export interface ClassesOptions {
    outline: boolean;
    focused: boolean;
    disable: boolean;
    square: boolean;
    round: boolean;
    rounded: boolean;
    flat: boolean;
    color: string;
    bgColor: string;
    opacity: string | number;
    checked: boolean;
    indeterminate: boolean;
    leftLabel: boolean;
    active: boolean;
    expanded: boolean;
    clickable: boolean;
    rotating: boolean;
    floating: boolean;
    readonly : boolean;
    mixins: string | string[];
    helpers: IMap<boolean>
}

export type ClassGenerator = (prefix: string, options: Partial<ClassesOptions>) => string[]