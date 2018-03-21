import extend from "extend"
import replace from "./replace"
import query from "./query"
var cuid = require('cuid')
module.exports = function unshift (attrs, data, value, settings) {
    let cloneData = extend(true, {}, data)
    let target = query(attrs, cloneData, settings)
    if (!Array.isArray(target)) {
        throw new Error('node_modules/josn-modif: `push(attrs, target, value)` ' + attrs + ' must be array')
    }
    target.unshift(value)
    return replace(attrs, cloneData, target, settings)
}
