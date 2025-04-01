// 实现一个发布订阅模式
class EventBus {
	constructor() {
		this.events = new Map()
	}
	// 订阅函数
	on(name, callback) {
		if (!this.events.has(name)) {
			// 如果没有事件,创建一个该事件,已经对应的数组
			this.events.set(name, [])
		}
		// 把函数添加进去
		this.events.get(name).push(callback)
	}
	// 取消的函数
	off(name, callback) {
		// 如果没有这个函数 那就return
		if (!this.events.has(name)) return
		// 直接根据name删除所有函数
		this.events.delete(name)
	}
	// 触发的函数
	emit(name, args) {
        // 如果没有根据名称触发函数 直接return 
        if(!this.events.has(name)) return 
		this.events.get(name).forEach((callback) => {
            callback(args)
        })
	}
	// 直执行一次的函数
	once(name,callback) {
        // 如果在此调用 把函数删除
        const fn = () =>{
            callback()
            this.off(name,fn)
        }
        this.on(name, fn)
    }
}
