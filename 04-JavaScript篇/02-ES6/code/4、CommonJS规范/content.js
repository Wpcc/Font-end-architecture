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

/**
 * 或者：
 * exports.content = content
 * exports.change = change
 * exports.obj = obj
 * exports.content_f = content_f
 */