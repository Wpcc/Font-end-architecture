let content = 'hello'
let obj = {
	name:'obj'
}

function change(){
	content = 'world'
	console.log(content)
}
// setTimeout(() => {
// 	content = 'world222'
// 	console.log(content)
// 	obj.name = 'obj222'
// },1000)

// export {content,change}

export default obj
// export default {
// 	content,
// 	change
// } 
