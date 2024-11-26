/**
 * 文本左右对齐
 * @param {string[]} words - 单词数组
 * @param {number} maxWidth - 每行最大宽度
 * @returns {string[]} - 对齐后的文本数组
 */
function fullJustify(words, maxWidth) {
	// 存储最终结果
	let ans = []
	// 单词数组长度
	let n = words.length

	// 遍历所有单词
	for (let i = 0; i < n; ) {
		// 当前行的单词列表
		let list = []
		// 当前行已使用的长度(包含单词和空格)
		let cur = words[i].length
		list.push(words[i])
		i++

		// 尽可能多地往当前行添加单词
		// cur + 1 表示添加一个空格  模拟 
		while (i < n && cur + 1 + words[i].length <= maxWidth) {
			cur += 1 + words[i].length
			list.push(words[i])
			// 指针向后移动一位,继续遍历下一个单词
			i++
		}

		console.log(list)

		// // 处理最后一行的情况 - 左对齐,单词间只有一个空格,末尾填充空格
		// if (i === n) {
		// 	let sb = list[0]
		// 	for (let k = 1; k < list.length; k++) {
		// 		sb += ' ' + list[k]
		// 	}
		// 	// 末尾填充空格直到达到最大宽度
		// 	while (sb.length < maxWidth) sb += ' '
		// 	ans.push(sb)
		// 	break
		// }

		// // 处理只有一个单词的情况 - 左对齐,末尾填充空格
		// if (list.length === 1) {
		// 	let str = list[0]
		// 	while (str.length < maxWidth) str += ' '
		// 	ans.push(str)
		// 	continue
		// }

		// // 处理普通情况 - 需要均匀分配空格
		// // 计算所有单词的总长度
		// let wordWidth = cur - (list.length - 1)
		// // 计算需要填充的空格总数
		// let spaceWidth = maxWidth - wordWidth
		// // 计算平均每个间隔的空格数
		// let spaceItemWidth = Math.floor(spaceWidth / (list.length - 1))
		// // 生成空格字符串
		// let spaceItem = ' '.repeat(spaceItemWidth)
		// let sb = ''

		// // 构建当前行字符串
		// for (let k = 0, sum = 0; k < list.length; k++) {
		// 	sb += list[k]
		// 	// 最后一个单词后不需要加空格
		// 	if (k === list.length - 1) break
		// 	// 添加平均分配的空格
		// 	sb += spaceItem
		// 	sum += spaceItemWidth
		// 	// 计算剩余需要插入空格的位置数
		// 	let remain = list.length - k - 1 - 1

		// 	// 如果剩余空格数大于剩余位置能放下的空格数
		// 	// 则在当前位置多加一个空格
		// 	if (remain * spaceItemWidth + sum < spaceWidth) {
		// 		sb += ' '
		// 		sum++
		// 	}
		// }

		// ans.push(sb)
	}

	return ans
}
fullJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16)
