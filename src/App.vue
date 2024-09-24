<template>
  <div class="app">
      <t-polygon-field
          v-model="data"
          drawing
      >
        <template v-slot:default="{ item }">
          <t-polygon-item :data="item" />
        </template>
      </t-polygon-field>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import TPolygonField from '@/ui/components/t-polygon-field/t-polygon-field';
import TPolygonItem from '@/ui/components/t-polygon-item/t-polygon-item';

export default defineComponent({
  name: 'App',
  components: { TPolygonItem, TPolygonField },
  setup() {
    const data = reactive([
      { points: [{ x: 20, y: 50 }, { x: 30, y: 40 }, { x: 40, y: 50 }] },
    ]);

    return { data };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
.app {
  margin-top: 100px;
  width: 500px;
  height: 2500px;
}
</style>
