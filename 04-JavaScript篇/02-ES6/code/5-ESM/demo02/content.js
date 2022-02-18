let content = 'content'
let obj = {
	name:'obj'
}

setTimeout(() => {
	console.log(content)
	console.log(obj)
},2000)

export {content}
export default obj