module.exports = function queryStringToArray(queryString, name, separator) {
    let queryArray
    switch(queryString.constructor) {
        case String:
            queryArray = queryString.split(separator)
        break
        case Array:
            queryArray = queryString
        break
        default:
            throw new Error("node_modules/json-modif: `" + name + "` queryString must be string or array")
    }
    return queryArray
}
