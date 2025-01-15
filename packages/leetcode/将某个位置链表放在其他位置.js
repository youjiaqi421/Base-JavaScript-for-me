class ListNode {
	constructor(val = 0, next = null) {
		this.val = val
		this.next = next
	}
}

function reorderList(head) {
	if (!head || !head.next || !head.next.next) return // 若链表为空或只有2个节点，无需处理

	let p = head
	let p1 = head
	let size = 0

	// 获取链表长度
	while (p) {
		size++
		p = p.next
	}

	// 找到倒数第二个节点
	let prev = null
	let current = head
	for (let i = 0; i < size - 2; i++) {
		// 2
		prev = current
		// 3
		current = current.next
	}

	// 将最后一个节点放到第二个位置
	//  4
	let last = current.next // 最后一个节点

	// 4 --> 2
	last.next = prev

	// 3 --> null
	current.next = null

	p1.next = last

	console.log(p1)
	// current.next = null // 断开倒数第二个节点与最后一个节点的连接

	// prev.next = last // 倒数第二个节点的前一个节点连接到最后一个节点
	// last.next = current // 最后一个节点的 `next` 指向倒数第二个节点
}

// 打印链表
function printList(head) {
	let result = []
	while (head) {
		result.push(head.val)
		head = head.next
	}
	console.log(result.join(' -> '))
}

// 生成链表
function createList(arr) {
	let dummy = new ListNode()
	let current = dummy
	for (let val of arr) {
		current.next = new ListNode(val)
		current = current.next
	}
	return dummy.next
}

let test6 = createList([1, 2, 3, 4])
reorderList(test6)
printList(test6)
