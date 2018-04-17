import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
module.exports = function unshift (attrs, value, data, settings) {
    settings = extend(true, {all: true}, settings)
    let cloneData = extend.clone(data)
    if (settings.all) {
        settings.complete = true
    }
    let target = query(attrs, cloneData, settings)
    function setValue (target, attrs) {
        if (!Array.isArray(target)) {
            throw new Error('node_modules/josn-modif: `push(attrs, target, value)` ' + attrs + ' must be array')
        }
        target.unshift(value)
        cloneData = replace(attrs, target, cloneData, settings)
    }
    if (settings.all) {
        target.forEach(function (item) {
            setValue(item.value, item.location)
        })
    }
    else {
        setValue(target, attrs)
    }
    return cloneData
}
