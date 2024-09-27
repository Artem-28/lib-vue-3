<template>
  <div>{{ num }}</div>
</template>

<script>
export default {
  name: 'TestComponent',
  props: {
    num: {
      type: Number,
    },
  },
  mounted() {
    console.log('mounted', this.num);
  },
};
</script>

<style scoped>

</style>