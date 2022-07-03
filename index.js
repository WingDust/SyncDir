
const fs = require("fs");
const archiver = require("archiver");
const ignore = require("ignore");

const gitignore = fs.readdirSync('./.gitignore')
// const ig = ignore()
// const ig = ignore().add(['.abc/*', '!.abc/d/'])
const ig = ignore().add(['.abc/*', '!.abc/d/'])
console.log(ig)
console.log(gitignore)

