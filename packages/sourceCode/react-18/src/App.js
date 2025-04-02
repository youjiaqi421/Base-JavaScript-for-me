import {useState, useEffect} from 'react'
function App() {
	const [count, setCount] = useState(-1)

	useEffect(() => {
		setCount(0)
	}, [])

	console.log('x') //sy-log

	return (
		<div>
			<h3>SetStatePage</h3>
		</div>
	)
}

export default App

