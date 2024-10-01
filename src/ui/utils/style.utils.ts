import { SetTransform } from '@/ui/types/utils/style.type';

export const setTransform: SetTransform = (x, y, width, height, rtl = false) => {
    const translate = `translate3d(${ rtl ? y * -1 : y }px, ${x}px, 0)`;
    return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
    };
};