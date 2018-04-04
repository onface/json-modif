/**
 * Parse query string
 * @param {string} queryString
 * @example
 * parseQueryString('user[1][4]')
 * // {arrayIndex: ["4", "1"], attr: "user"}
 */
module.exports = function parseQueryString (queryString) {
    let matchData = queryString.match(/(.*?)(\[.*)/)
    let attr = queryString
    let arrayIndex
    if (matchData) {
        attr = matchData[1]
        arrayIndex = matchData[2]
        arrayIndex = arrayIndex.replace(/(^\[|\]$)/g, '').split('][')
        arrayIndex = arrayIndex.map(function (item) {
            // item 可能是 "{id:'abcasfasf'}"
            return isNaN(parseInt(item))?item: parseInt(item)
        })
    }
    return {
        attr: attr,
        arrayIndex: arrayIndex
    }
}
