import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('unshift', () => {
    it('array', () => {
        let data = {
            class: {
                user: {
                    list: [
                        'a'
                    ]
                }
            }
        }

        jsonModif.unshift('class.user.list', {
            tag: 'man'
        }, data)

        expect(
            JSON.stringify(
                jsonModif.unshift('class.user.list', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[{"tag":"man"}, "a"]}}}
            )
        )
    })
    it('object[JSON]', () => {
        let data = {
            list: [
                {
                    name: 'nimo',
                    arr:[1]
                },
                {
                    name: 'nimo',
                    arr:[1,2]
                },
                {
                    name: 'jack'
                },
                {
                    name: 'nimo',
                    arr:[1,2,3]
                },
                {
                    name: 'tim'
                }
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.unshift('list[{name:"nimo"}].arr', 'a', data)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"name":"nimo","arr":["a",1]},{"name":"nimo","arr":["a",1,2]},{"name":"jack"},{"name":"nimo","arr":["a",1,2,3]},{"name":"tim"}]}
            )
        )
        expect(
            JSON.stringify(
                jsonModif.unshift('list[{name:"nimo"}].arr', 'a', data, {all: false} )
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"name":"nimo","arr":["a",1]},{"name":"nimo","arr":[1,2]},{"name":"jack"},{"name":"nimo","arr":[1,2,3]},{"name":"tim"}]}
            )
        )
    })
    it('array[0]', () => {
        let data = {
            class: {
                user: {
                    list: [
                        [
                            'a'
                        ]
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.unshift('class.user.list[0]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[[{"tag":"man"}, "a"]]}}}
            )
        )
    })
    it('object[JSON] function', () => {
        let data = {
            list: [
                {
                    name: 'nimo',
                    arr:[1]
                },
                {
                    name: 'nimo',
                    arr:[1,2]
                },
                {
                    name: 'jack'
                },
                {
                    name: 'nimo',
                    arr:[1,2,3]
                },
                {
                    name: 'tim'
                }
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.unshift('list[{name:"nimo"}].arr', function (value, index) {
                    return value.length
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"name":"nimo","arr":[1,1]},{"name":"nimo","arr":[2,1,2]},{"name":"jack"},{"name":"nimo","arr":[3,1,2,3]},{"name":"tim"}]}
            )
        )
    })
})
