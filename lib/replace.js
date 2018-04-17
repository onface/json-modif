import extend from "safe-extend"
import query from "./query"
import create from "./create"
import queryStringToArray from "./util/queryStringToArray"
module.exports = function replace (attrs, value, data, settings) {
    settings = extend(true, {all: true}, settings)
    settings.complete = true
    let cloneData = extend.clone(data)
    let queryResult = query(attrs, cloneData, settings)
    function setValue (location) {
        cloneData = extend(true, cloneData, create(location, ''))
        cloneData = extend(true, cloneData, create(location, value))
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
