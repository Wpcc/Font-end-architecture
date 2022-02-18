class SuperPerson{
	constructor(name){
		this.name = name
	}
	say(){
		console.log(this.name)
	}
}

class SubPerson extends SuperPerson{
	constructor(name) {
	    super(name)
	}
}

let lisi = new SubPerson('lisi')
