module.exports = function mediaArray (key) {
    let matchData = key.match(/(.*?)(\[.*)/)
    let attr = key
    let arrayIndex
    if (matchData) {
        attr = matchData[1]
        arrayIndex = matchData[2]
        arrayIndex = arrayIndex.replace(/(^\[|\]$)/g, '').split('][')
    }
    return {
        attr: attr,
        arrayIndex: arrayIndex
    }

}
