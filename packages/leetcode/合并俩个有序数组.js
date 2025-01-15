var merge = function (nums1, m, nums2, n) {
	// 使用splice()方法:
	// 1. 从索引m开始
	// 2. 删除nums1.length - m个元素(即删除后面的0)
	// 3. 将nums2数组的所有元素插入到删除位置
	// 这样就完成了两个数组的合并
	console.log(nums1.splice(m, nums1.length - m, ...nums2))
    console.log(nums1)
}

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)
