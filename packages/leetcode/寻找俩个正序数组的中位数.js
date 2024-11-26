var findMedianSortedArrays = function (nums1, nums2) {
	// 首先排序
	const sortNums = [...nums1, ...nums2].sort((a, b) => a - b)
	console.log(sortNums)
	const num = sortNums.length
	if (num % 2 === 0) {
		const r1 = num / 2
		const r2 = r1 - 1
		console.log(r1, r2)
		return (sortNums[r1] + sortNums[r2]) / 2
	} else {
		const r3 = Math.floor(num / 2)
		return sortNums[r3]
	}
}

findMedianSortedArrays([1, 2], [3, 4])
