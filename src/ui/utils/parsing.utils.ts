import { ParsingAspectRatio } from '@/ui/types/utils';

export const parsingAspectRatio: ParsingAspectRatio = (value) => {
    const [x, y] = value.split(':');
    return [parseInt(x), parseInt(y)];
};