<template>
  <div>
    <div class="control-panel">
      <div class="control">
        <span>margin top</span>
        <input v-model="mTop" type="number">
      </div>
      <div class="control">
        <span>margin right</span>
        <input v-model="mRight" type="number">
      </div>
      <div class="control">
        <span>margin bottom</span>
        <input v-model="mBottom" type="number">
      </div>
      <div class="control">
        <span>margin left</span>
        <input v-model="mLeft" type="number">
      </div>
      <div class="control">
        <span>gap x</span>
        <input v-model="gapX" type="number">
      </div>
      <div class="control">
        <span>gap Y</span>
        <input v-model="gapY" type="number">
      </div>
      <div class="control">
        <span>columns</span>
        <input v-model="colNum" type="number">
      </div>
    </div>
    <t-grid-layout
        :layout="layout"
        auto-size
        :col-num="colNum"
        :margin="margin"
        :gap="gap"
        aspect-ratio="16:9"
    >
      <t-grid-layout-item
          v-for="item in layout"
          :key="item.i"
          :w="item.w"
          :h="item.h"
          :y="item.y"
          :x="item.x"
          :i="item.i"
      ></t-grid-layout-item>
    </t-grid-layout>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import TGridLayout from '@/ui/components/t-grid-layout/t-grid-layout';
import TGridLayoutItem from '@/ui/components/t-grid-layout-item/t-grid-layout-item';

export default defineComponent({
  name: 'App',
  components: { TGridLayoutItem, TGridLayout },
  setup() {
    const mTop = ref(16);
    const mRight = ref(16);
    const mBottom = ref(16);
    const mLeft = ref(16);

    const gapX = ref(16);
    const gapY = ref(16);

    const colNum = ref(4);

    const margin = computed(() => [mTop.value, mRight.value, mBottom.value, mLeft.value]);
    const gap = computed(() => [gapX.value, gapY.value]);

    const layout = reactive([
      { x:0, y:0, w:1, h:1, i:1 },
      { x:1, y:0, w:1, h:1, i:2 },
      { x:2, y:0, w:1, h:1, i:3 },
      { x:0, y:1, w:1, h:1, i:4 },
      { x:1, y:1, w:2, h:2, i:5 },
      // { x:2, y:1, w:1, h:1, i:6 },
      { x:0, y:2, w:1, h:1, i:7 },
      // { x:1, y:2, w:1, h:1, i:8 },
      // { x:2, y:2, w:1, h:1, i:9 },
      { x:0, y:3, w:1, h:1, i:10 },
      { x:1, y:3, w:1, h:1, i:11 },
      { x:2, y:3, w:1, h:1, i:12 },
      { x:3, y:0, w:1, h:1, i:13 },
      { x:3, y:1, w:1, h:1, i:14 },
      { x:3, y:2, w:1, h:1, i:15 },
      { x:3, y:3, w:1, h:1, i:16 },
    ]);

    return { layout, margin, mTop, mRight, mBottom, mLeft, gap, gapX, gapY, colNum };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}
.control-panel {
  gap: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  .control {
    display: flex;
    gap: 5px;
  }
  input {
    width: 50px;
  }
}
.cell {
  border: 1px solid black;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
