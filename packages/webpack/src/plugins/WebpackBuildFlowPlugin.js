class WebpackBuildFlowPlugin {
	constructor(options = {}) {
		this.options = {
			logToConsole: true,
			logToFile: false,
			filename: 'build-flow.log',
			...options,
		}
		this.startTime = Date.now()
		this.logs = []
	}

	apply(compiler) {
		// 环境准备阶段
		compiler.hooks.environment.tap('WebpackBuildFlowPlugin', () => {
			this.log('环境准备完成')
		})

		compiler.hooks.afterEnvironment.tap('WebpackBuildFlowPlugin', () => {
			this.log('附加环境准备完成')
		})

		// 入口配置阶段
		compiler.hooks.entryOption.tap('WebpackBuildFlowPlugin', (context, entry) => {
			this.log('入口配置完成', {context, entry}) 
		})

		// 编译阶段
		compiler.hooks.beforeCompile.tap('WebpackBuildFlowPlugin', params => {
			this.log('即将开始编译', {params})
		})

		compiler.hooks.compile.tap('WebpackBuildFlowPlugin', params => {
			this.log('编译开始')
		})
		compiler.hooks.compilation.tap('WebpackBuildFlowPlugin', compilation => {
			this.log('编译环境创建完成')

			// 优化阶段
			compilation.hooks.optimize.tap('WebpackBuildFlowPlugin', () => {
				this.log('开始优化')
			})

			compilation.hooks.optimizeModules.tap('WebpackBuildFlowPlugin', modules => {
				this.log('模块优化', {moduleCount: modules.size})
			})

			compilation.hooks.optimizeChunks.tap('WebpackBuildFlowPlugin', chunks => {
				this.log('代码块优化', {chunkCount: chunks.length})
			})

			compilation.hooks.beforeModuleAssets.tap('WebpackBuildFlowPlugin', () => {
				this.log('模块资源处理')
			})

			compilation.hooks.beforeChunkAssets.tap('We/bpackBuildFlowPlugin', () => {
				this.log('代码块资源处理')
			})
		})

		// 输出阶段
		compiler.hooks.emit.tapAsync('WebpackBuildFlowPlugin', (compilation, callback) => {
			this.log('即将输出资源到output目录')
			callback()
		})

		compiler.hooks.afterEmit.tap('WebpackBuildFlowPlugin', compilation => {
			this.log('资源已经输出到output目录')
		})

		// 完成阶段
		compiler.hooks.done.tap('WebpackBuildFlowPlugin', stats => {
			const endTime = Date.now()
			const buildTime = endTime - this.startTime

			this.log('构建完成', {
				totalTime: `${buildTime}ms`,
				hash: stats.hash,
				warnings: stats.compilation.warnings.length,
				errors: stats.compilation.errors.length,
			})

			// 输出完整的构建流程报告
			this.printBuildReport()
		})

		// 失败处理
		compiler.hooks.failed.tap('WebpackBuildFlowPlugin', error => {
			this.log('构建失败', {error: error.message})
		})
	}

	log(message, data = {}) {
		const time = new Date().toISOString()
		const logEntry = {
			time,
			message,
			...data,
		}

		this.logs.push(logEntry)

		if (this.options.logToConsole) {
			console.log(`[WebpackBuildFlow] ${time} - ${message}`)
			if (Object.keys(data).length > 0) {
				console.log(data)
			}
		}
	}

	printBuildReport() {
		console.log('\n📦 Webpack构建流程报告')
		console.log('============================')

		this.logs.forEach(log => {
			console.log(`\n🔸 ${log.message}`)
			console.log(`  ⏱️  ${log.time}`)

			const {time, message, ...data} = log
			if (Object.keys(data).length > 0) {
				console.log('  📊 详细信息:', data)
			}
		})

		console.log('\n============================')
	}
}

module.exports = WebpackBuildFlowPlugin
