import { IPolygonItemData } from '@/ui/types/components';
import { Ref } from 'vue';
import { ISize } from '@/ui/types/common.type';

export interface IPolygonFieldInstance {
    refField: Ref<HTMLElement | null>;
    size: Ref<ISize>
    activeIdx: Ref<number>
    continue: (polygon: IPolygonItemData) => void;
    registrationPolygon: (polygon: IPolygonItemData) => number;
}