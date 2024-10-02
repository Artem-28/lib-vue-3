import { h } from 'vue';
import { UseFormInject } from '@/ui/types/composition';

export const useFormInject: UseFormInject = (formAttrs) => {
    return (child, action, className) => {
        const attrs = formAttrs?.value || {};

        const input = h('input', {
            class: 't-hidden' + (className ? ` ${className}` : ''),
            ...attrs,
        });

        child[action](input);
    };
};