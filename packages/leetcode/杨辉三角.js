numRows = 5
输出: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]

// function generate(numRows) {
// 	let res = []
// 	for (let i = 0; i < numRows; i++) {
// 		res[i] = []
// 		for (let j = 0; j <= i; j++) {
// 			if ((j = 0 || j === i)) {
// 				res[i][j] = 1
// 			} else {
// 				res[i][j] = res[i - 1][j - 1] + res[i - 1][j]
// 			}
// 		}
// 	// }
// 	return res
// }

function generate(numRows) {
	const res = []
	for (let i = 0; i < numRows; i++) {
		res[i] = []
		for (let j = 0; j <= i; j++) {
			if (j === 0 || j === i) {
				res[i][j] = 1
			} else {
			    res[i][j] = res[i-1][j-1] + res[i-1][j]
			}
		}
	}
	console.log(res)
}




generate(5)
