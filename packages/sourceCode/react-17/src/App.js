import React, {useState} from 'react'
import {unstable_batchedUpdates} from 'react-dom'
import './App.css'

function App() {
	// 创建多个状态用于展示批处理效果
	const [count1, setCount1] = useState(0)
	const [count2, setCount2] = useState(0)
	const [count3, setCount3] = useState(0)
	const [renderCount, setRenderCount] = useState(0)

	// 用于记录渲染次数
	React.useEffect(() => {
		setRenderCount(prev => prev + 1)
	})

	// 同步更新 - React 17中事件处理程序内的多个setState会自动批处理
	const handleSyncUpdate = () => {
		console.log('开始同步更新 - 自动批处理')
		// 这三个setState会被批处理为一次更新
		setCount1(c => c + 1)
		setCount2(c => c + 1)
		setCount3(c => c + 1)
		console.log('同步更新结束 - 只会触发一次渲染')
	}

	// 异步更新 - React 17中异步操作内的多个setState不会自动批处理
	const handleAsyncUpdateWithoutBatching = () => {
		console.log('开始异步更新 - 无批处理')
		// 使用setTimeout模拟异步操作
		setTimeout(() => {
			// 这三个setState会分别触发渲染
			setCount1(c => c + 1)
			console.log('第一次setState后')
			setCount2(c => c + 1)
			console.log('第二次setState后')
			setCount3(c => c + 1)
			console.log('第三次setState后 - 会触发三次渲染')
		}, 0)
	}

	// 使用unstable_batchedUpdates手动批处理异步更新
	const handleAsyncUpdateWithBatching = () => {
		console.log('开始异步更新 - 使用手动批处理')
		// 使用setTimeout模拟异步操作
		setTimeout(() => {
			// 使用unstable_batchedUpdates包裹，实现批处理
			unstable_batchedUpdates(() => {
				setCount1(c => c + 1)
				setCount2(c => c + 1)
				setCount3(c => c + 1)
			})
			console.log('批处理后 - 只会触发一次渲染')
		}, 0)
	}

	// 重置所有计数器
	const handleReset = () => {
		setCount1(0)
		setCount2(0)
		setCount3(0)
		setRenderCount(0)
	}

	return (
		<div className="App">
			<h1>React 17 批处理演示</h1>

			<div className="counters">
				<p>Count1: {count1}</p>
				<p>Count2: {count2}</p>
				<p>Count3: {count3}</p>
				<p>渲染次数: {renderCount}</p>
			</div>

			<div className="buttons">
				<button onClick={handleSyncUpdate}>同步更新 (自动批处理)</button>

				<button onClick={handleAsyncUpdateWithoutBatching}>异步更新 (无批处理)</button>

				<button onClick={handleAsyncUpdateWithBatching}>异步更新 (手动批处理)</button>

				<button onClick={handleReset}>重置</button>
			</div>

			<div className="explanation">
				<h3>批处理说明:</h3>
				<ul>
					<li>在React 17中，事件处理程序内的多个setState会自动批处理为一次更新</li>
					<li>异步操作(如setTimeout、Promise)中的setState默认不会批处理，每次setState都会触发一次渲染</li>
					<li>可以使用unstable_batchedUpdates API手动将异步操作中的多个setState批处理为一次更新</li>
					<li>观察控制台和渲染次数可以看到批处理的效果</li>
				</ul>
			</div>
		</div>
	)
}

export default App
