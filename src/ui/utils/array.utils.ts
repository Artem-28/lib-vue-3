import { ToArrayTransformer } from '@/ui/types/utils';


export const toArray: ToArrayTransformer = (value) => {
    if (value == null) return [] as any;
    if (Array.isArray(value)) return value as any;
    return [value] as any;
};