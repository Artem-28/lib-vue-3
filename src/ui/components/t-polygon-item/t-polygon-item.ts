import {
    defineComponent,
    h,
    ref,
    onMounted,
    nextTick,
    PropType,
    withDefaults,
    defineProps,
    inject,
    computed,
    VNode,
} from 'vue';
import { IPolygonItemData } from '@/ui/types/components/t-polygon-item.type';
import { emptyRenderFn, polygonFieldKey } from '@/ui/utils';
import { IPolygonFieldInstance } from '@/ui/types/components';
import { useRelatedData } from '@/ui/composition';
import { ICoords, IRelated } from '@/ui/types/common.type';

export default defineComponent({
    name: 'TPolygonItem',
    props: {
        data: {
            type: Object as PropType<IPolygonItemData>,
            required: true,
        },
    },
    setup(props) {
        const $field = inject<IPolygonFieldInstance | null>(polygonFieldKey, null);
        if (!$field) {
            console.error('TPolygonItem должен быть дочерним элементом TPolygonField');
            return emptyRenderFn;
        }

        const idx = $field.registrationPolygon(props.data);

        const { start, data: pointsMap } = useRelatedData(props.data.points);

        const points = computed(() => Object.values(pointsMap));
        
        const complete = computed(() => props.data.points.length > 3);
        const polygon = computed(() => {
            const { width, height } = $field.size.value;
            const deltaX = width / 100;
            const deltaY = height / 100;
            return props.data.points.reduce((acc, current) => {
                const prefix = acc ? ' L' : 'M';
                acc += `${prefix} ${current.x * deltaX} ${current.y * deltaY}`;
                return acc;
            }, '');
        });

        return () => {
            console.log(points.value);
            const child: VNode[] = [];

            points.value.forEach(pointData => {
                const { data, currentIdx, nextIdx, prevIdx } = pointData;
                const point = h('circle', {
                    class: 't-polygon-item__point',
                    currentIdx,
                    nextIdx,
                    prevIdx,
                    cx: `${data.x}%`,
                    cy: `${data.y}%`,
                    r: 5,
                });

                const { data: nextData } = pointData.next();
                const line = h('line', {
                    x1: `${data.x}%`,
                    y1: `${data.y}%`,
                    x2: `${nextData.x}%`,
                    y2: `${nextData.y}%`,
                    class: 't-polygon-item__line',
                    style: {
                        strokeWidth: '4px',
                        stroke: 'black',
                    },
                });

                child.push(point, line);
            });
            
            // if (polygon.value) {
            //     child.push(h('path', {
            //         class: 't-polygon-item__path',
            //         d: polygon.value,
            //     }));
            // }

            return h('g', {
                class: 't-polygon-item',
            }, child);
        };
    },
});