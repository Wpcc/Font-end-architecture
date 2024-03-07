<template>
  <div id="app">
    <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
  </div>
</template>

<script>
import mapDrag from './components/mapDrag'
export default {
  name: 'App',
  components: {
    mapDrag
  },
  data () {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      }
    }
  },
  methods: {
    dragMap (data) {
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      }
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body{
  width:100%;
  height:100%;
}
#app {
  width:100%;
  height:100%;
}
</style>
