# vue使用高德地图

### 1.0版本

在早期的版本，官方并没有提供 npm 的方式去引入高德API，故通过以下方式，可以引入并使用高德地图。

http://vue-gaode.rxshc.com/

该案例使用了AMap-UI组件中的拖拽组件，具体可以查看以下文档，进行了解：

https://lbs.amap.com/api/amap-ui/reference-amap-ui/other/positionpicker



### 2.0版本

2.0后的版本，官方加了 npm 的方式。

https://lbs.amap.com/api/jsapi-v2/guide/abc/load

#### 添加插件

```javascript
// AMapLoader.load
plugins:[
    'AMap.ToolBar',
    'AMap.Scale'
]
```

```javascript
// 创建的map的时候也要添加
const map = new AMap.Map(this.$refs.container)
map.addControl(new AMap.ToolBar())
map.addControl(new AMap.Scale())
```

#### 使用UI库

```javascript
// AMapLoader.load
AMapLoader.load({
    'AMapUI': { // 是否加载 AMapUI，缺省不加载
        'version': '1.1', // AMapUI 缺省 1.1
        'plugins': [ // 需要加载的 AMapUI ui插件
            'overlay/SimpleMarker'
        ]
    },
})
```

```javascript
// 创建map后 再创建UI
const AMapUI = window.AMapUI // 加载AMapUI
// 使用UI库中的组件
new AMapUI.SimpleMarker({
    map: map,
    position: map.getCenter()
})
```

#### 封装抽象

将map实例的配置抽象出来

```javascript
data(){
    return {
        mapConfig:{
            zoom:11, // 级别
            center:[116.397428, 39.90923] // 中心点坐标
        }
    }
}
methods:{
    initMap(AMap){
        const map = new AMap.Map(this.$refs.container,this.mapConfig)
    }
}
```

### 创建实例

不过那种引用，都会在window下创建Amap和AmapUI方法。通过这两个实例可以解决不同API方式的加载问题。

比如，我遇见过的项目，项目组之前同事使用的vueAmap组件加载过高德API，但之后我想使用原生也就是官方提供的loadAPI，这个时候我就可以直接通过window获取之前加载的实例，进行原生方法的封装：

```javascript
beforeCreate() {
    if (window.AMap || window.AMapUI) {
        this.$nextTick(() => {
            this.initMap(window.AMap, window.AMapUI)
        })
    }
},
methods: {
    initMap(AMap, AMapUI) {
        const map = new AMap.Map(this.$refs.container, this.mapConfig)
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
    }
}
```

