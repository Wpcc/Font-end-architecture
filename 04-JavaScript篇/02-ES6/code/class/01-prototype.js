function SuperPerson(name){
	this.name = name
}

SuperPerson.prototype.say = function(){
	console.log(this.name)
}

function SubPerson(name){
	this.name = name
}

SubPerson.prototype = new SuperPerson('zhangsan')

let lisi = new SubPerson('lisi')

