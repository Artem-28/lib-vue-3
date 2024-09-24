import { defineComponent, markRaw, getCurrentInstance, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { emptyRenderFn } from '@/ui/utils';
import { ISize } from '@/ui/types/common.type';
import { useTimer } from '@/ui/composition';

const hasObserver = typeof ResizeObserver !== 'undefined';

export default markRaw(defineComponent({
    name: 'TResizeObserver',
    props: {
        debounce: {
            type: [ String, Number ],
            default: 100,
        },
    },
    emits: ['resize'],

    setup(props, { emit }) {
        if (!hasObserver) return emptyRenderFn;

        const { proxy } = getCurrentInstance() || {};
        let observer: ResizeObserver | null = null;
        const size: ISize = { width: -1, height: -1 };
        let targetEl: HTMLElement | null = null;

        const { start: startTimer, stop: stopTimer } = useTimer(emitEvent, props.debounce);

        function trigger() {
            window.requestAnimationFrame(() => {
                if (props.debounce === 0 || props.debounce === '0') {
                    emitEvent();
                    return;
                }
                startTimer();
            });
        }

        function emitEvent() {
            stopTimer();
            if (!targetEl) return;
            const { offsetWidth: width, offsetHeight: height } = targetEl;

            if (width !== size.width || height !== size.height ) {
                size.width = width;
                size.height = height;
                emit('resize', size);
            }
        }

        async function init(stop = false) {
            if (proxy) {
                targetEl = proxy.$el.parentNode as HTMLElement;
                observer = new ResizeObserver(trigger);
                observer.observe(targetEl);
                return;
            }
            if (!stop) {
                await nextTick();
                await init(true);
            }
        }

        onMounted(() => init());

        onBeforeUnmount(() => {
            observer?.disconnect();
            observer = null;
            targetEl = null;
        });

        return emptyRenderFn;
    },
}));
