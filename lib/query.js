import extend from "extend"
import mediaArray from "./mediaArray"
import JSON5 from "json5"
module.exports = function query (attrs, data, settings) {
    let defaultSettings = {
        complete: false,
        separator: '.',
        all: false
    }
    settings = extend(true, {}, defaultSettings, settings)
    let location = []
    let attrParam = require('./attrsProps')(attrs, 'query(attrs, data)', settings.separator)
    attrs = attrParam.attrs
    let attrArray = attrParam.attrArray
    let target = extend(true, {}, data)
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
                    let resultData = target.filter(function (item, index) {
                        let match = keys.every(function (key) {
                            let value = queryData[key]
                            return item[key] === value
                        })
                        if (match) {
                            location.push(index)
                        }
                        return match
                    })
                    if (settings.all) {

                    }
                    if (settings.all) {
                        target = resultData
                    }
                    else {
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
        let cloneAttrs = attrs
        location.forEach(function (value, index) {
            cloneAttrs = cloneAttrs.replace(/\[.*?\]/, `{${value}}`)
        })
        cloneAttrs = cloneAttrs.replace(/\}/g,']').replace(/\{/g, '[')
        target = {
            location: cloneAttrs,
            locationArray: cloneAttrs.split(settings.separator),
            value: target
        }

    }
    return target
}
