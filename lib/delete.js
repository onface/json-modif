import extend from "safe-extend"
import replace from "./replace"
import query from "./query"
import create from "./create"
module.exports = function (attrs, data, settings) {
    let defaultSettings = {
        separator: '.'
    }
    settings = extend(true, {}, defaultSettings, settings)
    settings.all = true
    settings.complete = true
    let queryResultArray = query(attrs, data, settings)
    let output = extend.clone(data)
    queryResultArray.forEach((item, index) => {
        let lastKey = item.location.pop()
        let parentLocation = item.location
        let target = output
        parentLocation.forEach(function (key, index) {
            target = target[key]
        })
        delete target[lastKey]
    })
    return output
}
