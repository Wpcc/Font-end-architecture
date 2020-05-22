<template>
	<div id="app">
		<show :initMsg="msg"></show>
		<click @callback="getData"></click>
	</div>
</template>

<script>
	import click from './components/click.vue'
	import show from './components/show.vue'

	export default {
		name: 'App',
		components: {
			click,
			show
		},
		data() {
			return {
				msg: 'hello'
			}
		},
		methods: {
			getData(msg) {
				this.msg = msg
				console.log(this.msg)
			}
		}
	}
</script>

<style>
</style>
