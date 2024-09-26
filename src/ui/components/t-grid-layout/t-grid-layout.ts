import { computed, defineComponent, h, PropType, provide, ref, StyleValue } from 'vue';
import { gridLayoutKye, hSlot, parsingAspectRatio } from '@/ui/utils';
import { IGridLayoutInstance, IGridLayoutItem } from '@/ui/types/components';
import TResizeObserver from '@/ui/components/t-resize-observer/t-resize-observer';
import { AspectRatio, ISize } from '@/ui/types/common.type';

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

        const containerWidth = ref<number>(0);

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
            const gap = (colNum.value - 1) * props.gap[1];
            return (containerWidth.value - margin - gap) / colNum.value;
        });
        
        const rowHeight = computed<number>(() => {
            if (!props.aspectRatio) return props.rowHeight;
            const [ratioW, ratioH] = parsingAspectRatio(props.aspectRatio);
            return colWidth.value * (ratioH / ratioW);
        });
        
        const containerHeight = computed<number>(() => {
            const gap = (rowsNum.value - 1) * props.gap[0];
            const margin = props.margin[0] + props.margin[2];
            return rowsNum.value * rowHeight.value + margin + gap;
        });
        
        const rootStyle = computed<StyleValue>(() => {
            const style: StyleValue = {};
            if (!props.autoSize) return style;
            style.height = `${containerHeight.value}px`;
            return style;
        });
        
        const grid: IGridLayoutInstance = {
            layout: props.layout,
            margin: computed(() => props.margin),
            gap: computed(() => props.gap),
            rowHeight,
            colNum,
            colWidth,
        };

        provide(gridLayoutKye, grid);

        function onResize(size: ISize) {
            containerWidth.value = size.width;
        }
        
        return () => {
            const observer = h(TResizeObserver, {
                props: { debounce: 0 },
                onResize,
            });

            return h('div', {
                style: rootStyle.value,
                class: 't-grid-layout',
            }, [observer, hSlot(slots.default)]);
        };
    },
});