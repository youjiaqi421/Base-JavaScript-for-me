new Promise(resolve => {
	// let resolvedPromise = Promise.resolve()
	let resolvedPromise = Promise.resolve().then(() => console.log('resolevdPromise1'))
	resolve(resolvedPromise)
}).then(() => {
	console.log('resolvedPromise,resolved')
})

Promise.resolve()
	.then(() => {
		console.log('p1')
	})
	.then(() => {
		console.log('p2')
	})
	.then(() => {
		console.log('p3')
	})
t