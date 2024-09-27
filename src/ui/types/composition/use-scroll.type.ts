import { Ref } from 'vue';

export type UseScroll = (target: Ref<HTMLElement | null>, callback?: (e: Event) => void) => {
    setScrollEvent: () => void;
    removeScrollEvent: () => void;
    scrollTop: Ref<number>
}