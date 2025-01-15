function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}
var deleteDuplicates = function (head) {
	// 初始化虚拟头节点
	const dummy = new ListNode(-1)
	dummy.next = head
	// p1  dummy
	let p1 = dummy
	let cur = dummy.next

	// cur 不为空
	while (cur !== null) {
		let nxt = cur.next // 添加这一行以定义nxt

		// while (cur.next !== null && cur.next.val === cur.val) {
		//     // 检查cur.next是否存在且值是否与cur相同
		//     cur = cur.next // 移动cur到下一个节点
		// }

		while (nxt !== null && nxt.val === cur.val) {
			// 修改cur.next.value为nxt.val
			cur = nxt // 修改为cur = nxt
			nxt = nxt.next // 更新nxt
		}

		if (p1.next === cur) {
			// 修改条件以检查p1.next
			p1 = p1.next // 只在p1.next等于cur时移动p1
		} else {
			p1.next = cur.next // 直接连接p1.next到cur.next
		}

		cur = cur.next // 移动cur到下一个节点
	}

	return dummy.next
}
