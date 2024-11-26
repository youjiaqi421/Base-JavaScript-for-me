var longestCommonPrefix = function (strs) {
	// 如果字符串数组为空,直接返回空字符串
	if (strs.length == 0) return ''
	
	// 取第一个字符串作为初始的公共前缀
	let ans = strs[0]
	
	// 从第二个字符串开始遍历
	for (let i = 1; i < strs.length; i++) {
		let j = 0
		// 逐个字符比较当前公共前缀和当前字符串
		for (; j < ans.length && j < strs[i].length; j++) {
			// 如果字符不相等,就跳出循环
			if (ans[j] != strs[i][j]) break
		}
        
		// 截取0到j的部分作为新的公共前缀
		ans = ans.substr(0, j)
		// 如果公共前缀为空,说明没有公共前缀,直接返回
		if (ans === '') return ans
	}
	// 返回最终的公共前缀
	return ans
}

longestCommonPrefix(['flower', 'flow', 'flight'])
