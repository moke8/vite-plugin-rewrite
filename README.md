# vite-plugin-rewrite
## English
```vite-plugin-rewrite``` Plugin support ``` vite3 ```, providing pre compile file replacement capability based on ``` rollup ```
### usage method
#### install
```
npm i vite-plugin-rewrite
```
#### Refer to vite configuration
```
// vite.config.ts
...
    plugins: [
        rewrite({
            include: /\.tsx?$/, // Files that need to be replaced RegExp
            exclude: /node_modules/, // Excluded Files RegExp
            binaryInclude: /\.jpg?$/, // Binary Files that need to be replaced RegExp
            binaryExclude: /node_modules/, // Excluded Binary Files RegExp
            sign: '_rewrite', // Replaced file path
            whiteMark: 'no-rewrite' // White list identification, references containing this string will not be replaced (to avoid loop introduction caused by inheritance)
        }),
    ]
...
```
Through the above configuration, all tsx files and not ``` node_modules ``` In folder:
If there are A.tsx and A@rewrite.tsx Rewrite the reference to A.tsx as A@rewrite.tsx Fulfill the purpose of replacement

#### About whiteMark (you can choose not to use this feature)

Due to the possibility of being referenced in the replaced file, this configuration has been introduced to avoid circular referencing
It will save the content of your replaced file for possible reference use

To reference this content, you need to configure '@ your whitelist ID': use @ as the root directory flag in tsconfig and vite.config.ts along with '@'
And the introduction of '@ your whitelist identifier' will refer to the replaced content

As configured with whiteMark: no-rewrite
```
import { Draft as DraftRender } from '@no-rewrite/views/work/Draft';
```

However, it should be noted that since the @ identifier is replaced with an absolute path in vite, we have made some adjustments to the reference path, and you may need to be compatible with it in vite
as
```
import { Draft as DraftRender } from '@no-rewrite/views/work/Draft';
```

Will be replaced with
```
import { Draft as DraftRender } from '@no-rewrite/views/work/Draft? no-rewrite';
```

You may need to add plugins that may not match in vite by specifying include to add them
```
plugins: [
    rewrite({
        include: /\.tsx|\.tsx\?.+?$/,
        exclude: /node_modules/,
        binaryInclude: /\.jpg?$/,
        binaryExclude: /node_modules/,
        sign: process.env.TENANT,
        whiteMark: 'no-rewrite'
    }),
    vue(),
    AutoImport({
        imports: ["vue", 'vue-router'],
        resolvers: [ElementPlusResolver()],
        dts: "auto-imports.d.ts",
        dirs: ["./src/utils", "./src/render"],
        include: /\.tsx|\.js|\.ts|\.vue|\.tsx\?.+?$/
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
    vueJsx({
        include: /\.tsx|\.js|\.ts|\.vue|\.tsx\?.+?$/
    }),
],
resolve: {
    alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@no-rewrite": fileURLToPath(new URL("./src", import.meta.url)),
    },
},
```
## 中文
```vite-plugin-rewrite``` 插件支持 ```vite3```，提供了基于```rollup```的文件编译前替换能力

### 使用方法
#### 安装
```
npm i rollup-plugin-rewrite
```
#### 参考vite配置
```
// vite.config.ts
...
plugins: [
    rewrite({
        include: /\.tsx?$/, // 需要替换的文件正则
        exclude: /node_modules/, // 排除的文件正则
        binaryInclude: /\.jpg?$/, // 需要替换的二进制文件正则
        binaryExclude: /node_modules/, // 排除的二进制文件正则
        sign: '_rewrite', // 替换的文件路径
        whiteMark: 'no-rewrite' // 白名单标识, 含有该字符串的引用将不会被替换, (避免继承导致的循环引入)

    }),
],
resolve: {
    alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@no-rewrite": fileURLToPath(new URL("./src", import.meta.url)),
    },
},
...
```
通过以上配置实现了，所有tsx文件非node_modules文件夹内的：
如存在 A.tsx和 A@rewrite.tsx 则将 A.tsx 的引用重写为 A@rewrite.tsx 实现替换目的

#### 关于 whiteMark (您可以选择不使用该特性)

由于被替换文件存在被引用的可能, 为避免循环引用, 引入了这一配置
它将会保存你的被替换文件内容, 以提供给可能存在的引用使用

需要引用这块内容, 你需要配置 "@你的白名单标识": 在tsconfig和vite.config.ts 中 与 @ 一同作为根目录标志
而你具备 "@你的白名单标识" 的引入, 将会引用到被替换的内容

如配置的whiteMark: no-rewrite
```
import { Draft as DraftRender } from '@no-rewrite/views/work/Draft';
```

但是需要注意, 因为 @ 的标识在vite中都会被替换为绝对路径, 因此我们将引用路径做了一定的处理, 你可能需要在vite中兼容它
如
```
import { Draft as DraftRender } from '@no-rewrite/views/work/Draft';
```
将会被替换为
```
import { Draft as DraftRender } from '@no-rewrite/views/work/Draft?no-rewrite';
```

你可能需要在vite中将可能不匹配的插件, 指定include增加引入
```
plugins: [
    rewrite({
        include: /\.tsx|\.tsx\?.+?$/,
        exclude: /node_modules/,
        binaryInclude: /\.jpg?$/,
        binaryExclude: /node_modules/,
        sign: process.env.TENANT,
        whiteMark: 'no-rewrite'
    }),
    vue(),
    AutoImport({
        imports: ["vue", 'vue-router'],
        resolvers: [ElementPlusResolver()],
        dts: "auto-imports.d.ts",
        dirs: ["./src/utils", "./src/render"],
        include: /\.tsx|\.js|\.ts|\.vue|\.tsx\?.+?$/
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
    vueJsx({
        include: /\.tsx|\.js|\.ts|\.vue|\.tsx\?.+?$/
    }),
],
```
