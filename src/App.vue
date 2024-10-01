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
       virtual-scroll
        :col-num="colNum"
        :margin="margin"
        :gap="gap"
        aspect-ratio="16:9"
    >
      <template v-slot="{ item }">
        <t-grid-layout-item
            :w="item.w"
            :h="item.h"
            :y="item.y"
            :x="item.x"
            :i="item.i"
        >
          <test-component :num="item.i" />
        </t-grid-layout-item>
      </template>

    </t-grid-layout>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import TGridLayout from '@/ui/components/t-grid-layout/t-grid-layout';
import TGridLayoutItem from '@/ui/components/t-grid-layout-item/t-grid-layout-item';
import { IGridLayoutItem } from './ui/types/components';
import TestComponent from '@/TestComponent.vue';

export default defineComponent({
  name: 'App',
  components: { TestComponent, TGridLayoutItem, TGridLayout },
  setup() {
    const mTop = ref(50);
    const mRight = ref(16);
    const mBottom = ref(16);
    const mLeft = ref(16);

    const gapX = ref(10);
    const gapY = ref(20);

    const colNum = ref(3);
    const rowNum = ref(10);

    const margin = computed(() => [mTop.value, mRight.value, mBottom.value, mLeft.value]);
    const gap = computed(() => [gapX.value, gapY.value]);
    
    const layout = computed(() => {
      const data = [];
      for (let i = 0; rowNum.value > i; i++) {
        const row = createRow(i, i * colNum.value);
        data.push(...row);
      }
      return data;
    });

    function createRow(num: number, startIdx: number) {
      const result: IGridLayoutItem[] = [];
      for (let i = 0; colNum.value > i; i++) {
        result.push({
          x: i,
          y: num,
          w: 1,
          h: 1,
          i: startIdx + i + 1,
        });
      }
      return result;
    }

    const layout = reactive([
      { x:0, y:0, w:1, h:1, i:1 },
      { x:1, y:0, w:1, h:1, i:2 },
      { x:2, y:0, w:1, h:1, i:3 },
      { x:3, y:0, w:1, h:1, i:13 },
      { x:0, y:1, w:1, h:1, i:4 },
      { x:1, y:1, w:1, h:1, i:5 },
      { x:2, y:1, w:1, h:1, i:6 },
      { x:3, y:1, w:1, h:1, i:14 },
      { x:0, y:2, w:1, h:1, i:7 },
      { x:1, y:2, w:2, h:2, i:8 },
      // { x:2, y:2, w:1, h:1, i:9 },
      { x:3, y:2, w:1, h:1, i:15 },
      { x:0, y:3, w:1, h:1, i:10 },
      // { x:1, y:3, w:1, h:1, i:11 },
      // { x:2, y:3, w:1, h:1, i:12 },
      { x:3, y:3, w:1, h:1, i:16 },
      { x:0, y:4, w:1, h:1, i:17 },
      { x:1, y:4, w:1, h:1, i:18 },
      { x:2, y:4, w:1, h:1, i:19 },
      { x:3, y:4, w:1, h:1, i:20 },
      { x:0, y:5, w:1, h:1, i:21 },
      { x:1, y:5, w:1, h:1, i:22 },
      { x:2, y:5, w:1, h:1, i:23 },
      { x:3, y:5, w:1, h:1, i:24 },
      { x:0, y:6, w:1, h:1, i:25 },
      { x:1, y:6, w:1, h:1, i:26 },
      { x:2, y:6, w:1, h:1, i:27 },
      { x:3, y:6, w:1, h:1, i:28 },
      { x:0, y:7, w:1, h:1, i:29 },
      { x:1, y:7, w:1, h:1, i:30 },
      { x:2, y:7, w:1, h:1, i:31 },
      { x:3, y:7, w:1, h:1, i:32 },
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
