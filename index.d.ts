declare const _default: (options: {
    include?: RegExp
    exclude?: RegExp
    binaryInclude?: RegExp
    binaryExclude?: RegExp
    sign?: string
}) => {
    name: string
    enforce: string
    resolveId: (id: string) => string
}

export { _default as default }

