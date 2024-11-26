/**
 * 寻找和大于等于目标值的最小长度子数组
 * @param {number} target - 目标值
 * @param {number[]} nums - 输入数组
 * @return {number} - 最小长度,不存在则返回0
 */
var minSubArrayLen = function (target, nums) {
	// 定义 双指针
	let right = 0
	let left = 0

	// 定义数组
	let ans = Infinity
	let sum = 0
	while (right < nums.length) {
		const r = nums[right]
		right++
		sum += r
		while (sum >= target) {
			const l = nums[left]
			left++
			ans = Math.min(ans, right - left + 1)
			sum -= l
		}
		return ans === Infinity ? 0 : ans
	}
}
