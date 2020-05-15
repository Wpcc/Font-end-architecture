<template>
	<div>
		<p>留言：{{sharedState.msg}}</p>
	</div>
</template>

<script>
	import store from '../store/index.js'
	export default {
		data(){
			return {
				sharedState:store.state
			}
		}
	}
</script>

<style>
</style>
