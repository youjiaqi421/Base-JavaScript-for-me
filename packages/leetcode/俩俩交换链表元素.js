var swapPairs = function (head) {
	const dummy = new ListNode(0)
	dummy.next = head
	let p1 = dummy

	while (p1.next && p1.next.next) {
		let p2 = p1.next
		let p3 = p1.next.next

		// // Swap the two nodes
		p2.next = p3.next // p2's next will point to the node after p3
		p3.next = p2 // p3's next will point to p2

		// // Update p1 to the new position, where p1 should now point to p3
		p1.next = p3

		// // Move p1 to the next pair
		p1 = p2
	}

	return dummy.next // Return the new head of the list
}
