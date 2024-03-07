<template>
	<div>
		<textarea cols="30" rows="10" v-model="msg" placeholder="请输入留言"></textarea>
		<button @click="sub">提交</button>
	</div>
</template>

<script>
	import Bus from '../eventBus/bus.js'
	export default {
		data(){
			return {
				msg:''
			}
		},
		methods:{
			sub(){
				Bus.$emit('getData',this.msg)
			}
		}
	}
</script>

<style>
</style>
