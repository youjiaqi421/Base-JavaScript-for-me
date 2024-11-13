/**
 * 实现 Promise.all 方法
 * Promise.all 接收一个 Promise 实例数组作为参数，返回一个新的 Promise 实例。
 * 只有当所有 Promise 都成功时，返回的 Promise 才会成功，结果为所有 Promise 的结果数组。
 * 如果有任意一个 Promise 失败，则立即返回第一个失败的 Promise 的结果。
 *
 * @param {Promise[]} promises - Promise 实例数组
 * @returns {Promise} - 返回一个新的 Promise 实例，成功时返回所有结果的数组，失败时返回第一个失败的原因
 */

function PromiseAll(list) {
	// 首先判断是否为数组
	if (!Array.isArray(list)) {
		throw new TypeError('参数必须是数组')
	}

	return new Promise((resolve, reject) => {
		const result = [] // 存储所有Promise的结果
		let count = 0 // 计数器，记录已完成的Promise数量

		// 如果传入空数组，直接返回空数组
		if (list.length === 0) {
			resolve(result)
			return
		}

		// 遍历处理每个Promise
		for (let i = 0; i < list.length; i++) {
			Promise.resolve(list[i])
				.then(value => {
					result[i] = value // 按原始顺序存储结果
					count++
					// 当所有Promise都完成时，返回结果数组
					if (count === list.length) {
						resolve(result)
					}
				})
				.catch(reject) // 任何一个Promise失败都会导致整个Promise.all失败
		}
	})
}

const promisP1 = Promise.reject(3)

PromiseAll([promisP1])
	.then(values => {
		console.log(values)
	})
	.catch(error => {
		console.log(error)
	})

const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
	setTimeout(resolve, 100, 'foo')
})

Promise.all([promise1, promise2, promise3]).then(values => {
	console.log(values)
})
