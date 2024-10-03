import { computed, StyleValue } from 'vue';

export const useSizeProps = (defaultValue: string | number) => {
    return {
        size: {
            type: [String, Number],
            default: defaultValue,
        },
    };
};

export const useSize = (props: any) => {
    return computed<StyleValue>(() => {
        if (props.size === void 0) return {};
        const size = parseInt(props.size);
        if (isNaN(size) || size === void 0) return {};
        return {
            fontSize: `${size}px`,
        };
    });
};