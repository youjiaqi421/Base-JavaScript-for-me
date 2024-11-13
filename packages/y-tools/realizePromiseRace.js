// 实现一个Promise.race

/**
 * 实现 Promise.race 方法
 * Promise.race 会返回一个新的 Promise 实例，
 * 这个实例会在参数数组中最先改变状态的 Promise 的状态改变后，
 * 立即跟随其改变状态。
 *
 * @param {Promise[]} promises - Promise 实例数组
 * @returns {Promise} - 返回一个新的 Promise 实例
 */
function promiseRace(promises) {
	return new Promise((resolve, reject) => {
		// 参数校验
		if (!Array.isArray(promises)) {
			throw new TypeError('参数必须是一个数组')
		}

		// 处理空数组的情况
		if (promises.length === 0) {
			return
		}

		// 遍历所有promise
		promises.forEach(promise => {
			// 使用 Promise.resolve 包装，确保参数是 Promise 实例
			Promise.resolve(promise)
			.then(
				value => resolve(value),
				reason => reject(reason)
			)
		})
	})
}

export default promiseRace
