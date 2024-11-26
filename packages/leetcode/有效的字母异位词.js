var isAnagram = function (s, t) {
	const window = new Map()
	if (s.length !== t.length) return false
	const need = new Map()
	for (let i of s) {
		need.set(i, (need.get(i) || 0) + 1)
	}

	for (let i = 0; i < t.length; i++) {
		const r = t[i]
		need.set(r, (need.get(r) || 0) - 1)
		if (need.get(r) < 0) return false
	}
	return true
}

isAnagram('rat', 'car')
