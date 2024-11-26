var maxPoints = function (points) {
	if (points.length <= 2) return points.length;
    const map = new Map();
    let max = 0;


	for (let i = 0; i < points.length; i++) {
		map.clear(); // 每次选择新的起点时清空map
        for (let j = i + 1; j < points.length; j++) {
			const x = points[j][0] - points[i][0]
			const y = points[j][1] - points[i][1]
			// 计算最大公约数
			const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
			const k = gcd(x, y)
             // 用最简分数表示斜率
            const slope = k === 0 ? 'vertical' : `${x/k},${y/k}`;
            
            map.set(slope, (map.get(slope) || 1) + 1);
            max = Math.max(max, map.get(slope));
		}
	}

    return max;
}

maxPoints([
	[1, 1],
	[2, 2],
	[3, 3],
])
