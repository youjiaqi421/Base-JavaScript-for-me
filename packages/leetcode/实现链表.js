/**
 * 链表实现
 * 可以选择使用单链表或双链表来实现
 *
 * 单链表节点包含:
 * - val: 节点值
 * - next: 指向下一个节点的指针
 *
 * 双向链表节点额外包含:
 * - prev: 指向上一个节点的指针
 *
 * 所有节点下标从0开始
 *
 * MyLinkedList类需要实现以下方法:
 *
 * @constructor MyLinkedList() - 初始化链表对象
 * @method get(index) - 获取指定位置节点的值,无效索引返回-1
 * @method addAtHead(val) - 在链表头部插入节点
 * @method addAtTail(val) - 在链表尾部追加节点
 * @method addAtIndex(index, val) - 在指定位置插入节点  如果index等于链表长度则追加到末尾  如果index大于链表长度则不插入
 * @method deleteAtIndex(index) - 删除指定位置的节点(如果索引有效)
 */

class Node {
	constructor(val) {
		this.val = val
		this.next = null
		this.prev = null
	}
}

class MyLinkedList {
	constructor() {
		this.head = new Node(null)
		this.tail = new Node(null)
		this.head.next = this.tail
		this.tail.prev = this.head
		this.size = 0
	}

	get(index) {
		const direction = index > Math.abs(index - this.size) ? this.tail.prev : this.head.next
		// 判断索引是否有效
		if (index < 0 || index >= this.size) {
			return -1
		}

		let p = direction
		for (let i = 0; i < index; i++) {
			if (!p) return -1
			p = p.next
		}
		return p
	}

	addAtHead(val) {
		// 插入头节点
		//     next ->
		// H <=======> node <==> T
		//    <-  prev

		let node = new Node(val)
		const temp = this.head.next
		temp.prev = node
		node.next = temp

		this.head.next = node
		node.prev = this.head
		this.size++
	}

	addAtTail(val) {
		/**
		 * 在链表尾部添加新节点
		 *
		 * 步骤:
		 * 1. 创建新节点 node
		 * 2. 找到尾虚拟节点的前一个节点 tmp
		 * 3. 重新设置指针:
		 *    - tmp.next -> node
		 *    - node.prev -> tmp
		 *    - node.next -> tail
		 *    - tail.prev -> node
		 *
		 */
		let node = new Node(val)
		const tmp = this.tail.prev
		tmp.next = node
		node.prev = tmp
		node.next = this.tail
		this.tail.prev = node
		this.size++
	}

	deleteAtIndex(index) {}
}
