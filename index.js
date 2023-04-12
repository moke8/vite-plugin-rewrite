const { existsSync } = require("node:fs");
const path = require("node:path");

module.exports = function rollupRewrite(options) {
    const { include, exclude, sign } = options;
    const dir = process.cwd()
    return {
        name: 'vite-plugin-rewrite',
        enforce: 'pre', // 标注必须在vite核心插件之前介入
        resolveId(id) {
            if (include && !include.test(id)) {
                return null;
            }
            if (exclude && exclude.test(id)) {
                return null;
            }
            const modifiedPath = path.join(dir, id.replace(/(\..+?$)/g, `_${sign}$1`))
            if (existsSync(modifiedPath)) {
                return modifiedPath
            }
        },
    };
}