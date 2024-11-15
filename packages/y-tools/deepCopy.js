/**
 * 深拷贝函数 - 用于创建对象的深层副本
 * 支持处理循环引用问题，可以复制普通对象、数组、Date等内置对象
 *
 * @param {Object} obj - 需要进行深拷贝的对象
 * @param {WeakMap} hasWeakMap - 用于存储已经拷贝过的对象,防止循环引用
 * @returns {Object} 返回深拷贝后的新对象
 */
const deepCopy = (obj, hasWeakMap = new WeakMap()) => {
	// 处理基本类型和 null
	if (typeof obj !== 'object' || obj === null) return obj

	// 处理循环引用
	if (hasWeakMap.has(obj)) return hasWeakMap.get(obj)

	// 创建一个新的对象,继承原型链
	const cloneObj = new obj.constructor()

	// 将当前对象加入 WeakMap,防止循环引用
	hasWeakMap.set(obj, cloneObj)

	// 递归拷贝所有属性
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			cloneObj[key] = deepCopy(obj[key], hasWeakMap)
		}
	}

	return cloneObj
}

const classOne = {
	name: 'you',
	age: 18,
	hobby: ['game', 'music'],
	friend: {
		name: 'zhu',
		age: 20,
	},
}

const c1 = deepCopy(classOne)

c1.friend.name = 'zhuxiaobao'
console.log(c1, classOne)
