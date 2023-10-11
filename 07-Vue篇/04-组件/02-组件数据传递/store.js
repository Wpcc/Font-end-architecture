import { reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


export const store = reactive({
  msg: 'hello world',
  setMsg(msg) {
    this.msg = msg
  }
})
