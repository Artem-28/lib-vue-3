import { UseCheckbox } from '@/ui/types/composition';
import { computed, h, PropType, getCurrentInstance, toRaw, InputHTMLAttributes, VNode } from 'vue';
import { generateMixinClasses, hMergeSlot, hSlot, stopEndPrevent } from '@/ui/utils';
import { ColorKey, NodeChild } from '@/ui/types/utils';
import { useModelUpdate } from '@/ui/composition/use-model.composition';
import { useFormInject, useFormProps } from '@/ui/composition/use-form.composition';
import { useSize, useSizeProps } from '@/ui/composition/use-size.composition';
import { IconKey } from '@/ui/components/t-icon/sprite/use-sprite';

export const useCheckboxProps = {
    ...useFormProps,
    ...useSizeProps(24),
    modelValue: {
        required: true,
        default: null,
    },
    val: {},

    trueValue: { default: true },
    falseValue: { default: false },
    indeterminateValue: { default: null },

    checkedIcon: {
        type: String as PropType<IconKey>,
    },
    uncheckedIcon: {
        type: String as PropType<IconKey>,
    },
    indeterminateIcon: {
        type: String as PropType<IconKey>,
    },
    toggleOrder: {
        type: String as PropType<'tf' | 'ft'>,
        validator: (v: string) => v === 'tf' || v === 'ft',
        default: 'tf',
    },
    toggleIndeterminate: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        required: false,
    },
    labelPosition: {
        type: String as PropType<'top' | 'right' | 'bottom' | 'left'>,
        default: 'right',
    },
    labelColor: {
        type: String as PropType<ColorKey | string>,
        default: 'gray-primary',
    },
    color: {
        type: String as PropType<ColorKey | string>,
        default: 'primary',
    },
    keepColor: {
        type: Boolean,
        default: false,
    },
    disable: {
        type: Boolean,
        default: false,
    },
    clickableLabel: {
        type: Boolean,
        default: false,
    },
};

export const useCheckboxEmits = [useModelUpdate.event];

export const useCheckbox: UseCheckbox = (type, getInner) => {
    const vm = getCurrentInstance() as InstanceType<any>;
    const { proxy } = vm;
    const { $props: props, $slots: slots, $emit: emit } = proxy;

    const sizeStyle = useSize(props);
    
    const modelIsArray = computed<boolean>(() => 
        props.val !== void 0 && Array.isArray(props[useModelUpdate.prop]),
    );
    
    const index = computed<number>(() => {
        if (!modelIsArray.value) return -1;
        const val = toRaw(props.val);
        return props[useModelUpdate.prop].findIndex((opt: any) => toRaw(opt) === val);
    });
    
    const isTrue = computed<boolean>(() => {
        if (modelIsArray.value) return index.value !== -1;
        return toRaw(props[useModelUpdate.prop]) === toRaw(props.trueValue);
    });
    
    const isFalse = computed<boolean>(() => {
        if (modelIsArray.value) return index.value === -1;
        return toRaw(props[useModelUpdate.prop]) === toRaw(props.falseValue);
    });

    const isIndeterminate = computed(() => !isTrue.value && !isFalse.value);
    
    const classes = computed(() => {
        const row = props.labelPosition === 'right' || props.labelPosition === 'left';
        const reverse = props.labelPosition === 'left' || props.labelPosition === 'top';
        return generateMixinClasses(`t-${type}`, {
            disable: props.disable,
            helpers: {
                't-flex-center': row,
                't-flex-row': row,
                't-flex-column': !row,
                't-flex-reverse': reverse,
            },
        });
    });

    const innerClass = computed(() => {
        let state = 'indeterminate';
        
        if (isTrue.value) {
            state = 'truthy';
        } 
        
        if (isFalse.value) {
            state = 'falsy';
        }

        const classes = generateMixinClasses(`t-${type}__inner`, { mixins: state });

        if (props.keepColor || isTrue.value || isIndeterminate.value) {
            classes.push(`t-color--${props.color}`);
        }

        return classes;
    });

    const formAttrs = computed<Partial<InputHTMLAttributes>>(() => {
        const prop = { type: 'checkbox' };

        if (props.name) {
            const value = modelIsArray.value ? props.value : props.trueValue;
            Object.assign(prop, {
                '.checked': isTrue.value,
                '^checked': isTrue.value  ? 'checked' : void 0,
                name: props.name,
                value,
            });
        }

        return prop;
    });

    const injectFormInput = useFormInject(formAttrs);

    const getInnerContent = getInner(isTrue, isIndeterminate);

    function onClick(e: PointerEvent) {
        stopEndPrevent(e);
        if (props.disable) return;
        emit(useModelUpdate.event, getNextValue(), e);
    }

    function onClickLabel(e: PointerEvent) {
        if (props.clickableLabel) return;
        stopEndPrevent(e);
    }

    function getNextValue() {
        if (modelIsArray.value) {
            if (isTrue.value) {
                const val = props.modelValue.slice();
                val.splice(index.value, 1);
                return val;
            }

            return props.modelValue.concat([ props.val ]);
        }

        if (isTrue.value && (props.toggleOrder !== 'ft' || !props.toggleIndeterminate)) {
            return props.falseValue;
        }
        if (isFalse.value && (props.toggleOrder === 'ft' || !props.toggleIndeterminate)) {
            return props.trueValue;
        }
        if (isIndeterminate.value && props.toggleOrder !== 'ft') {
            return props.trueValue;
        }
        if (isIndeterminate.value && props.toggleOrder === 'ft') {
            return props.falseValue;
        }

        return props.indeterminateValue;
    }

    return () => {
        const inner = getInnerContent();
        
        if (!props.disable) {
            injectFormInput(inner, 'unshift', `t-${type}__native`);
        }
        
        const child = [
            h('div', {
                class: innerClass.value,
                style: sizeStyle.value,
            }, inner),
        ];

        let label: VNode[] | NodeChild = hSlot(slots.default);

        if (props.label) {
            label = hMergeSlot(slots.default, [ props.label ]);
        }

        if (label) {
            child.push(
                h('div', {
                    class: `t-${ type }__label t-color--${props.labelColor}`,
                    onClick: onClickLabel,
                }, label),
            );
        }

        return h('div', {
            class: classes.value,
            onClick,
        }, child);
    };
    
};