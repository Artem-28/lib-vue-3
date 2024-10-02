import { toArray } from '@/ui/utils';
import { ClassGenerator, Colors, Opacity } from '@/ui/types/utils';
import { IMap } from '@/ui/types/common.type';

export const generateMixinClasses: ClassGenerator = (prefix, options) => {
    const createClass = (prefix: string, mixin: string) => `${prefix}--${mixin}`;

    const classes: string[] = [prefix];
    if (options.outline) {
        classes.push(createClass(prefix, 'outline'));
    }
    if (options.disable) {
        classes.push(createClass(prefix, 'disable'));
    }
    if (options.flat) {
        classes.push(createClass(prefix, 'flat'));
    }
    if (options.square) {
        classes.push(createClass(prefix, 'square'));
    }
    if (options.round) {
        classes.push(createClass(prefix, 'round'));
    }
    if (options.rounded) {
        classes.push(createClass(prefix, 'rounded'));
    }
    if (options.checked) {
        classes.push(createClass(prefix, 'checked'));
    }
    if (options.indeterminate) {
        classes.push(createClass(prefix, 'indeterminate'));
    }
    if (options.active) {
        classes.push(createClass(prefix, 'active'));
    }
    if (options.expanded) {
        classes.push(createClass(prefix, 'expanded'));
    }
    if (options.leftLabel) {
        classes.push(createClass(prefix, 'left-label'));
    }
    if (options.color) {
        classes.push(createClass('t-color', options.color));
    }
    if (options.bgColor) {
        classes.push(createClass('t-bg-color', options.bgColor));
    }
    if (options.opacity) {
        classes.push(createClass('t-opacity', `${options.opacity}`));
    }
    if (options.clickable) {
        classes.push(createClass(prefix, 'clickable'));
    }
    if (options.rotating) {
        classes.push(createClass(prefix, 'rotating'));
    }
    if (options.floating) {
        classes.push(createClass(prefix, 'floating'));
    }
    if (options.focused) {
        classes.push(createClass(prefix, 'focused'));
    }
    if (options.readonly) {
        classes.push(createClass(prefix, 'readonly'));
    }
    if (options.mixins) {
        toArray(options.mixins).forEach(mixin => {
            if (mixin) {
                classes.push(createClass(prefix, mixin));
            }
        });
    }
    if (options.helpers) {
        const helpers: IMap<boolean> = options.helpers;
        Object.keys(helpers).forEach(key => {
            if (!helpers[key]) return;
            classes.push(key);
        });
    }
    return classes;
};


export const colorAlias: Colors = {
    primary: 'primary',
    error: 'error',
    success: 'success',
    warning: 'warning',
    white: 'white',
    'white-primary': 'white-primary',
    'dark-primary': 'dark-primary',
    'dark-secondary': 'dark-secondary',
    'gray-primary': 'gray-primary',
    current: 'current',
    inherit: 'inherit',
};

export const opacityAlias: Opacity = {
    '0': '0',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    '60': '60',
    '70': '70',
    '80': '80',
    '90': '90',
    '100': '100',
};
