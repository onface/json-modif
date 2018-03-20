import extend from "extend"
function createArray (position, value) {
    let positionArray = position.replace(/(^\[|\]$)/g, '').split('][')
    let data = []
    positionArray.reverse().forEach(function (targetIndex, index) {
        let array = new Array()
        let target
        if (index === 0) {
            target = value
        }
        else {
            target = data[data.length-1]
        }
        array[targetIndex] = target
        data.push(array)
    })
    return data[data.length-1]
}
module.exports = function create(attrs, value) {
    let attrArray
    switch(attrs.constructor) {
        case String:
            attrArray = attrs.split('.')
        break
        case Array:
            attrArray = attrs
            attrs = attrs.join('.')
        break
        default:
            throw new Error("node_modules/json-modif: `create(attrs, value)` attrs must be string or array")
    }
    let data = []
    attrArray.reverse().forEach(function (key, index) {
        let matchData = key.match(/(.*?)(\[.*)/)
        let attr = key
        let arrayIndex
        if (matchData) {
            attr = matchData[1]
            arrayIndex = matchData[2]
        }
        let target
        if (index === 0) {
            target = value
        }
        else {
            target = data[data.length-1]
        }
        if (arrayIndex) {
            target = createArray(arrayIndex, target)
        }
        data.push({
            [attr]: target
        })
    })
    return data[data.length-1]
}
