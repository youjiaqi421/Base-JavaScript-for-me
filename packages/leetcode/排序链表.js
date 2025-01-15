var sortList = function (head) {
	if (!head || !head.next) return head
	const dummy = new ListNode()

	dummy.next = head

	let p1 = head
	let p2 = head.next
	let p = dummy // 使用 dummy 节点来简化链表操作

	while (p2) {
		if (p1.val < p2.val) {
			p.next = p1
			p1 = p1.next
		} else {
			p.next = p2
			p2 = p2.next
		}
		p = p.next // 更新 p 的位置
	}

	if (p1) {
		p.next = p1 // 如果 p1 还有剩余节点
	} else {
		p.next = p2 // 如果 p2 还有剩余节点
	}

	return dummy.next // 返回排序后的链表头
}
