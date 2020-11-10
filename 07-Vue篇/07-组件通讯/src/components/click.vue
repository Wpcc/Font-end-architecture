<template>
  <div>
    <textarea
      v-model="msg"
      id=""
      cols="30"
      rows="10"
      placeholder="请输入留言"
    ></textarea>
    <button @click="sub">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    sub() {
      this.$emit("callback", this.msg);
    },
  },
};
</script>

<style>
</style>