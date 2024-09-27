import { computed, defineComponent, h, inject, StyleValue } from 'vue';
import { emptyRenderFn, gridLayoutKye, hSlot, setTransform } from '@/ui/utils';
import { IGridLayoutInstance } from '@/ui/types/components';
import { IPositionLtr, ISize } from '@/ui/types/common.type';

export default defineComponent({
    name: 'TGridLayoutItem',
    props: {
        i: {
            type: Number,
            required: true,
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        h: {
            type: Number,
            required: true,
        },
        w: {
            type: Number,
            required: true,
        },
    },
    setup(props, { slots }) {
        const $grid = inject<IGridLayoutInstance | null>(gridLayoutKye, null);
        if (!$grid) {
            console.error('TGridLayoutItem должен быть дочерним элементом TGridLayout');
            return emptyRenderFn;
        }

        const isVisible = computed<boolean>(() => {
            const { visibleStartRowIdx, visibleEndRowIdx, virtualScroll } = $grid;
            if (!virtualScroll.value) return true;
            return props.y + props.h > visibleStartRowIdx.value && props.y <= visibleEndRowIdx.value;
        });

        const innerX = computed<number>(() => {
            if (props.x + props.w > $grid.colNum.value) return 0;
            return props.x;
        });

        const innerW = computed<number>(() => {
            if (props.x + props.w > $grid.colNum.value){
                return Math.min(props.w, $grid.colNum.value);
            }
            return props.w;
        });
        
        const rootStyle = computed<StyleValue>(() => {
            const { top, left, height, width } = calcPosition(innerX.value, props.y, innerW.value, props.h);
            return setTransform(top, left, width, height);
        });

        function calcPosition(x: number, y: number, w: number, h: number) {
            const colWidth = $grid?.colWidth.value || 0;
            const rowHeight = $grid?.rowHeight.value || 0;

            const gapX = $grid?.gap.value[0] || 0;
            const gapY = $grid?.gap.value[1] || 0;

            const mTop = $grid?.margin.value[0] || 0;
            const mLeft = $grid?.margin.value[3] || 0;

            const shiftX = x * gapX + mLeft;
            const shiftY = y * gapY + mTop;

            const offsetX = Math.max(0, w - 1) * gapX;
            const offsetY = Math.max(0, h - 1) * gapY;
            
            const position: ISize & IPositionLtr = {
                left: Math.round(colWidth * x + shiftX ),
                top: Math.round(rowHeight * y + shiftY ),
                width: Math.round(colWidth * w + offsetX),
                height: Math.round(rowHeight * h + offsetY),
            };

            if (w === Infinity ) {
                position.width = w;
            }

            if (h === Infinity) {
                position.height = h;
            }

            return position;
        }

        return () => {
            if (!isVisible.value) return emptyRenderFn();
            return h('div', {
                class: 't-grid-layout-item',
                style: rootStyle.value,
            }, hSlot(slots.default));
        };
    },
});