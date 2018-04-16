import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
import create from "./create"
import createArray from "./util/createArray"
import parseQueryString from "./util/parseQueryString"
import deleteArray from "./util/deleteArray"
const dc = require('delay-console')
module.exports = function (attrs, data, settings) {
    let defaultSettings = {
        separator: '.',
        all: true
    }
    settings = extend(true, {}, defaultSettings, settings)
    settings.complete = true
    let queryResultArray = query(attrs, data, settings)
    let output = extend.clone(data)
    /*必须倒着删除，否则第一次删除后的数组位置会改变，第二次删除时位置就不准确了*/
    queryResultArray.reverse().forEach((item, resultIndex) => {
        let lastKey = parseQueryString(item.location.pop())
        let parentLocation = item.location
        let target = output
        parentLocation.forEach(function (key, index) {
            target = target[key]
        })
        /* 这段代码需要优化 */
        if (lastKey.arrayIndex) {
            let targetArray = target[lastKey.attr]
            let lastArrayIndex = lastKey.arrayIndex.pop()
            let parentArrayIndex = lastKey.arrayIndex
            parentArrayIndex.forEach(function (index){
                targetArray = targetArray[index]
            })
            var deletedArray = deleteArray(targetArray, lastArrayIndex)
            if (parentArrayIndex.length === 0) {
                target[lastKey.attr] = deletedArray
            }
            else {
                let lastDeepArrayIndex = parentArrayIndex.pop()
                let parentDeepArrayIndex = parentArrayIndex
                if (parentDeepArrayIndex.length === 0) {
                    target[lastKey.attr][lastDeepArrayIndex] = deletedArray
                }
                else {
                    let parentDeepArray = target[lastKey.attr]
                    parentDeepArrayIndex.forEach(function (index) {
                        parentDeepArray = parentDeepArray[index]
                    })
                    parentDeepArray[lastDeepArrayIndex] = deletedArray
                }

            }
        }
        else {
            delete target[lastKey.attr]
        }
    })
    return output
}
