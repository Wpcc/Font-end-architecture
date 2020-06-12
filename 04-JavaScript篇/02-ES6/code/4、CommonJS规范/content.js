// 导出
let content = 'hello'
let obj = {
	name:'zhangsan'
}

function change(){
	content = 'world'
	obj.name = 'lisi'
}

function content_f(){
	return content
}

module.exports = {
	content,
	change,
	obj,
	content_f
}