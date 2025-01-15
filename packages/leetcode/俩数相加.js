function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

function addTwoNumbers(l1, l2) {
	const dummy = new ListNode() // 用于返回最终结果的虚拟节点
	let head = dummy // 用于遍历链表的指针
	let curry = 0 // 用于保存进位

	// 遍历链表直到两个链表都为空且没有进位
	while (curry || l1 || l2) {
		// 获取当前节点的值，若链表为空则视为 0
		const l1v = l1 ? l1.val : 0
		const l2v = l2 ? l2.val : 0

		// 计算当前两位数的和以及进位
		const sum = l1v + l2v + curry
		curry = sum >= 10 ? 1 : 0 // 若和大于等于 10，则进位为 1，否则为 0

		// 创建新节点并链接到结果链表
		head.next = new ListNode(sum % 10)
		head = head.next // 移动 head 指针

		// 移动 l1 和 l2 到它们的下一个节点
		if (l1) l1 = l1.next
		if (l2) l2 = l2.next
	}

	return dummy.next // 返回虚拟节点后面的部分，作为最终结果链表
}

const l1 = [2, 4, 3],
	l2 = [5, 6, 4]

addTwoNumbers(l1, l2)
