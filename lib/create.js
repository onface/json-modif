import extend from "safe-extend"
import parseQueryString from "./util/parseQueryString"
import createArray from "./util/createArray"
module.exports = function create(attrs, value, settings) {
    let defaultSettings = {
        separator: '.'
    }
    settings = extend(true, {}, defaultSettings, settings)
    let attrParam = require('./attrsProps')(attrs, 'create(attrs, value)', settings.separator)
    attrs = attrParam.attrs
    let attrArray = attrParam.attrArray
    let data = []
    extend.clone(attrArray).reverse().forEach(function (key, index) {
        let mediaData = parseQueryString(key)
        let arrayValue
        if (index === 0) {
            arrayValue = value
        }
        else {
            arrayValue = data[data.length-1]
        }
        if (mediaData.arrayIndex) {
            arrayValue = createArray(mediaData.arrayIndex, arrayValue)
        }
        data.push({
            [mediaData.attr]: arrayValue
        })
    })
    return data[data.length-1]
}
