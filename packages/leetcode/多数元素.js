var majorityElement = function (nums) {
	let obj = {}

	let harf = nums.length / 2
	for (let i = 0; i < nums.length; i++) {
		obj[nums[i]] = (obj[nums[i]] || 0) + 1
	}
	
    if(obj[nums[i]] > half) return nums[i]
}

majorityElement([3, 2, 3])
