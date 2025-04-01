// 实现一个平拍数组
function flat(arr) {
	//首先判断是不是数组
	if (arr.length === 0) return arr
	if (!Array.isArray(arr)) return arr
	// 进行递归
	let res = []
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			res = res.concat(flat(arr[i]))
		} else {
			res.push(arr[i])
		}
	}
	return res
}

flat([1, 2, [3, 4, [5, 6]]])
console.log(flat([1, 2, [3, 4, [5, 6]]]))
