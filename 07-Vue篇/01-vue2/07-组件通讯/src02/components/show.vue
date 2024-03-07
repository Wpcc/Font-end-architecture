<template>
	<div>
		<p>留言：{{msg}}</p>
	</div>
</template>

<script>
	import Bus from '../eventBus/bus.js'
	export default {
		data(){
			return {
				msg:'something'
			}
		},
		created(){
			Bus.$on('getData',parameter => {
				console.log(parameter)
				this.msg = parameter
			})
		}
	}
</script>

<style>
</style>
