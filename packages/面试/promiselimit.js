// 实现一个promiseLimit方法，限制并发数量
// 1. 并发数量限制 [5,10,15,20]
// 2. 自动执行完成执行下一个
// 3. 最终结果按顺序输出
// 4. 实现一个方法，限制并发数量，自动执行完成执行下一个，最终结果按顺序输出


// 根据limit数量遍历任务 
// 如果i < limit 执行 如果等于limit 执行下一轮 i 
// 如果 i === limitArray.length  结束
function promiseLimit(limitArray, limit) {
	let result = []
	let i = 0
	let running = 0
	return new Promise((resolve, reject) => {
       // 按照limit数量获取任务执行任务
        const start = () =>{
            try{
                let index = i++;
                const task = limitArray[index]
                running++;
                task().then((res) => {
                    running--;
                    i++;
                    if(i<limitArray.length){
                    	start()
                    }else{ 
                        result.push(res)
                    }
                  
                }) 
            } catch(e) {
                result[index] = e
            }
        }

        // 执行函数
        const run = () =>{
            // 循环执行并发的任务,直到所有任务都完成
            for(let i = 0 ; i < limit; i++){
                if(i < limitArray.length){
                    start()
                } 
            }
        }
        run()
	})
}


promiseLimit([fn1,fn2],2)
