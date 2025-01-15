function ListNode(val, next) {
	this.val = val === undefined ? 0 : val
	this.next = next === undefined ? null : next
}

var partition = function (head, x) {
	const small = new ListNode(-1)
	let smallHead = small
	const large = new ListNode(-1)
	let largeHead = large

	while (head !== null) {
		if (head.val < x) {
			small.next = head
			small = small.next
		} else {
			large.next = head
			large = large.next
		}
		head = head.next
	}
	large.next = null
	small.next = largeHead.next
	return smallHead.next
}
