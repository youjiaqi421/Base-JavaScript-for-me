/**
 *  1. 将指定元素添加到数组最后一位 
 *  2. 返回新数组长度
 * 
*/

Array.prototype.push1 = function(...arg) {
    let length = this.length;
    for (let i = 0; i < arg.length; i++) {
        this[length + i] = arg[i]; // 添加每个新元素到数组末尾
    }
    return this.length
}
const a = [1]

console.log( a.push1(2) )

console.log(a)


