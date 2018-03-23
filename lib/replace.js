import extend from "safe-extend"
import query from "./query"
import create from "./create"
module.exports = function replace (attrs, data, value, settings) {
    let cloneData = extend.clone(data)
    let defaultSettings = {
        separator: '.'
    }
    settings = extend(true, {}, defaultSettings, settings)
    let attrData = require('./attrsProps')(attrs, 'replace(attrs, data, data)', settings.separator)
    let queryResult = query(attrData.attrArray, cloneData, {
        complete: true,
        separator: settings.separator
    })
    cloneData = extend(true, cloneData, create(queryResult.location, ''))
    cloneData = extend(true, cloneData, create(queryResult.location, value))
    return cloneData
}
