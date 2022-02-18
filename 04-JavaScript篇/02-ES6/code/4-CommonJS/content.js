// 导出
let content = 'hello'
let obj = {
	name:'zhangsan'
}

setImmediate(() => {
	console.log('immediate')
	content = 'change hello'
	obj.name = 'change zhangsan'
})

module.exports = {
	content,
	obj,
}

/**
 * 或者：
 * exports.content = content
 * exports.change = change
 * exports.obj = obj
 * exports.content_f = content_f
 */