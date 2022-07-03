
const fs = require("fs");
const archiver = require("archiver");
const ignore = require("ignore");

const captureEmpty = (value,defaultValue)=>{
  // console.log('val',value,JSON.stringify(value),toRawType(value).includes('HTML'));

  // HTMLSpanElement
  if (toRawType(value).includes('HTML')) return value
  // 避免 querySelectorAll 被 JSON.stringify 转成 {}
  if (toRawType(value).includes('NodeList')&&value.length>0) return value
  switch (JSON.stringify(value)) {
    case '':          return defaultValue    
    case 'null':      return defaultValue        
    case undefined: return defaultValue             
    case '{}':        return defaultValue      
    case '[]':        return defaultValue      
    case 'false':return defaultValue
  
    default: return value
  }
}
const isEmpty = value=>captureEmpty(value,true)

const filterEmpty = (collection)=>{
  if (Array.isArray(collection)) {
    let filterDuplicate = new Set(collection)
    
  }
  
}



const gitignore = fs.readFileSync('.gitignore','utf-8').split('\n')
// const ig = ignore()
// const ig = ignore().add(['.abc/*', '!.abc/d/'])
const ig = ignore().add(['.abc/*', '!.abc/d/'])
console.log(ig)
console.log(gitignore)

