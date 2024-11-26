var subsets = function (nums) {
	const res = [[]]
	let j = nums.length
	for (let i = 0; i < nums.length; i++) {
		let s = []
		// while (i < j) {}
		for (let k = 0; k < res.length; k++) {
			console.log(res[k])
			// i = 0 k = 1 nums[i] = 1    [[],[1]]
			// i = 1 k = 2 nums[i] = 2    [[],[1],[2],[1,2]]
			// i = 2 k = 3 nums[i] = 3    [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\
			s.push([...res[k], nums[i]])
		}
		res.push(...s)
	}

	console.log(res)
}

subsets([1, 2, 3])
