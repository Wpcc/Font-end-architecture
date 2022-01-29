# 程序中断

- break
  - 中断循环，不中断函数
- return
  - 中断循环，中断函数
- continue
  - 中断该次循环

```javascript
function some(){
	for(let i = 1;i<5;i++){
		console.log(i)
		if(i === 3){
			break
		}
		console.log('for')
	}
	console.log('some')
}

some()
console.log('global')

// ----- break -----
// 打印 1 for 2 for 3 some global
// ----- return -----
// 打印 1 for 2 for 3 blobal
// ----- continue -----
// 打印 1 for 2 for 3 4 for some global
```



