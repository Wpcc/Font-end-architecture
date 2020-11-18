<template>
  <div>
    <div>留言：{{ this.initMsg }}</div>
    <div>父元素的内容：{{ this.faContent }}</div>
  </div>
</template>

<script>
export default {
  props: ["initMsg"],
  computed: {
    faContent() {
      return this.$parent.msg;
    },
  },
};
</script>

<style>
</style>