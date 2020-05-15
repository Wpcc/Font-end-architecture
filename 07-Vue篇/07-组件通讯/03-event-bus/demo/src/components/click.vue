<template>
	<div>
		<textarea cols="30" rows="10" v-model="msg" placeholder="请输入留言"></textarea>
		<button @click="sub">提交</button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				msg:''
			}
		},
		methods:{
			sub(){
				this.$emit('callback',this.msg)
			}
		}
	}
</script>

<style>
</style>
