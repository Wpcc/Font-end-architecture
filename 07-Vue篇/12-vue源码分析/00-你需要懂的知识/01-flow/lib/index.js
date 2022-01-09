function def(obj, key, enumerable) {
  Object.defineProperty(obj, key, {
    value: obj[key],
    // 内容
    enumerable: !!enumerable,
    // 是否枚举，也就是for……in
    writable: true,
    // 是否可以改写
    configurable: true // 是否配置，即是否能够调用defineProperty进行配置

  });
}

let obj = {
  name: 'wpc'
};
def(obj, name);
let des = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(des);