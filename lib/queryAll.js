import query from "./query"
module.exports = function queryAll () {
    var arg = Array.from(arguments)
    arg[2] = arg[2] || {}
    arg[2].all = true
    return query.apply(this, arg)
}
