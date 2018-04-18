import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
import transValue from "./util/transValue"
module.exports = function push (attrs, value, data, settings) {
    settings = extend(true, {all: true}, settings)
    let cloneData = extend.clone(data)
    settings.complete = true
    let target = query(attrs, cloneData, settings)
    function setValue (target) {
        if (!Array.isArray(target.value)) {
            throw new Error('node_modules/josn-modif: `push(attrs, target, value)` ' + attrs + ' must be array')
        }
        target.value.push(transValue(target, value))
        cloneData = replace(target.location, target.value, cloneData, settings)
    }
    if (settings.all) {
        target.forEach(function (item) {
            setValue(item)
        })
    }
    else {
        setValue(target)
    }
    return cloneData
}
