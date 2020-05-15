<template>
	<div id="app">
		<show></show>
		<click></click>
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
		}
	}
</script>

<style>
</style>
