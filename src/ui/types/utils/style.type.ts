import { StyleValue } from 'vue';

export type SetTransform = (x: number, y: number, width: number, height: number, rtl?: boolean ) => StyleValue;

export interface Colors {
    primary: string;
    success: string;
    error: string;
    warning: string;
    white: string;
    'dark-primary': string;
    'dark-secondary': string;
    'white-primary': string;
    'gray-primary': string;
    current: string;
    inherit: string;
}

export type ColorKey = keyof Colors;

export interface Opacity {
    '0': string | number;
    '10': string | number;
    '20': string | number;
    '30': string | number;
    '40': string | number;
    '50': string | number;
    '60': string | number;
    '70': string | number;
    '80': string | number;
    '90': string | number;
    '100': string | number;
}

export type OpacityKey = keyof Opacity;