import {debounce, throttle} from '@react/y-tools'
import {useState} from 'react'
function App() {
	const [count, setCount] = useState(1)
	const test = debounce(() => {
		setCount(count + 1)
	}, 1000)

	const throttleTest = throttle(() => {
		console.log('1111')
	}, 3000)
	return (
		<div>
			<div>
				<span>{count}</span>
			</div>
			<button onClick={test}>防抖</button>
			<button onClick={throttleTest}>节流</button>
		</div>
	)
}

export default App
