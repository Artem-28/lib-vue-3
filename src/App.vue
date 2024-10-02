<template>
  <div class="app">
    <pre>{{ model }}</pre>
    <t-checkbox
        v-model="model"
        toggle-indeterminate
        label="test label"
        true-value="yes"
        false-value="no"
        indeterminate-value="ident"
        label-color="success"
        label-position="left"
        clickable-label
    >
      test
    </t-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TCheckbox from '@/ui/components/t-checkbox/t-checkbox';

export default defineComponent({
  name: 'App',
  components: { TCheckbox },
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
