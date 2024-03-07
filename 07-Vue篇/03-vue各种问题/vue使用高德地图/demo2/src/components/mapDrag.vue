<template>
  <div class="m-map">
    <div ref="container" class="map" />
  </div>
</template>

<script>
import { mapKey } from '@/config/map'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'AMap',
  data() {
    return {
      mapConfig: {
        zoom: 11, // 级别
        center: [116.397428, 39.90923] // 中心点坐标
      }
    }
  },
  beforeCreate() {
    AMapLoader.load({
      'key': mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      'version': '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      'plugins': [ // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        'AMap.ToolBar',
        'AMap.Scale'
      ],
      'AMapUI': { // 是否加载 AMapUI，缺省不加载
        'version': '1.1', // AMapUI 缺省 1.1
        'plugins': [ // 需要加载的 AMapUI ui插件
          'overlay/SimpleMarker'
        ]
      },
      'Loca': { // 是否加载 Loca， 缺省不加载
        'version': '1.3.2' // Loca 版本，缺省 1.3.2
      }
    }).then(AMap => {
      this.$nextTick(() => {
        this.initMap(AMap) // 初始化map
      })
    }).catch(e => {
      console.error(e)
    })
  },
  methods: {
    initMap(AMap) {
      const map = new AMap.Map(this.$refs.container, this.mapConfig)
      const AMapUI = window.AMapUI // 加载AMapUI
      map.addControl(new AMap.ToolBar())
      map.addControl(new AMap.Scale())

      console.log(AMapUI)

      new AMapUI.SimpleMarker({
        map: map,
        position: map.getCenter()
      })
    }

  }
}
</script>

<style lang="css">
.m-map{ width:100%; height:100%; position: relative; }
.m-map .map{ width: 100%; height: 100%; }
</style>
