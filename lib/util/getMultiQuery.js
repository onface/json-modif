import extend from "safe-extend"
/**
 * getMultiQuery
 *  @param {array} attrArray 属性数组
 *  @return
 *  getMultiQuery(['user', 'list[{name: "nimo"}]', 'skills[{html: true}]', 'name'])
 * [
 *  [
 *      'user',
 *      'list[{name: "nimo"}]'],
 *  [
 *      'skills[{html: true}]',
 *      'name'
 * ]
 * ]
 * coreQuery 是无法直接查询多级多结果数据，所以需要分析出 multiQuery 再调用 coreQuery
 * 可参考 test/queryAll.test.js 中的 "query all multi [JSON]"
 */
module.exports = function getMultiQuery(attrArray) {
    var multiQuery = []
    var separateIndex = 0
    attrArray.forEach(function (item, index) {
        if (/\[.*?\]/.test(item)) {
            multiQuery.push(attrArray.slice(separateIndex, index+1))
            separateIndex = index + 1
        }
    })
    if (multiQuery.length === 0) {
        multiQuery = [extend.clone(attrArray)]
    }
    else if (separateIndex < attrArray.length){
        multiQuery.push([attrArray[attrArray.length - 1]])
    }
    return multiQuery
}
