function lengthOfLongestSubstring(s) {
	let window = {}
	let left = 0,
		right = 0
	let res = 0
	while (right < s.length) {
		const r = s[right]
		right++
		window[r] = (window[r] || 0) + 1
       

        // 遇见 重复数据了进入  abac
		while (window[r] > 1) {

			const l = s[left]
			left++
			console.log(window)
			window[l]--
		}
		res = Math.max(max, right - left)
	}

	return res
}

lengthOfLongestSubstring('abcabcbb')

lengthOfLongestSubstring('pwwkew')
