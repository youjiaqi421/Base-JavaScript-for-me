function Parent() {
	this.name = 'kevin'
}

Parent.prototype.getName = function () {
	console.log(this.name, '111')
}

function Child() {}

Child.prototype = new Parent()

var child1 = new Child()

// parent 是实例对象
const parent = new Parent()

// Parent 构造函数

console.log(parent.__proto__ === Parent.prototype)

console.log(child1.__proto__ === Child.prototype)

console.log(Child.prototype.__proto__ === Parent.prototype)

console.log(child1.getName()) // kevin

// console.log(Child)
