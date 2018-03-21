import extend from "extend"
import query from "./query"
import create from "./create"
var cuid = require('cuid')
module.exports = function replace (attrs, data, value, settings) {
    let cloneData = extend(true, {}, data)
    let defaultSettings = {
        separator: '.'
    }
    settings = extend(true, {}, defaultSettings, settings)
    let attrData = require('./attrsProps')(attrs, 'replace(attrs, data, data)', settings.separator)
    let queryResult = query(attrData.attrArray, cloneData, {
        complete: true,
        separator: settings.separator
    })
    extend(true, cloneData, create(queryResult.locationArray, ''))
    extend(true, cloneData, create(queryResult.locationArray, value))
    return cloneData
}