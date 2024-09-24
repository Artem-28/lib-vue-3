import { Slot, VNode } from 'vue';

export type NodeChild = (VNode | string | number)[]

export type HUniqueSlot = (slot: Slot | undefined, otherwise: VNode[]) => VNode[];
export type HMergeSlot = (slot: Slot | undefined, source: NodeChild) => NodeChild;
export type HSlot = (slot: Slot | undefined, otherwise?: VNode[]) => VNode[];