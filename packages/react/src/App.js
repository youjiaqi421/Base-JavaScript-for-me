import {debounce} from '@y-tools'
import {useState} from 'react'

function App() {
	const [count, setCount] = useState(1)
	const test = debounce(() => {
		setCount(count + 1)
	}, 1000)
	return (
		<div>
			<span>{{count}}</span>
			<button onClick={test}>测试</button>
		</div>
	)
}

export default App
