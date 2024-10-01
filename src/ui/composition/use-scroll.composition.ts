import { onBeforeUnmount, ref } from 'vue';
import { supportPassiveScroll } from '@/ui/utils';
import { UseScroll } from '@/ui/types/composition';

export const useScroll: UseScroll = (target, callback?) => {

    const scrollTop = ref<number>(0);
    
    function onScroll(e: Event) {
        if (callback) {
            callback(e);
        }
        scrollTop.value = target.value?.scrollTop || 0;
    }

    function removeScrollEvent() {
        if (!target.value) return;
        target.value.removeEventListener('scroll', onScroll);
    }

    function setScrollEvent() {
        if (!target.value) return;
        target.value.addEventListener(
            'scroll',
            onScroll,
            supportPassiveScroll() ? { passive: true } : false,
        );
    }

    onBeforeUnmount(() => removeScrollEvent());

    return {
        setScrollEvent,
        removeScrollEvent,
        scrollTop,
    };
};