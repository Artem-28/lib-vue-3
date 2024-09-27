import { IMap, IRelated, IRelatedIdx } from '@/ui/types/common.type';
import { reactive } from 'vue';

export function useRelatedData<T>(resource: T[]) {
    const step = 100;
    const idx: IRelatedIdx = {
        prevIdx: step * resource.length,
        currentIdx: step,
        nextIdx: step * 2,
    };

    let startIdx: number = idx.currentIdx;
    let endIdx: number = idx.prevIdx;
    
    const data = reactive<IMap<IRelated<T>>>({});

    function incrementIdx() {
        idx.prevIdx = idx.currentIdx;
        idx.currentIdx = idx.nextIdx;
        idx.nextIdx = Number(idx.currentIdx) + step;
    }
    
    function updateRelated() {
        resource.forEach((item, i) => {
            const isStart = i === 0;
            const isEnd = i === resource.length - 1;

            const { currentIdx, prevIdx } = idx;
            const nextIdx = isEnd ? startIdx : idx.nextIdx;
            data[currentIdx] = {
                currentIdx,
                prevIdx,
                nextIdx,
                prev: () => data[prevIdx],
                next: () => data[nextIdx],
                data: item,
            };

            if (isStart) {
                startIdx = currentIdx;
            }
            if (isEnd) {
                endIdx = currentIdx;
            }
            incrementIdx();
        });
    }
    
    function getItem(idx: number) {
        return data[idx];
    }
    
    function start() {
        return getItem(startIdx);
    }
    
    function end() {
        return getItem(endIdx);
    }
    
    updateRelated();
    
    return { start, end, getItem, data };
}