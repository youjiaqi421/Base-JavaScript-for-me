// function rotate(nums, k) {
// 	return nums.splice(0, 0, ...nums.splice(nums.length - k, nums.length))
// 	// console.log(nums)
// }

function rotate(nums, k) {
	const n = nums.length
	// 声明一个新数组
	const newArr = new Array(n)
	for (let i = 0; i < n; ++i) {
		// 放到旋转后的位置上
		console.log((i + k) % n, i)
		newArr[(i + k) % n] = nums[i]
	}
	console.log(newArr)
}

rotate([1, 2, 3, 4, 5, 6, 7], 3)
