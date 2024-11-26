var findPeakElement = function (nums) {
	// 定义俩个索引

	if (nums.length <= 1) return 0
	let l = 0
	let k = 1
	let ans = 0
	while (k < nums.length) {
		// 如果 l小于k 并且 k 大于 k + 1 那么k 就是峰值
		if (nums[l] < nums[k] && nums[k] > nums[k + 1]) {
			return k
		} else {
			ans = nums[0] > nums[k] ? 0 : k
		}
		l++
		k++
	}

	return ans
}


var findPeakElement = function (nums) {
	if (nums.length <= 1) return 0

	// 检查第一个元素
	if (nums[0] > nums[1]) return 0

	// 检查最后一个元素
	if (nums[nums.length - 1] > nums[nums.length - 2]) return nums.length - 1

	// 检查中间元素
	for (let i = 1; i < nums.length - 1; i++) {
		if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
			return i
		}
	}

	return 0
}


console.log(findPeakElement([1, 2]))
console.log(findPeakElement([2, 1]))
console.log(findPeakElement([1, 2, 3]))
console.log(findPeakElement([3, 2, 1]))
console.log(findPeakElement([1, 3, 2, 3]))
