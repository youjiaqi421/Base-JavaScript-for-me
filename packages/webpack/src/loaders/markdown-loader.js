const marked = require('marked');

module.exports = function(source) {
  const callback = this.async();
  
  // 设置loader为异步模式
  try {
    // 将markdown转换为html
    const html = marked.parse(source);
    
    // 导出为模块
    const code = `module.exports = ${JSON.stringify(html)}`;
    
    callback(null, code);
  } catch (err) {
    callback(err);
  }
};