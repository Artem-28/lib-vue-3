import { computed, defineComponent, h } from 'vue';
import { useCheckbox, useCheckboxEmits, useCheckboxProps } from '@/ui/composition';
import { useModelUpdate } from '@/ui/composition';
import { GetInnerCheckbox } from '@/ui/types/composition';


const bgNode = h('div', {
    key: 'svg',
    class: 't-checkbox__bg',
}, [
    h('svg', {
        class: 't-checkbox__svg',
        viewBox: '0 0 24 24',
    }, [
        h('path', {
            class: 't-checkbox__truthy',
            d: 'M3 3h18v18H3V3z',
        }),

        h('path', {
            class: 't-checkbox__indeterminate',
            d: 'M4,14H20V10H4',
        }),
    ]),
]);

export default defineComponent({
    name: 'TCheckbox',

    model: useModelUpdate,
    props: useCheckboxProps,
    emits: useCheckboxEmits,

    setup(props) {
        const getInner: GetInnerCheckbox = (isTrue, isIndeterminate) => {
            const icon = computed(() => {
                if (isTrue.value) return props.checkedIcon;
                if (isIndeterminate.value) return props.indeterminateIcon;
                return props.uncheckedIcon;
            });
            
            return () => [ bgNode ];
        };
        return useCheckbox('checkbox', getInner);
    },
});