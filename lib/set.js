import extend from "safe-extend"
import create from "./create"
import query from "./query"
module.exports = function push (attrs, data, value, settings) {
    settings = settings || {}
    let cloneData = extend.clone(data)
    settings.complete = true
    let queryResult = query(attrs, data, settings)
    let target = query(attrs, cloneData, settings)
    if (settings.all) {
        queryResult.forEach(function (item) {
            cloneData = extend(
                true,
                cloneData,
                create(item.location, value)
            )
        })
    }
    else {
        cloneData = extend(
            true,
            cloneData,
            create(queryResult.location, value)
        )
    }
    return cloneData
}
