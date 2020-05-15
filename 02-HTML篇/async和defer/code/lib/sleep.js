function sleep(time){
	var start = Date.now()
	var end = Date.now()
	while((end - start) <= time){
		end = Date.now()
	}
}
sleep(2000)
console.log('sleep')