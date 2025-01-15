const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function Promise(executor) {
	let self = this
	self.status = PENDING
	self.onFulfilled = [] //成功的回调
	self.onRejected = [] //失败的回调
	//PromiseA+ 2.1
	function resolve(value) {
		if (self.status === PENDING) {
			self.status = FULFILLED
			self.value = value
			self.onFulfilled.forEach(fn => fn()) //PromiseA+ 2.2.6.1
		}
	}

	function reject(reason) {
		if (self.status === PENDING) {
			self.status = REJECTED
			self.reason = reason
			self.onRejected.forEach(fn => fn()) //PromiseA+ 2.2.6.2
		}
	}

	try {
		executor(resolve, reject)
	} catch (e) {
		reject(e)
	}
}
