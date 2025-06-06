const http = require('http')

class Koa {
	constructor() {
		this.middleware = [] // 存储中间件
	}

	// 注册中间件
	use(fn) {
		this.middleware.push(fn)
	}

	// 合成中间件链

	compose(middleware) {
		return function (ctx, next) {
			let index = -1

			function dispatch(i) {
				if (i <= index) return Promise.reject(new Error('next() called multiple times'))
				index = i

				let fn = middleware[i]
				if (i === middleware.length) fn = next
				if (!fn) return Promise.resolve()
				console.log(fn)
				// 继续执行下一个中间件
				return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
			}
			return dispatch(0)
		}
	}

	// 启动 HTTP 服务
	listener() {
		const ctx = '111'
		const middleware = this.compose(this.middleware)
		middleware(ctx, () => {
			// res.writeHead(404, {'Content-Type': 'text/plain'})
			// res.end('Not Found') // 默认响应，如果中间件链没有返回内容
		}).catch(err => {
			// res.writeHead(500, {'Content-Type': 'text/plain'})
			// res.end(`Internal Server Error: ${err.message}`)
		})
		// const server = http.createServer((req, res) => {
		// 	// 创建 ctx 上下文
		// 	const ctx = {req, res, state: {}}
		// 	// 执行中间件链
		// 	const middleware = this.compose(this.middleware)
		// 	middleware(ctx, () => {
		// 		res.writeHead(404, {'Content-Type': 'text/plain'})
		// 		res.end('Not Found') // 默认响应，如果中间件链没有返回内容
		// 	}).catch(err => {
		// 		res.writeHead(500, {'Content-Type': 'text/plain'})
		// 		res.end(`Internal Server Error: ${err.message}`)
		// 	})
		// })
		// server.listen(3000, () => {
		// 	console.log('Server is running on port 3000')
		// })
	}
}

// 创建 Koa 实例
const app = new Koa()

// 注册中间件
app.use(async (ctx, next) => {
	console.log('1')
	await next() // 调用下一个中间件
	console.log('4')
})

app.use(async (ctx, next) => {
	console.log('2')
	await next() // 调用下一个中间件
	console.log('3')
})

// 启动服务
app.listener()
