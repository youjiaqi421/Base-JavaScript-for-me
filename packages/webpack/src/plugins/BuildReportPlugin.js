class BuildReportPlugin {
    constructor(options = {}) {
        this.filename = options.filename || 'build-report.json';
    }

    apply(compiler) {
        compiler.hooks.done.tap('BuildReportPlugin', (stats) => {
            const statsJson = stats.toJson({
                assets: true,
                chunks: true,
                modules: true,
                builtAt: true,
                hash: true
            });

            const report = {
                buildTime: new Date().toISOString(),
                hash: statsJson.hash,
                assets: statsJson.assets.map(asset => ({
                    name: asset.name,
                    size: (asset.size / 1024).toFixed(2) + ' KB'
                })),
                modules: statsJson.modules.map(module => ({
                    name: module.name,
                    size: (module.size / 1024).toFixed(2) + ' KB'
                })),
                totalSize: (statsJson.assets.reduce((total, asset) => total + asset.size, 0) / 1024).toFixed(2) + ' KB'
            };

            const reportJson = JSON.stringify(report, null, 2);
            const outputPath = compiler.options.output.path;
            const fs = compiler.outputFileSystem;
            const path = require('path');
            const reportPath = path.join(outputPath, this.filename);

            fs.writeFileSync(reportPath, reportJson);
            console.log('\n📊 Build report generated at:', this.filename);
            console.log('📦 Total bundle size:', report.totalSize);
        });
    }
}

module.exports = BuildReportPlugin;