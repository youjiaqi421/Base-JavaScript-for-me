function minCoverString(s, t) {
	const need = new Map()
	const window = new Map()
	let right = 0
	let left = 0
	let vaild = 0
	let start = 0,
		len = Infinity
	for (let i of t) {
		need.set(i, (need.get(i) || 0) + 1)
	}

	while (right < s.length) {
		// 获取字符串
		const r = s[right]
		// 右窗口增加
		right++
		if (need.has(r)) {
			window.set(r, (window.get(r) || 0) + 1)
			if (window.get(r) === need.get(r)) {
				// need 和 window 数据都有时 vaild增加
				vaild++
			}
		}

		// 判断左侧窗口
		while (vaild === need.size) {
			// 更新最小覆盖子串

			if (right - left < len) {
				start = left
				len = right - left
			}

			let l = s[left]

			left++

			if (need.has(l)) {
				if (need.get(l) === window.get(l)) {
					vaild--
				}

				window.set(l, window.get(l) - 1)
			}
			console.log(window)
		}
		console.log(s.substr(start, len))
	}
}

minCoverString('AAABC', 'ABC')
