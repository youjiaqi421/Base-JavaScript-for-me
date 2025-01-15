function findParentTree(root, targetId) {
	if (!root.child || root.child.length === 0) return null
	const tree = [targetId]
	const newTree = (roots, targetId) => {
		if (!roots.child || roots.child.length === 0) return null
		for (const child of roots.child) {
			if (child.id === targetId) {
				tree.push(roots.id)
				newTree(root, roots.id)
			} else {
				newTree(child, targetId)
			}
		}
	}

	newTree(root, targetId)

	function filterTreeByIds(root, targetIds) {
		// 如果当前节点没有子节点，直接返回 null
		if (!root.child || root.child.length === 0) return null

		// 判断当前节点是否是目标节点之一
		let isCurrentNodeValid = targetIds.includes(root.id)

		// 遍历子节点并递归查找
		let validChildren = []
		for (const child of root.child) {
			const filteredChild = filterTreeByIds(child, targetIds)
			if (filteredChild) {
				validChildren.push(filteredChild) // 收集有效的子节点
			}
		}

		// 如果当前节点或它的子节点中有符合条件的节点，则构建返回数据
		if (isCurrentNodeValid || validChildren.length > 0) {
			return {
				id: root.id,
				name: root.name,
				weight: root.weight,
				child: validChildren, // 添加符合条件的子节点
			}
		}

		// 如果当前节点不符合条件，返回 null
		return null
	}
	const res = filterTreeByIds(root, tree)
	// 输入数据
	console.log(JSON.stringify(res, null, 2))
}

const data = {
	child: [
		{
			child: [
				{
					child: [
						{
							child: [
								{
									id: 'CWE-327_cn_name_value',
									name: '使用损坏或有风险的加密算法',
									weight: 1,
								},
							],
							id: 'CWE-327_cn_name',
							name: 'CWE简称',
							weight: 1,
						},
						{
							child: [
								{
									id: 'CWE-327_desc_value',
									name: '该产品使用损坏或有风险的加密算法或协议。',
									weight: 1,
								},
							],
							id: 'CWE-327_desc',
							name: 'CWE简介',
							weight: 1,
						},
					],
					id: 'CWE-327',
					name: 'CWE-327',
					weight: 1,
				},
				{
					child: [
						{
							id: 'CVE-2018-0734_reason_value',
							name: '使用损坏或有风险的加密算法',
						},
					],
					id: 'CVE-2018-0734_reason',
					name: '漏洞成因',
					weight: 0,
				},
				{
					child: [
						{
							id: 'CVE-2018-0734_mechanism_value',
							name: 'AV:N/AC:M/AU:N/C:P/I:N/A:N',
						},
					],
					id: 'CVE-2018-0734_mechanism',
					name: '机理',
					weight: 0,
				},
				{
					child: [
						{
							id: 'CVE-2018-0734_severity_value',
							name: '中危',
						},
					],
					id: 'CVE-2018-0734_severity',
					name: '危害程度',
					weight: 0,
				},
			],
			data: 'CVE-2018-0734',
			id: 'CVE-2018-0734',
			name: 'CVE-2018-0734',
			weight: 46,
		},
		{
			child: [],
			data: 'CVE-2022-0778',
			id: 'CVE-2022-0778',
			name: 'CVE-2022-0778',
			weight: 49,
		},
	],
	data: 'Top10 CVE',
	id: 'Top10 CVE',
	name: 'Top10 CVE',
	weight: 10,
}

findParentTree(data, 'CWE-327_cn_name_value')
