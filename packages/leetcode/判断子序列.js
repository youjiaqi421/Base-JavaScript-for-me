var isSubsequence = function (s, t) {
	//  s 转化为线性问题  s = []

	let arr = s.split('')
	let index = 0
	for (let i = 0; i < t.length; i++) {
		if (t[i] === arr[index]) {
			index++
		}
		if (index === arr.length) {
			return true
		}
	}

	return false
}

console.log(isSubsequence('bb', 'ahbgdc'))

// console.log(isSubsequence('axc', 'ahbgdc'))
