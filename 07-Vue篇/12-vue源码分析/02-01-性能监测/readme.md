# 性能监测

## API

这里说下 performance API：

- mark：打标记

  - performance.getEntriesByType('mark')：获取所有类型为 mark 的标记点
  - performance.getEntriesByName('start')：获取所有名字为 start 的标记点

- measure：测量两个标记点之间的时间

  - performance.getEntriesByType('measure')：可以获取类型为 measure 的标记点
  - performance.getEntriesByName('time')：可以获取名字为 time 的标记点

- 清除标记点和测量点

  - clearMarks
  - clearMeasures

  ```javascript
  performance.mark('start')
  
  setTimeout(() => {
      // 结束标记
      performance.mark('end')
  
      // 获取标记间的数据
      performance.measure('timeout', 'start', 'end')
  
      // 获取对应标记
      var measures = performance.getEntriesByName("timeout")
      console.log(measures)
  
      // 清除存储的标志位
      performance.clearMarks();
      performance.clearMeasures();
  }, 1000)
  ```

  

## Vue中的性能检测

我们抽取Vue中的起始点和结束点：

```javascript
// 起始点 
if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
     startTag = `vue-perf-start:${vm._uid}`
     endTag = `vue-perf-end:${vm._uid}`
     mark(startTag)
 }
```

```javascript
// 结束点
if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
}
```

可以看到 if 中的条件判断语句包括

- 不为生产环境
- config.performance 为 true
- mark 存在

其次，Vue中对于 mark 和 measure 进行了封装：

```javascript
import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      // perf.clearMeasures(name)
    }
  }
}
```

很简单封装，就是判断API是否存在，当调用measure进行测量时顺便清除mark标记。

