import extend from "safe-extend"
import query from "./query"
import create from "./create"
import queryStringToArray from "./util/queryStringToArray"
module.exports = function replace (attrs, data, value, settings) {
    settings = extend(true, {all: true}, settings)
    settings.complete = true
    let cloneData = extend.clone(data)
    let queryResult = query(attrs, cloneData, settings)
    if (settings.all) {
        queryResult.forEach(function (item) {
            cloneData = extend(true, cloneData, create(item.location, ''))
            cloneData = extend(true, cloneData, create(item.location, value))
        })
    }
    else {
        cloneData = extend(true, cloneData, create(queryResult.location, ''))
        cloneData = extend(true, cloneData, create(queryResult.location, value))
    }
    return cloneData
}
