// import {debounce, throttle} from '@react/y-tools'
// import {useState, useRef, useEffect} from 'react'

// import Index from './pakges/index1'

// function App() {
// 	const [tstate, setTState] = useState(10)
// 	const timerRef = useRef()

// 	const [count, setCount] = useState(1)
// 	const [isClose, setIsClose] = useState(false)
// 	const test = debounce(() => {
// 		setCount(count + 1)
// 		setIsClose(!isClose)
// 		console.log(tabs)
// 	}, 1000)

// 	const throttleTest = throttle(() => {
// 		console.log('1111')
// 	}, 3000)

// 	const tabs = [] // 用于存储打开的标签页

// 	const openTab = url => {
// 		const newTab = window.open(url, '_blank') // 打开新标签页
// 		if (newTab) {
// 			tabs.push(newTab) // 将新标签页添加到数组中
// 			printCurrentUrl() //
// 		}
// 	}

// 	const handleOpenBaidu = () => {
// 		openTab('https://www.baidu.com') // 打开百度
// 	}

// 	const handleOpenGithub = () => {
// 		openTab('https://github.com') // 打开GitHub
// 	}

// 	const printCurrentUrl = () => {
// 		const currentUrl = window.location.href // 获取当前标签页的URL
// 		console.log('当前标签页的网址:', currentUrl) // 打印当前标签页的网址
// 	}

// 	return (
// 		<div>
// 			<div>
// 				<span>{count}</span>
// 			</div>
// 			<div>
// 				<button onClick={() => setCount(count + 1)}>+</button>
// 				<button onClick={() => setCount(count - 1)}>-</button>
// 			</div>
// 			<div>{tstate}</div>
// 			<Index isClose={isClose} />
// 			<button onClick={test}>防抖</button>
// 			<button onClick={throttleTest}>节流</button>
// 			<button onClick={handleOpenBaidu}>打开百度</button>
// 			<button onClick={handleOpenGithub}>打开GitHub</button>
// 		</div>
// 	)
// }

// export default App

import React, {useState} from 'react'

const App = ({initialTime = 3}) => {
	// 使用 useState 钩子来存储倒计时剩余的秒数
	const [timeLeft, setTimeLeft] = useState(initialTime)
	const [isRunning, setIsRunning] = useState(false)
	const [intervalId, setIntervalId] = useState(null)

	if (timeLeft === 0) {
		return <div>倒计时结束！</div>
	}

	// 启动倒计时
	const startCountdown = () => {
		if (isRunning) return // 防止重复启动
		const id = setInterval(() => {
			console.log('执行')
			setTimeLeft(prevTime => {
				if (prevTime <= 1) {
					clearInterval(id) // 到达 0 时清除定时器
					setIsRunning(false)
					return 0
				}
				return prevTime - 1
			})
		}, 1000)
		setIntervalId(id)
		setIsRunning(true)
	}

	// 停止倒计时
	const stopCountdown = () => {
		clearInterval(intervalId)
		setIsRunning(false)
	}

	// 重置倒计时
	const resetCountdown = () => {
		clearInterval(intervalId)
		setTimeLeft(0)
		setIsRunning(false)
	}

	// useEffect(() => {
	// 	// 清理定时器（防止内存泄漏）
	// 	return () => {
	// 		console.log('clear')
	// 		clearInterval(intervalId)
	// 	}
	// }, [intervalId])

	return (
		<div>
			<h1>Time Left: {timeLeft} seconds</h1>
			<button onClick={startCountdown} disabled={isRunning}>
				Start Countdown
			</button>
			<button onClick={stopCountdown} disabled={!isRunning}>
				Stop Countdown
			</button>
			<button onClick={resetCountdown}>Reset Countdown</button>
		</div>
	)
}

export default App
