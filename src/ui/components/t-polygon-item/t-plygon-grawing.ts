import { defineComponent, inject, reactive, onBeforeUnmount, h, VNode, ref } from 'vue';
import { emptyRenderFn, polygonFieldKey } from '@/ui/utils';
import { ICoords } from '@/ui/types/common.type';
import { IPolygonFieldInstance } from '@/ui/types/components';

export default defineComponent({
    name: 'TPolygonDrawing',
    setup(props) {
        const $field = inject<IPolygonFieldInstance | null>(polygonFieldKey, null);
        if (!$field || !$field.refField.value) return emptyRenderFn;

        const points = ref<ICoords[]>([]);
        const floatingPoint = reactive<ICoords>({ x: 0, y: 0 });
        const isMove = ref<boolean>(false);

        function calculateCoords(shiftX: number, shiftY: number): ICoords {
            const width = $field?.size.value.width || 0;
            const height = $field?.size.value.height || 0;
            const x = shiftX / (width / 100);
            const y = shiftY / (height / 100);
            return { x, y };
        }

        function onContextMenu(e: MouseEvent) {
            e.preventDefault();
            points.value = [];
            isMove.value = false;
            $field?.refField.value?.removeEventListener('mousemove', onMouseMoveField);
            $field?.refField.value?.removeEventListener('contextmenu', onContextMenu);
        }


        function onMouseMoveField(e: MouseEvent) {
            if(!$field) return;
            isMove.value = true;
            const { x, y } = calculateCoords(e.offsetX, e.offsetY);
            points.value.push({ x, y });
            floatingPoint.x = x;
            floatingPoint.y = y;
        }

        function onClickPoint(e: MouseEvent, idx: number) {
            e.stopPropagation();
            console.log('click first point', idx);
        }

        function onClickField(e: MouseEvent) {
            const coords = calculateCoords(e.offsetX, e.offsetY);
            points.value.push(coords);

            if (points.value.length !== 1) return;
            $field?.refField.value?.addEventListener('mousemove', onMouseMoveField);
            $field?.refField.value?.addEventListener('contextmenu', onContextMenu);

        }

        $field?.refField.value?.addEventListener('click', onClickField);

        onBeforeUnmount(() => {
            $field.refField.value?.removeEventListener('click', onClickField);
            $field.refField.value?.removeEventListener('mousemove', onMouseMoveField);
            $field.refField.value?.removeEventListener('contextmenu', onContextMenu);
        });

        return () => {
            const child: VNode[] = [];
            
            points.value.forEach((data, idx) => {
                const nextData = points.value[idx + 1];
                if (nextData) {
                    const line = h('line', {
                        x1: `${data.x}%`,
                        y1: `${data.y}%`,
                        x2: `${nextData.x}%`,
                        y2: `${nextData.y}%`,
                        class: 't-polygon-item__line',
                        style: {
                            strokeWidth: '1px',
                            stroke: 'black',
                        },
                    });
                    child.push(line);
                }

                const point = h('circle', {
                    class: 't-polygon-item__point',
                    cx: `${data.x}%`,
                    cy: `${data.y}%`,
                    r: 1,
                    onClick: (e: MouseEvent) => onClickPoint(e, idx),
                });

                child.push(point);

            });

            if (isMove.value) {
                const endPointData = points.value[points.value.length - 1];
                const line = h('line', {
                    x1: `${endPointData.x}%`,
                    y1: `${endPointData.y}%`,
                    x2: `${floatingPoint.x}%`,
                    y2: `${floatingPoint.y}%`,
                    class: 't-polygon-item__line',
                    style: {
                        strokeWidth: '0.5px',
                        stroke: 'black',
                    },
                });
                const point = h('circle', {
                    class: 't-polygon-item__point--float',
                    cx: `${floatingPoint.x}%`,
                    cy: `${floatingPoint.y}%`,
                    r: 1,
                });
                child.unshift(point, line);
            }

            
            return h('g', {
                class: 't-polygon-drawing',
            }, child);
        };
    },
});