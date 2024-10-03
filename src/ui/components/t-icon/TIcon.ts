import { computed, defineComponent, PropType, ref, h } from 'vue';
import { ColorKey } from '@/ui/types/utils';
import { generateMixinClasses } from '@/ui/utils';
import { IconKey, iconSprite } from '@/ui/components/t-icon/sprite/use-sprite';
import { useSize, useSizeProps } from '@/ui/composition';

export default defineComponent({
    name: 'TIcon',
    props: {
        ...useSizeProps(24),
        name: {
            type: String as PropType<IconKey>,
            required: true,
        },
        color: {
            type: String as PropType<ColorKey | string>,
            required: false,
        },
    },
    setup(props) {
        const refIcon = ref<HTMLElement | null>(null);
        const sizeStyle = useSize(props);

        const rootClass = computed<string[]>(() => {
            return generateMixinClasses('t-icon', {
                color: props.color,
            });
        });

        const iconName = computed(() => `#${iconSprite[props.name]}`);
        
        return () => {
            return h('i', {
                ref: refIcon,
                class: rootClass.value,
                style: sizeStyle.value,
            }, [
                    h('svg', {
                        class: 't-icon__svg',
                        viewBox: '0 0 24 24',
                    }, [
                        h('use', {
                            'xlink:href': iconName.value,
                        }),
                    ]),
                ]);
        };
    },
});