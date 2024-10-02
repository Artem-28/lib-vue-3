import { InputHTMLAttributes, VNode } from 'vue';

export type UseFormInject = (formAttrs?: Partial<InputHTMLAttributes>) => (
    child: VNode[], action: 'unshift' | 'push', className?: string
) => void;