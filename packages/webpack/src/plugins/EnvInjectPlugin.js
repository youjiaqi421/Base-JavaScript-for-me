/**
 * EnvInjectPlugin - 环境变量注入插件
 * 用于在构建过程中注入环境变量，支持不同环境使用不同配置
 */
class EnvInjectPlugin {
    constructor(options = {}) {
        this.env = options.env || process.env.NODE_ENV || 'development';
        this.variables = options.variables || {};
        this.prefix = options.prefix || 'APP_';
        this.configFile = options.configFile;
    }

    apply(compiler) {
        // 获取环境变量
        const envVars = this.getEnvVariables();
        
        // 使用DefinePlugin注入环境变量
        const { DefinePlugin } = require('webpack');
        const definitions = {};
        
        // 将环境变量转换为webpack可用的格式
        Object.keys(envVars).forEach(key => {
            definitions[`process.env.${key}`] = JSON.stringify(envVars[key]);
        });
        
        // 添加当前环境标识
        definitions['process.env.NODE_ENV'] = JSON.stringify(this.env);
        definitions['__ENV__'] = JSON.stringify(this.env);
        definitions['__DEV__'] = this.env === 'development';
        definitions['__PROD__'] = this.env === 'production';
        definitions['__TEST__'] = this.env === 'test';
        
        // 应用DefinePlugin
        new DefinePlugin(definitions).apply(compiler);
        
        // 在编译开始时输出环境信息
        compiler.hooks.compile.tap('EnvInjectPlugin', () => {
            console.log(`\n🌍 当前构建环境: ${this.env}`);
            
            if (Object.keys(envVars).length > 0) {
                console.log('📝 注入的环境变量:');
                Object.keys(envVars).forEach(key => {
                    // 敏感信息不显示具体值
                    const isSensitive = key.includes('KEY') || key.includes('SECRET') || key.includes('PASSWORD');
                    const value = isSensitive ? '******' : envVars[key];
                    console.log(`   ${key}: ${value}`);
                });
            }
        });
    }
    
    // 获取环境变量，优先级：配置文件 > 构造函数传入 > 系统环境变量
    getEnvVariables() {
        let vars = {};
        
        // 从系统环境变量中获取指定前缀的变量
        Object.keys(process.env).forEach(key => {
            if (key.startsWith(this.prefix)) {
                vars[key] = process.env[key];
            }
        });
        
        // 合并构造函数传入的变量
        vars = { ...vars, ...this.variables };
        
        // 如果指定了配置文件，尝试加载
        if (this.configFile) {
            try {
                const path = require('path');
                const fs = require('fs');
                const configPath = path.resolve(process.cwd(), this.configFile);
                
                if (fs.existsSync(configPath)) {
                    const config = require(configPath);
                    const envConfig = config[this.env] || {};
                    vars = { ...vars, ...envConfig };
                }
            } catch (error) {
                console.warn(`\n⚠️ 无法加载环境配置文件: ${this.configFile}`);
                console.warn(`   ${error.message}`);
            }
        }
        
        return vars;
    }
}

module.exports = EnvInjectPlugin;