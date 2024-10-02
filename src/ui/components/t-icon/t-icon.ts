import { defineComponent, h } from 'vue';

export default defineComponent({
    name: 'TIcon',
    setup(props) {
        return () => {
            const icon = h('symbol', {
                id: 'test',
            }, h('svg', {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 -960 960 960',
                fill: 'currentColor',
            }, h('path', { d: 'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z' })));

            return h('i', {
            }, icon);
        };
    },
});