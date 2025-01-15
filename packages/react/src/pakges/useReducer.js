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