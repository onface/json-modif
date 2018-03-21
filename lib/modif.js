import extend from "extend"
import replace from "./replace"
import query from "./query"
var cuid = require('cuid')
module.exports = function modif (attrs, data, value, settings) {
    let cloneData = extend(true, {}, data)
    let target = query(attrs, cloneData, settings)
    extend(true, target, value)
    return replace(attrs, cloneData, target, settings)
}
