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
  },
};
</script>

<style>
</style>