import extend from "safe-extend"
import create from "./create"
import query from "./query"
module.exports = function push (attrs, data, value, settings) {
    settings = settings || {}
    let cloneData = extend.clone(data)
    if (settings.all) {
        settings.complete = true
    }
    let target = query(attrs, cloneData, settings)
    if (settings.all) {

    }
    else {
        cloneData = extend(
            true,
            cloneData,
            create(attrs, value)
        )

    }
    return cloneData
}
