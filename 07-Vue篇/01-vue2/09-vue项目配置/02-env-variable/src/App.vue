<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mounted(){
    console.log('NODE_ENV:',process.env.NODE_ENV === 'dev')
    if(process.env.NODE_ENV === 'dev'){
      // dev环境
      console.log('NODE_ENV:',process.env.NODE_ENV)
      console.log('VUE_APP_PROXY_URL',process.env.VUE_APP_PROXY_URL)
    }else if(process.env.NODE_ENV === 'test'){
      // test环境
      console.log('NODE_ENV:',process.env.NODE_ENV)
      console.log('VUE_APP_PROXY_URL',process.env.VUE_APP_PROXY_URL)
    }else if(process.env.NODE_ENV === 'prod'){
      // prod环境
      console.log('NODE_ENV:',process.env.NODE_ENV)
      console.log('VUE_APP_PROXY_URL',process.env.VUE_APP_PROXY_URL)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
