const { existsSync } = require("node:fs");
const path = require("node:path");

module.exports = function rollupRewrite(options) {
    const { include, exclude, sign } = options;
    const dir = process.cwd()
    return {
        name: 'vite-plugin-rewrite',
        enforce: 'pre', // 标注必须在vite核心插件之前介入
        resolveId(id, pat) {
            let dir2 = ''
            if (include && !include.test(id)) {
                return null;
            }
            if (exclude && exclude.test(id)) {
                return null;
            }
            if (/^\./.test(id)) {
                dir2 = pat.replace(/([\/\\].+)([\/\\].+?\..+?)$/, `$1${path.sep}`)
                id = path.join(dir2, id)
            }
            if (/^[\/\\]/.test(id)) {
                id = path.join(dir, id)
            }
            const modifiedPath = id.replace(/(\..+?$)/g, `_${sign}$1`)
            if (existsSync(modifiedPath)) {
                console.log('modifiedPath', modifiedPath)
                return modifiedPath
            }
        },
    };
}
