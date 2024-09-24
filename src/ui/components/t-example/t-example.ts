import { defineComponent } from 'vue';
import { emptyRenderFn } from '@/ui/utils';

export default defineComponent({
    name: 'TExample',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        return () => emptyRenderFn();
    },
});