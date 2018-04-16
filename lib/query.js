import coreQuery from "./coreQuery"
import queryStringToArray from "./util/queryStringToArray"
import getMultiQuery from "./util/getMultiQuery"
import extend from 'safe-extend'
const dc = require('delay-console')
module.exports = function (attrs, data, settings) {
    let defaultSettings = {
        complete: false,
        all: false
    }
    /**/
    dc.group('%cquery.js', 'color:red;')
    dc.$input('query', attrs, data, settings)
    /**/
    settings = extend(true, {}, defaultSettings, settings)
    var getMultiQueryParam = queryStringToArray(attrs, 'query(attrs, data, settings)')
    /**/
    dc.group('getMultiQuery')
    dc.$input('getMultiQuery', getMultiQueryParam)
    /**/
    var multiQuery = getMultiQuery(getMultiQueryParam)
    /**/
    dc.$output('getMultiQuery', multiQuery)
    /**/
    var output = [
        {
            /**
             * location 存储数据索引位置
             * @example
             * ["user", "title"]
             * ["user", "list[0]", "name"]
             * 不会存放 ['user', 'list[{name: "nimo"}]']
             * 因为 list[JSON] 是查询条件
             * 查询条件会被 coreQuery 转换为 list[index] 即 list[0] list[1] 这种格式
             * */
            location: [],
            /**
             * value 数据
             * @example
             * {class:{user: "nimo"}}
             * 在接下来的 multiQuery.forEach(callback) 中每次 callback 都会将
             * 新的 value 替换到 output，直到找到目标值
             * */
            value: data,
        }
    ]
    /**/
    dc.groupEnd()
    dc.log('init output', output)
    dc.group('multiQuery.forEach')
    /**/
    multiQuery.forEach(function (query) {
        /**
         * newOutput 在函数执行完成后会变成新的 output
         * */
        var newOutput = []
        /**/
        dc.log('var newOutput = ', newOutput)
        dc.group('output.forEach')
        /**/
        output.forEach(function (currentOutput, outputIndex) {
            var queryResult = coreQuery(query, currentOutput.value, {
                all: true,
                complete: true
            })
            /**/
            dc.log('var queryResult = ', queryResult)
            dc.group('queryResult.forEach')
            /**/
            queryResult.forEach(function(item, valueIndex) {
                /**
                 * 追加上级 location, 因为最终的 output[index].location 需要包含完整信息
                 * @example
                 * item.location = ["class"].concat(["user"])
                 * item.location = ["class", "user"].concat(["title"])
                 * */
                dc.log('item.location = ', currentOutput.location, '.concat(', item.location, ')' )
                item.location = currentOutput.location.concat(item.location)
                return item
            })
            /**/dc.groupEnd()/**/
            if (queryResult.length === 0){
                return
            }
            /**/
            dc.log('newOutput = ', newOutput, '.concat(', queryResult, ')')
            /**/
            newOutput = newOutput.concat(queryResult)
        })
        /**/dc.groupEnd()/**/
        output = newOutput
        /**/
        dc.log('output = ', newOutput)
        /**/
    })
    /**/
    dc.groupEnd()
    /**/
    /**
     * 当 complete: false 不需要 location
     * */
    if (!settings.complete) {
        output = output.map(function (item) {
            return item.value
        })
    }
    /**
     * 当 all: false 只需要第一个数据，当没有结果时返回 undefined
     * */
    if (!settings.all) {
        if (output.length === 0) {
            output = undefined
        }
        else {
            output = output[0]
        }
    }
    /**/
    dc.$output('query', output)
    dc.$show()
    /**/
    return output
}
