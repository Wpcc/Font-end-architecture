<template>
  <div>
    <Show :initMsg="msg"></Show>
    <Click @callback="getData" ref="click"></Click>
    <button @click="submit">父元素的按钮</button>
  </div>
</template>

<script>
import Show from "./components/show.vue";
import Click from "./components/click.vue";
export default {
  data() {
    return {
      msg: "",
    };
  },
  components: {
    Show,
    Click,
  },
  methods: {
    getData(data) {
      this.msg = data;
    },
    submit() {
      // 通过ref获取子元素的DOM节点
      // 然后触发该节点的函数，或者获取该节点的数据
      this.$refs.click.sub();
    },
  },
};
</script>

<style>
</style>