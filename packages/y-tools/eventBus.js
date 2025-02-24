class EventBus {
	constructor() {
		// 存储事件与回调的映射关系
		this.events = new Map()
	}

	// 订阅事件
	on(eventName, callback) {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, [])
		}
		this.events.get(eventName).push(callback)
	}

	// 取消订阅
	off(eventName, callback) {
		if (!this.events.has(eventName)) return
		if (!callback) {
			// 如果没有提供回调函数，则移除该事件的所有监听器
			this.events.delete(eventName)
		} else {
			// 移除特定的回调函数
			const callbacks = this.events.get(eventName)
			const index = callbacks.indexOf(callback)
			if (index !== -1) {
				callbacks.splice(index, 1)
			}
			if (callbacks.length === 0) {
				this.events.delete(eventName)
			}
		}
	}

	// 触发事件
	emit(eventName, ...args) {
		if (!this.events.has(eventName)) return
		this.events.get(eventName).forEach(callback => {
			callback(...args)
		})
	}

	// 只订阅一次
	once(eventName, callback) {
		;``
		const wrapper = (...args) => {
			callback(...args)
			this.off(eventName, wrapper)
		}
		this.on(eventName, wrapper)
	}
}
