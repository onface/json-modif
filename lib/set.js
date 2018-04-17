import extend from "safe-extend"
import create from "./create"
import query from "./query"
module.exports = function push (attrs, value, data, settings) {
    settings = settings || {}
    let cloneData = extend.clone(data)
    settings.complete = true
    let queryResult = query(attrs, data, settings)
    let target = query(attrs, cloneData, settings)
    function setValue (location) {
        cloneData = extend(
            true,
            cloneData,
            create(location, value)
        )
    }
    if (settings.all) {
        queryResult.forEach(function (item) {
            setValue(item.location)
        })
    }
    else {
        setValue(queryResult.location)
    }
    return cloneData
}
