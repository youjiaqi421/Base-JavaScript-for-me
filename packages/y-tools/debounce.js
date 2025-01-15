// /**
//  * 创建一个防抖函数，用于限制函数的执行频率。
//  * 当频繁触发某个函数时，希望它在一段时间内只执行一次，
//  * 这个防抖函数可以确保在最后一次调用后的特定时间内执行函数。
//  *
//  * @param {Function} fn - 需要进行防抖处理的函数。
//  * @param {number} delay - 延迟执行的时间，单位为毫秒。
//  * @returns {Function} - 返回一个新的防抖函数。
//  */

// export function debounce(fn, delay) {
// 	// 定义一个定时器变量，用于存储 setInterval 的引用。
// 	let timer = null
// 	// 返回一个新的函数，这个函数将处理实际的防抖逻辑。
// 	return function (...args) {
// 		if (timer) {
// 			clearTimeout(timer)
// 			timer = null
// 		}
// 		timer = setTimeout(() => fn.apply(this, args), delay)
// 	}
// }

// 防抖 按照最后一次执行
function debounce(fn, delay) {
	let timer = null
	return function (...args) {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		timer = setTimeout(() => fn.apply(this, args), delay)
	}
}
