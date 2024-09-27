import {
    computed,
    defineComponent,
    h, nextTick,
    onMounted,
    PropType,
    provide,
    ref,
    StyleValue,
    VNode,
} from 'vue';
import { gridLayoutKye, hSlot, parsingAspectRatio } from '@/ui/utils';
import { IGridLayoutInstance, IGridLayoutItem } from '@/ui/types/components';
import TResizeObserver from '@/ui/components/t-resize-observer/t-resize-observer';
import { AspectRatio, ISize } from '@/ui/types/common.type';
import { useScroll } from '@/ui/composition';

export default defineComponent({
    name: 'TGridLayout',
    props: {
        layout: {
            type: Array as PropType<Array<IGridLayoutItem>>,
            required: true,
        },
        autoSize: {
            type: Boolean,
            default: false,
        },
        virtualScroll: {
            type: Boolean,
            default: false,
        },
        colNum: {
            type: Number,
            default: 12,
        },
        rowHeight: {
            type: Number,
            default: 150,
        },
        maxRows: {
            type: Number,
            default: Infinity,
        },
        margin: {
            type: [Array, Object] as PropType<[number, number, number, number]>,
            default: () => ([0, 0, 0, 0]),
        },
        gap: {
            type: [Array, Object] as PropType<[number, number]>,
            default: () => ([0, 0]),
        },
        aspectRatio: {
            type: String as PropType<AspectRatio>,
            required: false,
        },
    },
    setup(props, { slots }) {

        const rootRef = ref<HTMLElement | null>(null);
        const initializeRootRef = ref(false);

        const containerWidth = ref<number>(-1);

        const { setScrollEvent, scrollTop } = useScroll(rootRef);

        const scrollBottom = computed(() => {
            if (!rootRef.value) return 0;
            return Math.max(containerHeight.value - scrollTop.value - rootRef.value.clientHeight, 0);
        });

        const autoSize = computed(() => props.virtualScroll || props.autoSize);

        const isInitialize = computed<boolean>(() =>
            (!!initializeRootRef.value && containerWidth.value > -1),
        );

        const visibleStartRowIdx = computed(() => {
            const gapY = props.gap[1];
            const offset = scrollTop.value - props.margin[0] + gapY;

            const startRow = Math.floor(offset / (rowHeight.value + gapY));

            return Math.max(0, startRow);
        });

        const visibleEndRowIdx = computed(() => {
            const gapY = props.gap[1];
            const offset = scrollBottom.value - props.margin[3] + gapY;
            const endRow = Math.floor(offset / (rowHeight.value + gapY));
            return rowsNum.value - endRow - 1;
        });

        const rowsNum = computed<number>(() => {
            let max = 0;
            let bottomY = 0;
            props.layout.forEach(item => {
                bottomY = item.y + item.h;
                if (bottomY > max) max = bottomY;
            });
            return max;
        });

        const colNum = computed<number>(() => props.colNum);

        const colWidth = computed<number>(() => {
            const margin = props.margin[1] + props.margin[3];
            const gap = (colNum.value - 1) * props.gap[0];
            return (containerWidth.value - margin - gap) / colNum.value;
        });
        
        const rowHeight = computed<number>(() => {
            if (!props.aspectRatio) return props.rowHeight;
            const [ratioW, ratioH] = parsingAspectRatio(props.aspectRatio);
            return colWidth.value * (ratioH / ratioW);
        });
        
        const containerHeight = computed<number>(() => {
            const gap = (rowsNum.value - 1) * props.gap[1];
            const margin = props.margin[0] + props.margin[2];
            return rowsNum.value * rowHeight.value + margin + gap;
        });
        
        const rootStyle = computed<StyleValue>(() => {
            const style: StyleValue = {};
            if (!autoSize.value) return style;
            style.height = `${containerHeight.value}px`;
            return style;
        });
        
        const grid: IGridLayoutInstance = {
            layout: props.layout,
            margin: computed(() => props.margin),
            gap: computed(() => props.gap),
            virtualScroll: computed(() => props.virtualScroll),
            rowHeight,
            colNum,
            colWidth,
            visibleStartRowIdx,
            visibleEndRowIdx,
        };

        provide(gridLayoutKye, grid);

        function onResize(size: ISize) {
            containerWidth.value = size.width;
        }

        onMounted(async () => {
            await nextTick();
            setScrollEvent();
            initializeRootRef.value = true;
        });
        
        return () => {
            const child: VNode[] = [];

            if (isInitialize.value) {
                props.layout.forEach(item => {
                    child.push(...hSlot(slots.default, [], { item }));
                } );
            }

            child.push(h(TResizeObserver, {
                props: { debounce: 0 },
                onResize,
            }));
            
            const container = h('div', {
                style: rootStyle.value,
                class: 't-grid-layout__container',
            }, child);

            return h('div', {
                ref: rootRef,
                class: 't-grid-layout t-hide-scrollbar',
            }, [container]);
        };
    },
});