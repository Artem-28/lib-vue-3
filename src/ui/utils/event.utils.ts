export function stopEndPrevent(e: MouseEvent) {
    if (e.cancelable) {
        e.preventDefault();
    }
    e.stopPropagation();
}