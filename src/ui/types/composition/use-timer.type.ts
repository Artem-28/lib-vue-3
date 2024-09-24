export type UseTimer = (callback: CallableFunction, time: string | number) => {
    start: () => void;
    stop: () => void;
}