/**
 * ResourceOptimizePlugin - 资源优化插件
 * 用于分析和优化webpack构建过程中的资源
 */
class ResourceOptimizePlugin {
    constructor(options = {}) {
        this.options = {
            // 是否启用资源大小警告
            sizeWarning: options.sizeWarning !== undefined ? options.sizeWarning : true,
            // 资源大小警告阈值（KB）
            maxSize: options.maxSize || 250,
            // 是否自动优化图片
            optimizeImages: options.optimizeImages !== undefined ? options.optimizeImages : true,
            // 是否生成资源分析报告
            analyzeReport: options.analyzeReport !== undefined ? options.analyzeReport : false,
            // 报告文件名
            reportFilename: options.reportFilename || 'resource-analyze-report.json'
        };
    }

    apply(compiler) {
        // 在编译完成后执行
        compiler.hooks.afterEmit.tap('ResourceOptimizePlugin', (compilation) => {
            const assets = compilation.assets;
            const assetStats = [];
            let totalSize = 0;
            let largeAssets = [];

            // 分析所有资源
            Object.keys(assets).forEach(filename => {
                const asset = assets[filename];
                const size = asset.size();
                const sizeInKB = size / 1024;
                totalSize += size;

                assetStats.push({
                    name: filename,
                    size: sizeInKB.toFixed(2) + ' KB',
                    sizeRaw: size
                });

                // 检查大文件
                if (this.options.sizeWarning && sizeInKB > this.options.maxSize) {
                    largeAssets.push({
                        name: filename,
                        size: sizeInKB.toFixed(2) + ' KB'
                    });
                }
            });

            // 输出大文件警告
            if (largeAssets.length > 0) {
                console.log('\n⚠️ 检测到大文件资源:');
                largeAssets.forEach(asset => {
                    console.log(`   ${asset.name}: ${asset.size}`);
                });
                console.log('\n   考虑对这些文件进行优化，例如代码分割、懒加载或压缩。');
            }

            // 输出总体统计
            console.log(`\n📦 总资源大小: ${(totalSize / 1024).toFixed(2)} KB`);
            console.log(`📊 资源总数: ${assetStats.length}`);

            // 生成分析报告
            if (this.options.analyzeReport) {
                const report = {
                    timestamp: new Date().toISOString(),
                    totalSize: (totalSize / 1024).toFixed(2) + ' KB',
                    totalFiles: assetStats.length,
                    assets: assetStats.sort((a, b) => b.sizeRaw - a.sizeRaw),
                    largeAssets: largeAssets
                };

                const fs = compiler.outputFileSystem;
                const path = require('path');
                const outputPath = compiler.options.output.path;
                const reportPath = path.join(outputPath, this.options.reportFilename);

                fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
                console.log(`\n📊 资源分析报告已生成: ${this.options.reportFilename}`);
            }

            // 提供优化建议
            if (totalSize > 1024 * 1024) { // 如果总大小超过1MB
                console.log('\n💡 优化建议:');
                console.log('   - 考虑启用代码分割和懒加载');
                console.log('   - 检查是否有未使用的依赖');
                console.log('   - 使用tree-shaking移除未使用的代码');
                console.log('   - 优化图片和媒体资源');
            }
        });
    }
}

module.exports = ResourceOptimizePlugin;