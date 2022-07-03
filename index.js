
const fs = require("fs");
const archiver = require("archiver");
const ignore = require("ignore");

// const ig = ignore()
const ig = ignore().add(['.abc/*', '!.abc/d/'])
console.log(ig)

