import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
module.exports = function change (attrs, data, value, settings) {
    settings = extend(true, {all: true}, settings)
    let cloneData = extend.clone(data)
    if (settings.all) {
        settings.complete = true
    }
    let target = query(attrs, cloneData, settings)
    if (settings.all) {
        target.forEach(function (item, index) {
            item.value = extend(true, item.value, value)
            cloneData = replace(item.location, cloneData, item.value, settings)
        })
    }
    else {
        target = extend(true, target, value)
        cloneData = replace(attrs, cloneData, target, settings)
    }
    return cloneData
}
