
const fs = require("fs");
const archiver = require("archiver");
const ignore = require("ignore");

/** 在数据处理过程中 无意义的值
 j 
 */
const nilValue = ['',null,undefined,[],{},false]


const objectToString = Object.prototype.toString
const toTypeString = (value) =>
  objectToString.call(value)

/** extract "RawType" from strings like "[object RawType]"
 * 
 */
const toRawType = (value) => toTypeString(value).slice(8, -1);

/** 判断对是否为空对象
 * - 为什么没有使用 JSON.stringify ,面对大对象的性能考量
 * - [判断对象是否为空对象 js](https://www.jianshu.com/p/972d0f277d45)
 */
const isEmptyObject = (object)=>{
  for (const key in object) {
    return true
  }
  return false
}

const captureEmpty = (defaultValue,value)=>{
  // console.log('val',value,JSON.stringify(value),toRawType(value).includes('HTML'));

  // HTMLSpanElement
  if (toRawType(value).includes('HTML')) return value
  // 避免 querySelectorAll 被 JSON.stringify 转成 {}
  if (toRawType(value).includes('NodeList')&&value.length>0) return value
  
  // 对象
  if (toRawType(value).includes('Object')&&isEmptyObject(value)) return defaultValue
  if (toRawType(value).includes('Array')&&value.length===0) return defaultValue
  
  if (nilValue.includes(value)) return defaultValue
  
  
  return value
  // switch (JSON.stringify(value)) {
  //   case '':          return defaultValue    
  //   case 'null':      return defaultValue        
  //   case undefined: return defaultValue             
  //   case '{}':        return defaultValue      
  //   case '[]':        return defaultValue      
  //   case 'false':return defaultValue
  
  //   default: return value
  // }
}
const isEmpty = value=>captureEmpty(true,value)

const filterEmpty = (collection)=>{
  if (Array.isArray(collection)) {
    let filterDuplicate = new Set(collection)
    nilValue.forEach(i=>filterDuplicate.delete(i))
    return Array.from(filterDuplicate)
  }
  
}



const gitignore = fs.readFileSync('.gitignore','utf-8').split('\n')
// const ig = ignore()
// const ig = ignore().add(['.abc/*', '!.abc/d/'])
const ig = ignore().add(filterEmpty(gitignore))
console.log(ig)
// console.log(filterEmpty(gitignore) )

