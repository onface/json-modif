import extend from "extend"
import mediaArray from "./mediaArray"
import JSON5 from "json5"
module.exports = function query (attrs, data) {
    let attrParam = require('./attrsProps')(attrs, 'query(attrs, data)')
    attrs = attrParam.attrs
    let attrArray = attrParam.attrArray
    let target = data
    let emptyResult
    attrArray.forEach(function (key, index) {
        let mediaData = mediaArray(key)
        if (typeof target[mediaData.attr] === 'undefined') {
            emptyResult = true
            return
        }
        target = target[mediaData.attr]
        if (mediaData.arrayIndex) {
            mediaData.arrayIndex.forEach(function (index) {
                let queryData
                if (/^\{/.test(index)) {
                    queryData = JSON5.parse(index)
                }
                if (queryData) {
                    let keys = Object.keys(queryData)
                    let resultData = target.filter(function (item) {
                        return keys.every(function (key) {
                            let value = queryData[key]
                            return item[key] === value
                        })
                    })
                    target = resultData[0]
                }
                else {
                    target = target[index]
                }
            })
        }
    })
    if (emptyResult) {
        return undefined
    }
    return target
}
