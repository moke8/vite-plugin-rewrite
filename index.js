const { existsSync, readFileSync } = require("node:fs");

module.exports = function rollupRewrite(options) {
    const { include, exclude, binaryInclude, binaryExclude, sign, whiteMark } = options;
    const virtuals = {}
    const whiteMarkReg = new RegExp(whiteMark)
    const whiteMarkRowReg = new RegExp(`import .+? from .+?${whiteMark}.+?['"]`)
    return {
        name: 'vite-plugin-rewrite',
        enforce: 'pre', // 标注必须在vite核心插件之前介入
        load(id, code) {
            // 被引用 Referenced File Handle
            if (whiteMark && whiteMarkReg.test(id)) {
                if (virtuals[id]) {
                    return virtuals[id]
                }
            }
            // 文本文件内容替换 Text file content replacement
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
                if (whiteMark) {
                    virtuals[id] = code
                }
                return {
                    code: result
                }
            }
        },
        // 处理文件引入 Processing file import
        transform(code) {
            const paths = code.match(whiteMarkRowReg)
            paths?.forEach((pathLocal) => {
                const newPath = pathLocal.replace(/['"](.+)['"]/, `"$1?${whiteMark}"`)
                code = code.replace(pathLocal, newPath)
            })
            return code
        },
        // 处理二进制文件替换 Handling Binary File Replacement
        resolveId(id) {
            if (!binaryInclude && !binaryExclude) return null
            if (binaryInclude && !binaryInclude.test(id)) {
                return null;
            }
            if (binaryExclude && binaryExclude.test(id)) {
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