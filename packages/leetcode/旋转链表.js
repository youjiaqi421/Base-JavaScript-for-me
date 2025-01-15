var rotateRight = function (head, k) {
	// 基本情况：如果 k 为 0，链表为空或只有一个节点，则无需旋转，直接返回
	if (k === 0 || !head || !head.next) {
		return head
	}

	// Step 1: 计算链表的长度
	let n = 1 // 从 1 开始计数，因为头节点已经算一个
	let cur = head

	while (cur.next) {
		cur = cur.next
		n++ // 遍历整个链表，计算长度
	}

	// Step 2: 计算旋转后的实际移动位置
	let add = n - (k % n) // 计算新的头节点的索引位置，避免 k 超过链表长度

	// 如果旋转后的位置和原来相同，无需旋转，直接返回
	if (add === n) {
		return head
	}

	// Step 3: 找到新的尾节点（即旧链表的第 add 个节点）
	let p = head
	for (let i = 0; i < add - 1; i++) {
		p = p.next
	}

	// Step 4: 断开链表并将最后的部分拼接到头部
	let newHead = p.next // 新的头节点
	p.next = null // 将新的尾节点断开，形成两部分链表

	cur.next = head // 将原尾节点（cur）指向原头节点，形成新的链表
	return newHead // 返回新的头节点
}

// 1->2->3->4->5

// 5->4->1->2->3
