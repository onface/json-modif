import extend from "extend"
import mediaArray from "./mediaArray"
function createArray (position, value) {
    let data = []
    position.reverse().forEach(function (targetIndex, index) {
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
    let attrParam = require('./attrsProps')(attrs, 'create(attrs, value)')
    attrs = attrParam.attrs
    let attrArray = attrParam.attrArray
    let data = []
    attrArray.reverse().forEach(function (key, index) {
        let mediaData = mediaArray(key)
        let target
        if (index === 0) {
            target = value
        }
        else {
            target = data[data.length-1]
        }
        if (mediaData.arrayIndex) {
            target = createArray(mediaData.arrayIndex, target)
        }
        data.push({
            [mediaData.attr]: target
        })
    })
    return data[data.length-1]
}
