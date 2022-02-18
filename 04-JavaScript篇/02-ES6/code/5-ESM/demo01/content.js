export let content = 'hello'
let obj = {
	name:'obj'
}

setTimeout(() => {
	content = 'change hello'
	obj.name = 'change obj'
})

export default obj