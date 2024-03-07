<template>
  <div class="m-map">
    <div id="js-container" class="map"></div>
  </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'
import { mapKey } from '@/config/map.js'
export default {
  props: {
    lat:{
      type:Number,
      default:0
    },
    lng:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      dragStatus: false,
      AMapUI: null,
      AMap: null,
      // 配置相关

    }
  },
  methods: {
    // 实例化地图
    initMap () {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = this.AMapUI = window.AMapUI
      let AMap = this.AMap = window.AMap

      AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        // 配置相关
        let mapConfig = {
          zoom: 16,
        }
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat]
        }
        console.log(mapConfig)

        // 创建地图
        let map = new AMap.Map('js-container', mapConfig)

        // 启用工具条
        AMap.plugin(['AMap.ToolBar'], function () {
          map.addControl(new AMap.ToolBar({
            position: 'RB'
          }))
        })
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map // 依赖地图对象
        })
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on('success', positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true
          } else {
            this.$emit('drag', positionResult)
          }
        })
        // 启动拖放
        positionPicker.start()
      })
    }
  },
  async created () {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.4.15&key=${mapKey}`)
      await remoteLoad('http://webapi.amap.com/ui/1.1/main.js')
      this.initMap()
    }
  }
}
</script>

<style lang="css">
.m-map{ width:100%; height:100%; position: relative; }
.m-map .map{ width: 100%; height: 100%; }
.m-map .search{ position: absolute; top: 10px; left: 10px; width: 285px; z-index: 1; }
.m-map .search input{ width: 180px; border: 1px solid #ccc; line-height: 20px; padding: 5px; outline: none; }
.m-map .search button{ line-height: 26px; background: #fff; border: 1px solid #ccc; width: 50px; text-align: center; }
.m-map .result{ max-height: 300px; overflow: auto; margin-top: 10px; }
</style>