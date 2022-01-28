# node 解析es6 modules

1. package.json type这是为module
2. 开启es6模式后，文件扩展名需要显式的写出来， 使用[--experimental-specifier-resolution=node](https://nodejs.org/api/esm.html#esm_customizing_esm_specifier_resolution_algorithm)启用自动解析扩展名
```ts
import core from './bin/index.js'
// 启用自动解析扩展名 --experimental-specifier-resolution=node
import core from './bin/index'
```
3. 开启自动解析扩展名还可以解决当type=module后引入`.json`文件会报`CustomError: ERR_UNSUPPORTED_DIR_IMPORT `的问题。
