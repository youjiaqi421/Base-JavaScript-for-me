var reverseBetween = function (head, left, right) {
	const dummy = new ListNode()
	dummy.next = head
	let p1 = dummy
	// 第一步：找到left的前一个节点

	for (let i = 0; i < left - 1; i++) {
		p1 = p1.next
	}

	// 从 p1在走right - left 步
	let rightNode = pre
	for (let i = 0; i < right - left; i++) {
		rightNode = rightNode.next
	}

	// 截取一个子链表
	let leftNode = p1.next
	let cur = rightNode.next

	// 注意：切断链接
	pre.next = null
	rightNode.next = null
}
