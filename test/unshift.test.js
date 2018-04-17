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
        expect(
            JSON.stringify(
                jsonModif.unshift('class.user.list', data, {
                    tag: 'man'
                })
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
                jsonModif.unshift('list[{name:"nimo"}].arr', data, 'a')
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"name":"nimo","arr":["a",1]},{"name":"nimo","arr":["a",1,2]},{"name":"jack"},{"name":"nimo","arr":["a",1,2,3]},{"name":"tim"}]}
            )
        )
        expect(
            JSON.stringify(
                jsonModif.unshift('list[{name:"nimo"}].arr', data, 'a', {all: false})
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
                jsonModif.unshift('class.user.list[0]', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[[{"tag":"man"}, "a"]]}}}
            )
        )
    })
})
