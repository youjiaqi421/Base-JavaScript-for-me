function __click() {
	// new Promise(resolve => {
	// 	resolve('hello,xpromise')
	// })
	new Promise(resolve => {
		setTimeout(() => {
			resolve('hello,xpromise')
		}, 0)
	})

		.then(value => {
			console.log('5. valuie:', value) // 2
		})
		.then(() => {
			console.log('6') // 4
		})

	new Promise(resolve => {
		resolve('')
	})
		.then(() => {
			console.log('1') // 3
			return new Promise(resolve => {
				return resolve('')
			})
				.then(() => {
					console.log('2')
				})

				.then(() => {
					console.log('4')
				})
		})
		.then(() => {
			console.log('3')
		})

	console.log('0') //  1
}

__click()
