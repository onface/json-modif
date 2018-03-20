module.exports = function (attrs, name) {
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
            throw new Error("node_modules/json-modif: `" + name + "` attrs must be string or array")
    }
    return {
        attrs: attrs,
        attrArray: attrArray
    }
}
