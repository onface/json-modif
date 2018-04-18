import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
import transValue from "./util/transValue"
module.exports = function change (attrs, value, data, settings) {
    settings = extend(true, {all: true}, settings)
    let cloneData = extend.clone(data)
        settings.complete = true
    let target = query(attrs, cloneData, settings)
    function setValue (target) {
        target.value = extend(true, target.value, transValue(target, value))
        cloneData = replace(target.location, target.value, cloneData, settings)
    }
    if (settings.all) {
        target.forEach(function (item, index) {
            setValue(item)
        })
    }
    else {
        setValue(target)
    }
    return cloneData
}
