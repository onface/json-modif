import extend from "safe-extend"
import create from "./create"
import query from "./query"
import transValue from "./util/transValue"
module.exports = function set (attrs, value, data, settings) {
    settings = extend(true, {all: true}, settings)
    let cloneData = extend.clone(data)
    settings.complete = true

    let queryResult = query(attrs, extend(true, data, create(attrs, '')), settings)

    function setValue (item) {
        cloneData = extend(
            true,
            cloneData,
            create(item.location, transValue(item,value))
        )
    }
    if (settings.all) {
        queryResult.forEach(function (item) {
            setValue(item)
        })
    }
    else {
        setValue(queryResult)
    }
    return cloneData
}
