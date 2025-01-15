var canConstruct = function (ransomNote, magazine) {
	const hash = new Map()
	for (const c of magazine) {
		hash.set(c, (hash.get(c) ?? 0) + 1)
	}

	for (const c of ransomNote) {
		if (hash.get(c) === undefined) return false

		hash.set(c, hash.get(c) - 1)
		if (hash.get(c) === -1) return false
	}

	return true
}

canConstruct((ransomNote = 'aa'), (magazine = 'aab'))
