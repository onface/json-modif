import coreQuery from "./coreQuery"
import queryStringToArray from "./util/queryStringToArray"
import extend from 'safe-extend'
module.exports = function (attrs, data, settings) {
    let defaultSettings = {
        complete: false,
        separator: '.',
        all: false
    }
    settings = extend(true, {}, defaultSettings, settings)
    let attrArray = queryStringToArray(attrs, 'query(attrs, data, settings)', settings.separator)
    var multiQuery = []
    var separateIndex = 0
    attrArray.forEach(function (item, index) {
        if (/\[.*?\]/.test(item)) {
            multiQuery.push(attrArray.slice(separateIndex, index+1))
            separateIndex = index + 1
        }
    })
    if (multiQuery.length === 0) {
        multiQuery = extend.clone(attrArray)
    }
    else if (separateIndex < attrArray.length){
        multiQuery.push([attrArray[attrArray.length - 1]])
    }

    var stat = [
        {
            location: [],
            value: data,
        }
    ]
    // console.log('multiQuery', multiQuery)
    multiQuery.forEach(function (query) {
        var newStat = []
        stat.forEach(function (currentStat, statIndex) {
            var currentQuery = query
            var output = coreQuery(currentQuery, currentStat.value, {
                all: true,
                complete: true
            })
            output.forEach(function(item, valueIndex) {
                item.location = currentStat.location.concat(item.location)
                return item
            })
            if (output.length === 0){
                return
            }
            newStat = newStat.concat(output)
        })
        stat = newStat
    })
    if (!settings.complete) {
        stat = stat.map(function (item) {
            return item.value
        })
    }
    if (!settings.all) {
        if (stat.length === 0) {
            stat = undefined
        }
        else {
            stat = stat[0]
        }
    }
    return stat
}
