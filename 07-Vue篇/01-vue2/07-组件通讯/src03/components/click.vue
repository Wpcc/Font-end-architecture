<template>
	<div>
		<textarea cols="30" rows="10" v-model="privateState.msg" placeholder="请输入留言"></textarea>
		<button @click="sub">提交</button>
	</div>
</template>

<script>
	import store from '../store/index.js'
	export default {
		data(){
			return {
				privateState:{
					msg:''
				}
			}
		},
		methods:{
			sub(){
				store.setMsgAction(this.privateState.msg)
			}
		}
	}
</script>

<style>
</style>
