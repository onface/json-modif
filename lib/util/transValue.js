import replace from "../replace"
import extend from "safe-extend"
import parseQueryString from "./parseQueryString"
module.exports = function (target, value) {
    if (typeof value === 'function') {
        let index
        if (target.location.length) {
            index = parseQueryString(target.location[0]).arrayIndex.pop()
        }
        value = value(target.value, index)
    }
    return value
}
