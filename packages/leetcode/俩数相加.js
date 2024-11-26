function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

function addTwoNumbers(l1, l2) {
	const dummy = new ListNode()

	let head = dummy

	let curry = 0

	while (curry || l1 || l2) {
		const n1 = l1 ? l1.val : 0  // value 改为 val
		const n2 = l2 ? l2.val : 0  // value 改为 val
		const sum = n1 + n2 + curry // 需要声明 sum 变量
		curry = sum >= 10 ? Math.floor(sum / 10) : 0
		head.next = new ListNode(sum % 10)
		head = head.next
		if (l1) l1 = l1.next
		if (l2) l2 = l2.next
	}

	return dummy.next
}

const l1 = [2, 4, 3],
	l2 = [5, 6, 4]

addTwoNumbers(l1, l2)
