import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
module.exports = function push (attrs, data, value, settings) {
    let cloneData = extend.clone(data)
    let target = query(attrs, cloneData, settings)
    if (!Array.isArray(target)) {
        throw new Error('node_modules/josn-modif: `push(attrs, target, value)` ' + attrs + ' must be array')
    }
    target.push(value)
    return replace(attrs, cloneData, target, settings)
}
