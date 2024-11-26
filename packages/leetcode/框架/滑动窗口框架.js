/**
 * 滑动窗口算法框架
 * @param {string} s - 输入字符串
 * @returns {void}
 */
const slidingWindow = (s) => {
    // 初始化窗口数据结构
    // 可以根据需求使用不同的数据结构:
    // Map - 记录元素出现次数
    // Set - 记录不重复元素
    // Number - 记录元素之和
    let window = new Map();

    // 双指针定义窗口边界
    let left = 0, right = 0;

    // 右指针不断向右移动扩大窗口
    while (right < s.length) {
        // 获取即将进入窗口的字符
        const c = s[right];
        // 更新窗口数据
        window.set(c, (window.get(c) || 0) + 1);
        // 扩大窗口
        right++;
        
        // 窗口数据更新
        // TODO: 根据具体题目要求进行处理
        // ...

        // Debug日志 
        // 注意: 实际提交时需要注释掉,避免影响执行时间
        console.log(`window: [${left}, ${right})`);

        // 根据条件收缩窗口
        while (/* window needs shrink condition */) {
            // 获取即将移出窗口的字符
            const d = s[left];
            // 更新窗口数据
            window.set(d, window.get(d) - 1);
            if (window.get(d) === 0) {
                window.delete(d);
            }
            // 收缩窗口
            left++;
            
            // 窗口数据更新
            // TODO: 根据具体题目要求进行处理
            // ...
        }
    }
};