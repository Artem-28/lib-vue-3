import { HMergeSlot, HSlot, HUniqueSlot } from '@/ui/types/utils';


export const hUniqueSlot: HUniqueSlot = (slot, otherwise) => {
    if (!slot) return otherwise;
    const vnode = slot();
    
    if (!vnode) return otherwise;

    return vnode.slice();
};

export const hMergeSlot: HMergeSlot = (slot, source) => {
    if (!slot) return source;
     return source.concat(slot());
};

export const hSlot: HSlot = (slot, otherwise) => {
    if (!slot) return otherwise || [];
    return slot();
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const emptyRenderFn = () => {};