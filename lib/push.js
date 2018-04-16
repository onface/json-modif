import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
module.exports = function push (attrs, data, value, settings) {
    settings = settings || {}
    let cloneData = extend.clone(data)
    if (settings.all) {
        settings.complete = true
    }
    let target = query(attrs, cloneData, settings)
    if (settings.all) {
        target.forEach(function (item) {
            if (!Array.isArray(item.value)) {
                throw new Error('node_modules/josn-modif: `push(attrs, target, value)` ' + attrs + ' must be array')
            }
            item.value.push(value)
            cloneData = replace(item.location, cloneData, item.value, settings)
        })
    }
    else {
        if (!Array.isArray(target)) {
            throw new Error('node_modules/josn-modif: `push(attrs, target, value)` ' + attrs + ' must be array')
        }
        target.push(value)
        cloneData = replace(attrs, cloneData, target, settings)
    }
    return cloneData
}
