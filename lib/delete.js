import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
import create from "./create"
import createArray from "./util/createArray"
import parseQueryString from "./util/parseQueryString"
import deleteArray from "./util/deleteArray"
module.exports = function (attrs, data, settings) {
    let defaultSettings = {
        separator: '.'
    }
    settings = extend(true, {}, defaultSettings, settings)
    settings.all = true
    settings.complete = true
    let queryResultArray = query(attrs, data, settings)
    let output = extend.clone(data)
    queryResultArray.forEach((item, index) => {
        let lastKey = parseQueryString(item.location.pop())
        let parentLocation = item.location
        let target = output
        parentLocation.forEach(function (key, index) {
            target = target[key]
        })
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