function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

var removeNthFromEnd = function (head, n) {
	const dummy = new ListNode()
	dummy.next = head
	let p1 = head
	let p2 = head
	for (let i = 0; i < n; i++) {
		p1 = p1.next
	}

	while (p1 !== null) {
		p1 = p1.next
		p2 = p2.next
	}

	p2.next = p2.next.next

    return dummy.next
}
