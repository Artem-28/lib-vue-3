<template>
  <div class="app">
    <pre>{{ model }}</pre>
    <t-icon name="burger" color="success" />
    <t-checkbox
        v-model="model"
        toggle-indeterminate
        checked-icon="star_fill"
        unchecked-icon="star_border"
        indeterminate-icon="burger"
        label="test label"
        true-value="yes"
        false-value="no"
        indeterminate-value="ident"
        label-color="success"
        clickable-label
        size="48"
    >
      test
    </t-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TCheckbox from '@/ui/components/t-checkbox/t-checkbox';
import TIcon from '@/ui/components/t-icon/TIcon';

export default defineComponent({
  name: 'App',
  components: { TIcon, TCheckbox },
  setup() {
    const model = ref('yes');
    return { model };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  background: black;
  width: 100vw;
  height: 100vh;
}
.app {
  padding: 10px;
}
</style>
