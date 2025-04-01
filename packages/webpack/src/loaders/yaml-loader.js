const yaml = require('js-yaml');

module.exports = function(source) {
  const callback = this.async();
  
  try {
    // 将YAML转换为JSON对象
    const json = yaml.load(source);
    
    // 导出为模块
    const code = `module.exports = ${JSON.stringify(json, null, 2)}`;
    
    callback(null, code);
  } catch (err) {
    callback(err);
  }
};