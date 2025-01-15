/**
 * 将扁平数组转换为树形结构
 * @param {Array} data - 扁平数组数据
 * @param {Object} options - 配置选项
 * @param {string|number} options.rootId - 根节点的pid值,默认为0
 * @param {string} options.idKey - id字段名,默认为'id'
 * @param {string} options.pidKey - pid字段名,默认为'pid'
 * @param {string} options.childrenKey - 子节点字段名,默认为'children'
 * @returns {Array} 树形结构数据
 */
// function arrayToTree(data, options = {}) {0u-
//   const {
//     rootId = 0,
//     idKey = 'id',
//     pidKey = 'pid',
//     childrenKey = 'children'
//   } = options

//   // 使用Map优化查找性能
//   const map = new Map()

//   // 第一次遍历,初始化节点
//   data.forEach(item => {
//     map.set(item[idKey], {
//       ...item,
//       [childrenKey]: []
//     })
//   })

//   return data.reduce((trees, item) => {
//     const node = map.get(item[idKey])

//     // 根节点
//     if(item[pidKey] === rootId) {
//       trees.push(node)
//     } else {
//       // 将当前节点添加到父节点的children中
//       const parent = map.get(item[pidKey])
//       parent && parent[childrenKey].push(node)
//     }

//     return trees
//   }, [])
// }

function arrayToTree(obj) {
	const map = new Map()

	for (let i of obj) {
		map.set(i.id, {...i, children: []})
	}

	const tree = []

	data.forEach(item => {
		const node = map.get(item.id)
		if (item.pid === 0) {
			// 顶级节点，直接加入树的根部
			tree.push(node)
		} else {
			// 找到父节点，并把当前节点加入到父节点的 children 中
			const parent = map.get(item.pid)
			if (parent) {
				parent.children.push(node)
			}
		}
	})

	return tree
}

// 测试数据
const data = [
	{id: 1, name: '部门1', pid: 0},
	{id: 2, name: '部门2', pid: 1},
	{id: 3, name: '部门3', pid: 1},
	{id: 4, name: '部门4', pid: 3},
	{id: 5, name: '部门5', pid: 4},
]

const tree = arrayToTree(data)
console.log(JSON.stringify(tree, null, 2))
