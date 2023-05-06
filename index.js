const { existsSync, readFileSync } = require("node:fs");
const path = require("node:path");

module.exports = function rollupRewrite(options) {
    const { include, exclude, binaryInclude, binaryExclude, sign } = options;
    const dir = process.cwd()
    return {
        name: 'vite-plugin-rewrite',
        enforce: 'pre', // 标注必须在vite核心插件之前介入
        load(id) {
            if (!include && !exclude) return null
            if (include && !include.test(id)) {
                return null;
            }
            if (exclude && exclude.test(id)) {
                return null;
            }
            const modifiedPath = id.replace(/(\..+?$)/g, `_${sign}$1`)
            if (existsSync(modifiedPath)) {
                const result = readFileSync(modifiedPath).toString()
                return {
                    code: result
                }
            }
        },
        resolveId(id) {
            if (!binaryInclude && !binaryExclude) return null
            if (binaryInclude && !include.test(id)) {
                return null;
            }
            if (binaryExclude && exclude.test(id)) {
                return null;
            }
            const modifiedPath = id.replace(/(\..+?$)/g, `_${sign}$1`)
            if (existsSync(modifiedPath)) {
                return modifiedPath
            }
            return null
        }
    };
}