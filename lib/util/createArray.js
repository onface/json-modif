/**
 * Create array
 * @param {array} position - 数组索引
 * @param {array} value
 * @example
 * createArray(['1', '1'], 'abc')
 * // [undefined,[,undefined, 1]]
 */
module.exports = function createArray (position, value) {
    let data = []
    position.reverse().forEach(function (targetIndex, index) {
        let array = new Array()
        let target
        if (index === 0) {
            target = value
        }
        else {
            target = data[data.length-1]
        }
        array[targetIndex] = target
        data.push(array)
    })
    return data[data.length-1]
}
