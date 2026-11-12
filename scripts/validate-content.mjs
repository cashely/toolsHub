// 仅校验内容，不写索引产物
process.env.VALIDATE_ONLY = '1'
await import('./build-index.mjs')
