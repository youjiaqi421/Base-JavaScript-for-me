// 测试 promiseLimit 函数

// 导入 promiseLimit 函数
const {promiseLimit} = require('./promiselimit')

// 创建一些模拟的异步任务
const createTask = (id, delay) => {
	return () =>
		new Promise(resolve => {
			console.log(`Task ${id} started`)
			setTimeout(() => {
				console.log(`Task ${id} completed after ${delay}ms`)
				resolve(`Result of task ${id}`)
			}, delay)
		})
}

// 创建一组任务
const tasks = [
	createTask(1, 1000),
	createTask(2, 2000),
	createTask(3, 1500),
	createTask(4, 800),
	createTask(5, 1200),
	createTask(6, 3000),
	createTask(7, 1800),
	createTask(8, 500),
	createTask(9, 900),
	createTask(10, 700),
]

// 使用 promiseLimit 限制并发数为 3
console.log('Starting tasks with concurrency limit of 3...')
promiseLimit(tasks, 3)
	.then(results => {
		console.log('All tasks completed!')
		console.log('Results:', results)
	})
	.catch(err => {
		console.error('An error occurred:', err)
	})