// 节流函数

export function throttle(fn, delay) {
	// 在规定时间内完成一次操作
	let timerId = null

	return function (args) {
		if (!timerId) {
			console.log('ddd')
			timerId = setTimeout(() => {
				fn.apply(this, args)
				clearTimeout(timerId)
				timerId = null
			}, delay)
		}
	}
}
