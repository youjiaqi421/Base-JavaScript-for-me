var convert = function (s, numRows) {
	// 123 23 123
	const array = Array.from({length: numRows}, () => [])

	let flag = false

	let index = 0

	for (let i = 0; i < s.length; i++) {
		array[index].push(s[i])
		if (index % (numRows - 1) === 0) {
			flag = !flag
		}

		if (flag) {
			index++
		} else {
			index--
		}
	}
	let str = ''

	array.forEach(item => {
		str += item.join('')
	})
	console.log(str)
}

convert((s = 'PAYPALISHIRING'), (numRows = 4))
