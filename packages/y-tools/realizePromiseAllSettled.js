/**
 * 实现 Promise.allSettled 方法
 * Promise.allSettled 接收一个 Promise 实例数组作为参数，返回一个新的 Promise 实例。
 * 与 Promise.all 不同，Promise.allSettled 会等待所有 Promise 完成（无论是成功还是失败），
 * 然后返回一个包含所有 Promise 结果的数组。每个结果对象都有 status 和 value/reason 属性。
 *
 * @param {Promise[]} promises - Promise 实例数组
 * @returns {Promise} - 返回一个新的 Promise 实例，包含所有 Promise 的结果
 */
function promiseAllSettled(promises) {
	// 首先判断是否为数组
	if (!Array.isArray(promises)) {
		throw new TypeError('参数必须是数组')
	}

	return new Promise(resolve => {
		const result = []
		let count = 0

		// 如果传入空数组，直接返回空数组
		if (promises.length === 0) {
			resolve(result)
			return
		}

		// 遍历处理每个Promise
		promises.forEach((promise, index) => {
			// 为什么使用Promise..resolve()
			//Promise 对象：直接返回该 Promise
			// 普通值：将其转换为 Promise 对象
			// thenable 对象：将其转换为 Promise 对象
			Promise.resolve(promise)
				.then(
					value => {
						result[index] = {
							status: 'fulfilled',
							value,
						}
					},
					reason => {
						result[index] = {
							status: 'rejected',
							reason,
						}
					}
				)
				.finally(() => {
					count++
					// 当所有Promise都完成时，返回结果数组
					if (count === promises.length) {
						resolve(result)
					}
				})
		})
	})
}

// 测试用例
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'))
const promise3 = 42

promiseAllSettled([promise1, promise2, promise3]).then(results => {
	console.log(results)
})
