import { defineComponent, h, ref, onMounted, nextTick, reactive, provide, computed, PropType, VNode } from 'vue';
import { HTMLElementEventHandler, ICoords, IMap, ISize } from '@/ui/types/common.type';
import { IPolygonItemData } from '@/ui/types/components/t-polygon-item.type';
import { polygonFieldKey } from '@/ui/utils';
import { IPolygonFieldInstance } from '@/ui/types/components';
import { useModelUpdate } from '@/ui/composition';
import TResizeObserver from '@/ui/components/t-resize-observer/t-resize-observer';
import TPolygonDrawing from '@/ui/components/t-polygon-item/t-plygon-grawing';

export default defineComponent({
    name: 'TPolygonField',
    model: {
        ...useModelUpdate,
    },
    props: {
        modelValue: {
            type: Array as PropType<IPolygonItemData[]>,
            required: true,
        },
        drawing: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots }) {
        let nextIdx = 1;
        
        const refField = ref<HTMLElement | null>(null);
        const polygons = reactive<IMap<IPolygonItemData>>({});
        const initialize = ref<boolean>(false);
        const drawingPolygonPoints = ref<ICoords[]>([]);
        const activeIdx = ref<number>(0);
        const complete = ref<boolean>(true);
        const fieldSize = ref<ISize>({ width: 0, height: 0 });
        
        const isDrawing = computed<boolean>(() => props.drawing && initialize.value);

        const fieldInstance: IPolygonFieldInstance = {
            refField,
            size: fieldSize,
            activeIdx,
            continue: continueHandler,
            registrationPolygon,
        };

        provide(polygonFieldKey, fieldInstance);

        const eventField = computed<HTMLElementEventHandler>(() => {
            const events: HTMLElementEventHandler = {};
            // if (!complete.value) {
            //     events.onClick = setPoint;
            // }
            return events;
        });

        function registrationPolygon(polygon: IPolygonItemData) {
            const idx = nextIdx;
            polygons[nextIdx] = polygon;
            nextIdx ++;
            return idx;
        }

        function continueHandler(polygon: IPolygonItemData) {
            // activeIdx.value = polygon._idx;
            complete.value = false;
            console.log('continue handele', polygon);
        }

        function onResize(size: ISize) {
            fieldSize.value = size;
        }

        onMounted(async () => {
            await nextTick();
            initialize.value = true;
        });

        return () => {
            const polygons = props.modelValue.map(item => slots.default ? slots.default({ item }) : null );
            const child: VNode[] = [];
            
            if (isDrawing.value) {
                child.push(h(TPolygonDrawing, {
                    points: drawingPolygonPoints.value,
                }));
            }
            
            
            const observer = h(TResizeObserver, {
                props: { debounce: 0 },
                onResize,
            });
            
            const svg = h('svg', {
                class: 't-polygon-field__svg',
            }, child);

            return h('div', {
                class: 't-polygon-field',
                ref: refField,
            }, [observer, svg] );
        };
    },
});