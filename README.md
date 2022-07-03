

同步
-----------

esbuild 编译包为一个单文件
` npx esbuild index.js --bundle --platform=node --outdir=dist`
-----------

压缩
- node zlib 是不能直接压缩文件与文件夹的
  - [Gzip is an algorithm that comprekses a string of data. It knows nothing about files or folders and so can't do what you want by itself. What you can do is use an archiver tool to build a single archive file, and then use gzip to compress the data that makes up the archive](https://stackoverflow.com/questions/21981919/compressing-multiple-files-using-zlib)
- 暂时不用[node-archiver](https://github.com/archiverjs/node-archiver) 而是 7z
-
-----------