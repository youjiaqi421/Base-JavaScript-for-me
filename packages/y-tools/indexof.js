// 寻找下标

function indexOf(s) {
	console.log(this)
}

String.prototype.indexOf = function (char) {
	const len = this.length
	for (let i = 0; i < len; i++) {
		if (this[i] === char) {
			return i
		}
	}
	return -1
}
console.log('Hello world, welcome to the universe.'.indexOf('welcome'))
