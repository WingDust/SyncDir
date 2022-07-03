

同步
-----------

esbuild 编译包为一个单文件
` npx esbuild index.js --bundle --platform=node --outdir=dist`
-----------

压缩
- node zlib 是不能直接压缩文件与件的
  - 
- 暂时不用[node-archiver](https://github.com/archiverjs/node-archiver) 而是 7z
-
-----------