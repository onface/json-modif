import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
module.exports = function change (attrs, data, value, settings) {
    let cloneData = extend.clone(data)
    let target = query(attrs, cloneData, settings)
    target = extend(true, target, value)
    return replace(attrs, cloneData, target, settings)
}
