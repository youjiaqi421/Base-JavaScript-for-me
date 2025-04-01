Function.prototype.call = function (ctx, ...args) {
	// this指向调用call的函数
	let fn = this
	if (typeof fn !== 'function') {
		throw new TypeError('fn must be a function')
	}
	ctx = ctx || window
    // this => Fn
	ctx.fn = fn
	let res = ctx.fn(...args)
	delete ctx.fn
	return res
}


function greet() {
  console.log(this.animal, "的睡眠时间一般在", this.sleepDuration, "之间");
}

const obj = {
  animal: "猫",
  sleepDuration: "12 到 16 小时",
  // 多了一个属性  obj.fn = greet
};

greet.call(obj); /