/**
 * 寻找链表倒数第k个节点
 * 解题思路:
 * 1. 使用双指针 p1 和 p2
 * 2. p1 先走 k 步,此时 p1 和 p2 之间相隔 k 个节点
 * 3. p1 和 p2 同时走,当 p1 到达链表末尾(null)时
 * 4. p2 正好指向倒数第 k 个节点
 * 
 * 举例: 1->2->3->4->5, k=2
 * 第一步: p1 先走 2 步到 3
 * 第二步: p1 和 p2 同时走,当 p1 到 null 时
 *        p2 正好在 4(倒数第2个节点)
 * 
 * @param {ListNode} head - 链表头节点
 * @param {number} k - 倒数第k个
 * @return {ListNode} - 倒数第k个节点
 */
var findFromEnd = function (head, k) {
	var p1 = head
	// p1 先走 k 步
	for (var i = 0; i < k; i++) {
		p1 = p1.next
	}
	var p2 = head
	// p1 和 p2 同时走 n - k 步
	while (p1 != null) {
		p2 = p2.next
		p1 = p1.next
	}
	// p2 现在指向第 n - k + 1 个节点，即倒数第 k 个节点
	return p2
}
