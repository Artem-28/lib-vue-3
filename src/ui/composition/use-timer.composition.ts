import { onBeforeUnmount } from 'vue';
import { UseTimer } from '@/ui/types/composition';

export const useTimer: UseTimer = (callback, time) => {
    let timer: number | null = null;
    const timeValue: number = parseInt(String(time));

    function start() {
        if (timer !== null) return;
        timer = setTimeout(callback, timeValue);
    }

    function stop() {
        if (timer === null) return;
        clearTimeout(timer);
        timer = null;
    }

    onBeforeUnmount(() => stop());

    return { start, stop };
};