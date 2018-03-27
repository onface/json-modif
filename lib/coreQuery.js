import extend from "safe-extend"
import parseQueryString from "./util/parseQueryString"
import queryStringToArray from "./util/queryStringToArray"
import JSON5 from "json5"
module.exports = function coreQuery (attrs, data, settings) {
    let defaultSettings = {
        complete: true,
        separator: '.',
        all: true
    }
    settings = extend(true, {}, defaultSettings, settings)
    let locationIndex = []
    let attrArray = queryStringToArray(attrs, 'coreQuery(attrs, data, settings)', settings.separator)
    let target = extend(true, {}, data)
    let emptyResult
    let valueArray = []
    attrArray.forEach(function (key, index) {
        let mediaData = parseQueryString(key)
        // console.log('\n')
        // console.log(target, mediaData, target[mediaData.attr])
        // console.log('\n')
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
                    // if (settings.all) {
                    locationIndex.push(currentlocationIndex)
                        target = resultData
                        valueArray = valueArray.concat(resultData)
                    // }
                    // else {
                    //     locationIndex.push(currentlocationIndex[0])
                    //     target = resultData[0]
                    // }
                }
                else {
                    target = target[index]
                    valueArray.push(target)

                }
            })
        }
        else {
            valueArray.push(target)
        }
    })
    if (emptyResult) {
        valueArray = []
    }
    // if (settings.complete) {
    let location = []
    let cloneAttrArray = extend.clone(attrArray)
    let maxIndex = 1
    locationIndex.forEach(function (item) {
        maxIndex = maxIndex < item.length? item.length: maxIndex
    })
    for(let multidataIndex = 0; multidataIndex < maxIndex; multidataIndex++) {
        locationIndex.forEach(function (value, index) {
            let indexValue = value
            if (Array.isArray(value)) {
                indexValue = value[multidataIndex]
            }
            let replaced = false
            cloneAttrArray = cloneAttrArray.map(function (item) {
                if (replaced) { return item}
                if (/\[.*?\]/.test(item)) {
                    replaced = true
                    item = item.replace(/\[.*?\]/, `{${indexValue}}`)
                }
                return item
            })
        })
        cloneAttrArray = cloneAttrArray.map(function (item) {
            return item.replace(/\{(\d+)\}/g, '[$1]')
        })
        location.push(cloneAttrArray)
    }
    // if (!settings.all) {
    //     location = location[0]
    // }
    target = {
        location: location,
        value: valueArray
    }
    // }
    // if (settings.all && settings.complete) {
    if (typeof target.value === 'undefined') {
        target = []
    }
    else {
        target = target.value.map(function (value, index) {
            return {
                location: target.location[index],
                value: value
            }
        })
    }
    // }
    return target
}
