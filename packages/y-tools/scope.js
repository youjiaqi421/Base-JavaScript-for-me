function scope() {
	console.log(a)
	var a = 1
	return function b() {
		console.log(a)
	}
}

var a = 2
scope()
