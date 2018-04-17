import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('push', () => {
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
                jsonModif.push('class.user.list', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":["a",{"tag":"man"}]}}}
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
                jsonModif.push('list[{name:"nimo"}].arr', 'a', data)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"name":"nimo","arr":[1,"a"]},{"name":"nimo","arr":[1,2,"a"]},{"name":"jack"},{"name":"nimo","arr":[1,2,3,"a"]},{"name":"tim"}]}
            )
        )
        expect(
            JSON.stringify(
                jsonModif.push('list[{name:"nimo"}].arr', 'a', data, {all: false})
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"name":"nimo","arr":[1,"a"]},{"name":"nimo","arr":[1,2]},{"name":"jack"},{"name":"nimo","arr":[1,2,3]},{"name":"tim"}]}
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
                jsonModif.push('class.user.list[0]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[["a",{"tag":"man"}]]}}}
            )
        )
    })
})
