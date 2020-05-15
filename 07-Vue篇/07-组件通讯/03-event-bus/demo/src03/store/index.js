export default {
	debug:true,
	state:{
		msg:'hello'
	},
	setMsgAction(newVal){
		if(this.debug){
			console.log('setMessageAction triggered with',newVal)
		}
		this.state.msg = newVal
	},
	clearMsgAction(){
		if(this.debug){
			console.log('setMsgAction triggered')
			this.state.msg = ''
		}
	}
}