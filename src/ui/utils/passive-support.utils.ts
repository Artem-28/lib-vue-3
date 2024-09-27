export const supportPassiveScroll = () => {
    let supported = false;
    
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handle = () => {};
    
    try {
        const options = {
            get passive() {
                supported = true;
                return false;
            },
        };
        window.addEventListener('test', handle, options);
        window.removeEventListener('test', handle);
    } catch (_) {
        supported = false;
    }
    
    return supported;
};