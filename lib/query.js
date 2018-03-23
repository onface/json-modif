import extend from "safe-extend"
import parseQueryString from "./util/parseQueryString"
import queryStringToArray from "./util/queryStringToArray"
import JSON5 from "json5"
module.exports = function query (attrs, data, settings) {
    let defaultSettings = {
        complete: false,
        separator: '.',
        all: false
    }
    settings = extend(true, {}, defaultSettings, settings)
    let locationIndex = []
    let attrParam = require('./attrsProps')(attrs, 'query(attrs, data)', settings.separator)
    attrs = attrParam.attrs
    let attrArray = attrParam.attrArray
    let target = extend(true, {}, data)
    let emptyResult
    attrArray.forEach(function (key, index) {
        let mediaData = parseQueryString(key)
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
                    let currentlocationIndex = []
                    let resultData = target.filter(function (item, index) {
                        let match = keys.every(function (key) {
                            let value = queryData[key]
                            return item[key] === value
                        })
                        if (match) {
                            currentlocationIndex.push(index)
                        }
                        return match
                    })
                    if (settings.all) {
                        locationIndex.push(currentlocationIndex)
                        target = resultData
                    }
                    else {
                        locationIndex.push(currentlocationIndex[0])
                        target = resultData[0]
                    }
                }
                else {
                    target = target[index]
                }
            })
        }
    })
    if (emptyResult) {
        target = undefined
    }
    if (settings.complete) {
        let resultCount = 1
        let location = []
        locationIndex.forEach(function (item) {
            resultCount = resultCount < item.length? item.length: resultCount
        })
        for(let multidataIndex = 0; multidataIndex < resultCount; multidataIndex++) {
            let cloneAttrs = attrs
            locationIndex.forEach(function (value, index) {
                let indexValue = value
                if (Array.isArray(value)) {
                    indexValue = value[multidataIndex]
                }
                cloneAttrs = cloneAttrs.replace(/\[.*?\]/, `{${indexValue}}`)
            })
            cloneAttrs = cloneAttrs.replace(/\}/g,']').replace(/\{/g, '[')
            location.push(cloneAttrs.split(settings.separator))
        }
        if (!settings.all) {
            location = location[0]
        }
        target = {
            location: location,
            value: target
        }

    }
    return target
}
