# vite-plugin-rewrite
## English
```vite-plugin-rewrite``` Plugin support ``` vite3 ```, providing pre compile file replacement capability based on ``` rollup ```
### usage method
install
```
npm i rollup-plugin-rewrite
```
Refer to vite configuration
```
// vite.config.ts
...
    plugins: [
        rewrite({
            include: /\.tsx?$/, // Files that need to be replaced RegExp
            exclude: /node_modules/, // Excluded Files RegExp
            binaryInclude: /\.jpg?$/, // Binary Files that need to be replaced RegExp
            binaryExclude: /node_modules/, // Excluded Binary Files RegExp
            sign: '@rewrite' // Replaced file path
        }),
    ]
...
```
Through the above configuration, all tsx files and not ``` node_modules ``` In folder:
If there are A.tsx and A@rewrite.tsx Rewrite the reference to A.tsx as A@rewrite.tsx Fulfill the purpose of replacement

## 中文
```vite-plugin-rewrite``` 插件支持 ```vite3```，提供了基于```rollup```的文件编译前替换能力

### 使用方法
安装
```
npm i rollup-plugin-rewrite
```
参考vite配置
```
// vite.config.ts
...
    plugins: [
        rewrite({
            include: /\.tsx?$/, // 需要替换的文件正则
            exclude: /node_modules/, // 排除的文件正则
            binaryInclude: /\.jpg?$/, // 需要替换的二进制文件正则
            binaryExclude: /node_modules/, // 排除的二进制文件正则
            sign: '@rewrite' // 替换的文件路径
        }),
    ]
...
```
通过以上配置实现了，所有tsx文件非node_modules文件夹内的：
如存在 A.tsx和 A@rewrite.tsx 则将 A.tsx 的引用重写为 A@rewrite.tsx 实现替换目的