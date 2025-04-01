fucntion reducer(actions, initData,init){
    const baseData = init ? init(initData) : initData
    const [state,setState]  = useState(baseData)

    const dispatch = (actions) => { 
        return  setState(actions(state,actions)))
    }

    return [state,dispatch]
} 


// 修复函数名拼写错误和参数名
function useReducer(reducer, initData, init) {
    const baseData = init ? init(initData) : initData
    const [state, setState] = useState(baseData)

    // 修复 dispatch 函数的参数和调用
    const dispatch = (action) => {
        return setState(reducer(state, action))
    }

    return [state, dispatch]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
}



function dispatch (state,action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      appState.title.color = action.color
      break
    default:
      break
  }
}


// Promise 

// Promise 的三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled' 
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // 初始化状态
    this.status = PENDING
    // 成功的值
    this.value = undefined
    // 失败的原因
    this.reason = undefined
    // 成功回调函数队列
    this.onFulfilledCallbacks = []
    // 失败回调函数队列
    this.onRejectedCallbacks = []

    // resolve 方法
    const resolve = (value) => {
      if(this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    // reject 方法
    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      // 立即执行executor
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    // 处理参数可选
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 返回新的Promise以实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try { 
            const x = onFulfilled(this.value)
            resolve(x)
          } catch(e) {
            reject(e)
          }
        })
      }

      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolve(x)
          } catch(e) {
            reject(e)
          }
        })
      }

      if(this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolve(x)
            } catch(e) {
              reject(e)
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolve(x)
            } catch(e) {
              reject(e)
            }
          })
        })
      }
    })

    return promise2
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // 静态方法
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }
}


