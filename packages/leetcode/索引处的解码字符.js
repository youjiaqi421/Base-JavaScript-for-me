var decodeAtIndex = function (S, K) {
	let size = 0
	const N = S.length

	// 计算解码字符串的长度
	for (let i = 0; i < N; i++) {
		if (/\d/.test(S[i])) {
			size *= Number(S[i]) // 遇到数字时，累乘
		} else {
			size++ // 遇到字母时，长度加 1
		}
	}

	// 从后往前遍历字符串
	for (let i = N - 1; i >= 0; i--) {
		    K %= size       // 将 K 限制在当前大小范围内
		if (K === 0 && /[a-zA-Z]/.test(S[i])) {
			// 当 K 是 0 且当前字符是字母
			return S[i]    // 返回字母
		}

		if (/\d/.test(S[i])) {
			size /= Number(S[i]) // 遇到数字时，除以数字
		} else {
			size-- // 遇到字母时，长度减 1
		}
	}

	return '' // 默认返回空字符串
}
