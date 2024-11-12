/**
 * 创建一个防抖函数，用于限制函数的执行频率。
 * 当频繁触发某个函数时，希望它在一段时间内只执行一次，
 * 这个防抖函数可以确保在最后一次调用后的特定时间内执行函数。
 *
 * @param {Function} fn - 需要进行防抖处理的函数。
 * @param {number} delay - 延迟执行的时间，单位为毫秒。
 * @returns {Function} - 返回一个新的防抖函数。
 */
export function debounce(fn, delay) {
	// 定义一个定时器变量，用于存储 setInterval 的引用。
	let timer = null
	// 返回一个新的函数，这个函数将处理实际的防抖逻辑。
	return function () {
		// 如果定时器已存在，则清除现有的定时器，
		// 以确保在最后一次调用后重新计算延迟时间。
		if (timer) {
			clearInterval(timer)
			timer = null
		}
		// 设置一个新的定时器，经过指定的延迟时间后执行传入的函数 fn。
		// 使用 apply 保证传入函数的 this 上下文和传入的参数。
		timer = setInterval(() => fn.apply(this, arguments), delay)
	}
}
