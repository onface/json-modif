import extend from "safe-extend"
import query from "./query"
import create from "./create"
import queryStringToArray from "./util/queryStringToArray"
import transValue from "./util/transValue"
module.exports = function replace (attrs, value, data, settings) {
    settings = extend(true, {all: true}, settings)
    settings.complete = true
    let cloneData = extend.clone(data)
    let queryResult = query(attrs, cloneData, settings)
    function setValue (target) {
        cloneData = extend(true, cloneData, create(target.location, ''))
        cloneData = extend(true, cloneData, create(target.location, transValue(target, value)))
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
