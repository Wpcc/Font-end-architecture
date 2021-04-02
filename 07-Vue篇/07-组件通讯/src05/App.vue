<template>
  <div>
    <Show :initMsg="msg"></Show>
    <Click @callback="getData"></Click>
  </div>
</template>

<script>
import Show from "./components/show.vue";
import Click from "./components/click.vue";
export default {
  data() {
    return {
      msg: "我是父元素的内容",
      some:null
    };
  },
  components: {
    Show,
    Click,
  },
  methods: {
    getData(data) {
      debugger
      this.msg = data;
    },
    setSome(){
      this.some = {}
      this.some.a = 'aaa'
      console.log(this.some)
    }
  },
  mounted(){
    this.setSome()
  }
};
</script>

<style>
</style>