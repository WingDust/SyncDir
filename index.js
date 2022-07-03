
const fs = require("fs");
const archiver = require("archiver");
const ignore = require("ignore");

const filterEmpty = (collection)=>{
  if (Array.isArray(collection)) {
    
    
  }
  
}


const gitignore = fs.readFileSync('.gitignore','utf-8').split('\n')
// const ig = ignore()
// const ig = ignore().add(['.abc/*', '!.abc/d/'])
const ig = ignore().add(['.abc/*', '!.abc/d/'])
console.log(ig)
console.log(gitignore)

