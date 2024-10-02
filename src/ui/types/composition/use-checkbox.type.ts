import { ComputedRef, VNode } from 'vue';

export type GetInnerCheckbox = (isTrue: ComputedRef<boolean>, isIndeterminate: ComputedRef<boolean>) => (() => VNode[]);

export type UseCheckbox = (type: 'checkbox', getInner: GetInnerCheckbox) => (() => VNode | void);