// 节流函数

export function throttle(fn, delay) {
	// 在规定时间内完成一次操作
	let timerId = null

	return function (args) {
		if (!timerId) {
			timerId = setTimeout(() => {
				fn.apply(this, args)
				clearTimeout(timerId)
				timerId = null
			}, delay)
		}
	}
}

function t1(fn, delay) {
	let timer = null
	return function (...args) {
		if (timer) {
			timer = setTimeout(() => {
				fn.apply(this, args)
				clearTimeout(timer)
				timer = null
			}, delay)
		}
	}
}

function throttle() {
	let timer = null

	return function () {
		if (timer) {
			timer = setTimeout(() => {
				fn.apply(this, args)
				clearTimeout(timer)
				timer = null
			}, delay)
		}
	}
}
