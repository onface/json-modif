module.exports = function queryStringToArray(queryString, name) {
    let queryArray
    if (typeof queryString === 'undefined') {
        throw new Error("node_modules/json-modif: `" + name + "` queryString must be string or array")
    }
    switch(queryString.constructor) {
        case String:
            queryArray = queryString.split('\n').map(function(item){return item.trim()}).join('').split('.')
        break
        case Array:
            queryArray = queryString
        break
        default:
            throw new Error("node_modules/json-modif: `" + name + "` queryString must be string or array")
    }
    return queryArray
}
