let str = 'aabbbcccccdddcccccc'

function findStringNumber() {
	let obj = {}
	let j = 1
	for (let i = 0; i < str.length; i++) {
		if (str[i] === str[i + 1]) {
			j++
		} else {
			if (obj[str[i]]) {
				obj[str[i]] = Math.max(obj[str[i]], j)
			} else {
				obj[str[i]] = j
			}
			j = 1
		}
	}

	return obj
}

const strObj = findStringNumber(str)
console.log(strObj)
