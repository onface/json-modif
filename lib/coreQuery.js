import extend from "safe-extend"
import parseQueryString from "./util/parseQueryString"
import queryStringToArray from "./util/queryStringToArray"
import JSON5 from "json5"
const dc = require('delay-console')
/**
 *  lib/query.js 不支持 'list[JSON].skills[JSON]' 的多级JSON多结果查询
 * @param {array} attrArray
 * @param {object|array} data
 * @param {object} settings
 * @return
 *      query(attrArray data, {complete: false, all: false})
 *      "nimo"
 *
 *      query(attrArray data, {complete: true, all: false})
 *      {
 *          location: ["user","title"]
 *          value: "nimo"
 *      }
 *
 *      query(attrArray data, {complete: true, all: true})
 *      [
 *        {
 *              location: ["user","title[0]"]
 *              value: "nimo"
 *        },
 *        {
 *              location: ["user","title[1]"]
 *              value: "nico"
 *        }
 *      ]
 * 更多详细信息参考文档
 */
module.exports = function coreQuery(attrArray, data, settings) {
    let defaultSettings = {
        complete: true,
        separator: '.',
        all: true
    }
    settings = extend(true, {}, defaultSettings, settings)
    /* *
     * locationIndexData 记录查询目标数组的索引位置
     * query(['list[{name:"nimo"}]'], data, {complete: true}) 的返回结果
     * { location: [...] } 中的 location 需要基于 locationIndexData 生成
     * @example
         query(
             'list[{name:"nimo"}].skills[{html:true}]',
             {
                 list: [
                     {name: 'nimo'},
                     {name: 'nico'},
                     {
                         name: 'nimo',
                         skills: [
                             {},
                             {},
                             {html: true},
                             {html: true}
                         ]
                     }
                 ]
             }
         )
         locationIndexData = [
             [0,2], // list[0] list[2]
             [2,3]  // list[2][2] list[2][]
         ]
     * */
    let locationIndexData = []
    let target = extend.clone(data)
    let emptyResult
    let valueArray = []
    attrArray.forEach(function (key, index) {
        /* *
         * @example
         * "title"
         * {arrayIndex:undefined, attr: "title"}
         *
         * "list[1]"
         * {arrayIndex: ["1"], attr: "list"}
         *
         * "user[4][1]"
         * {arrayIndex: ["4", "1"], attr: "user"}
         * */
        let mediaData = parseQueryString(key)
        if (typeof target[mediaData.attr] === 'undefined') {
            emptyResult = true
            return
        }
        // 无论 mediaData 是哪种情况，都需要赋值 attr
        target = target[mediaData.attr]
        if (!mediaData.arrayIndex) {
            valueArray = [target]
        }
        else {
            /**
             * @example
             * ["4", "1"].forEach(callback)
             * ['{name:"nimo"}', 1].forEach(callback)
             * */
            mediaData.arrayIndex.forEach(function (index) {
                let queryData
                if (/^\{/.test(index)) {
                    queryData = JSON5.parse(index)
                }
                if (!queryData) {
                    target = target[index]
                    valueArray = [target]
                }
                else {
                    /**
                     * @example
                     * queryData = {name:"nimo"}
                     * keys = ["name"]
                     *
                     * queryData = {name:"nimo", type: "read"}
                     * keys = ["name", "type"]
                     * */
                    let currentLocationIndexData = []
                    /**
                     * 获取能匹配 queryData 的数据，并记录 currentLocationIndexData
                     * 提示：当查询条件是 'list[{name: "nimo"}]' 才会有 queryData
                     * 此时 target 一定是数组
                     * */
                    let resultData = target.filter(function (item, index) {
                        let match = Object.keys(queryData).every(function (key) {
                            let value = queryData[key]
                            // 有时候后端会将 id 作为字符串返回有时候是数字所以不做全等判断
                            return item[key] == value
                        })
                        if (match) {
                            /**
                             * @example
                             * [].push(1)
                             * [1].push(3)
                             * [1,3].push(4)
                             * */
                            currentLocationIndexData.push(index)
                        }
                        return match
                    })
                    locationIndexData.push(currentLocationIndexData)
                    target = resultData
                    valueArray = resultData
                }
            })
        }
    })
    /**
     * query('class.user.demo', {class:{user: {title: 'nimo'}}})
     * 进行到 demo 第三次遍历将查不到 demo 属性，此时将 valueArray 赋值空数组
     * */
    if (emptyResult) {
        valueArray = []
    }
    let location = []
    /**
     * cloneAttrArray 用于遍历查找 "key[JSON]" 将 [JSON] 替换成为 [index]
     * 比如 list[{name:"nimo"}] => list[0]
     * */
    let cloneAttrArray = extend.clone(attrArray)
    // 将 list[JSON] 转换为 list[index] 记录到 location
    let maxIndex = 1
    locationIndexData.forEach(function (item) {
        maxIndex = maxIndex < item.length? item.length: maxIndex
    })
    for(let multidataIndex = 0; multidataIndex < maxIndex; multidataIndex++) {
        locationIndexData.forEach(function (value, index) {
            let indexValue = value
            if (Array.isArray(value)) {
                indexValue = value[multidataIndex]
            }
            let replaced = false
            cloneAttrArray = cloneAttrArray.map(function (item) {
                if (replaced) { return item}
                if (/\[.*?\]/.test(item)) {
                    replaced = true
                    item = item.replace(/\[.*?\]/, `{${indexValue}}`)
                }
                return item
            })
        })
        cloneAttrArray = cloneAttrArray.map(function (item) {
            return item.replace(/\{(\d+)\}/g, '[$1]')
        })
        location.push(cloneAttrArray)
    }
    target = {
        location: location,
        value: valueArray
    }
    if (typeof target.value === 'undefined') {
        target = []
    }
    else {
        target = target.value.map(function (value, index) {
            return {
                location: target.location[index],
                value: value
            }
        })
    }
    return target
}
