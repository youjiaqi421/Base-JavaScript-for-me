var isPalindrome = function (s) {
	// 1.对字符串进行编排 大写转换小写,去除空格,符号

	let str = s.toLowerCase().replace(/[^a-z0-9]/g, '')
	console.log(str)

	let left = 0
	let right = str.length - 1

	while (left < right) {
		if (str[left] !== str[right]) {
			return false
		}
		left++
		right--
	}
	return true
}

isPalindrome('A man, a plan, a canal: Panama')
