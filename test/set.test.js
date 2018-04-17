import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('set', () => {
    it('string', () => {
        let data = {
            one: 'abc'
        }
        expect(
            JSON.stringify(
                jsonModif.set('one', '123', data)
            )
        ).to.eql(
            JSON.stringify(
                {one: '123'}
            )
        )
    })
    it('object', () => {
        let data = {
            one: {
                name: 'nimo'
            }
        }
        expect(
            JSON.stringify(
                jsonModif.set('one', {a:1}, data)
            )
        ).to.eql(
            JSON.stringify(
                {one: {name: 'nimo', a:1}}
            )
        )
    })
    it('object.array', () => {
        let data = {
            one: {
                some: [1,2,3,4]
            }
        }
        expect(
            JSON.stringify(
                jsonModif.set('one.some[1]', 'a', data)
            )
        ).to.eql(
            JSON.stringify(
                {
                    one: {
                        some: [1,'a',3,4]
                    }
                }
            )
        )
        expect(
            JSON.stringify(
                jsonModif.set('one.some[1]', {a:1}, data)
            )
        ).to.eql(
            JSON.stringify(
                {
                    one: {
                        some: [1,{a:1},3,4]
                    }
                }
            )
        )
    })
    it('object.array[JSON]', () => {
        let data = {
            list: [
                {
                    name: 'nimo',
                    age: '12'
                },
                {
                    name: 'nico',
                    age: '23'
                }
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.set('list[{name: "nimo"}]', {a:1}, data))
        ).to.eql(
            JSON.stringify(
                {
                    "list": [
                        {"name":"nimo","age":"12","a":1},
                        {"name":"nico","age":"23"}
                    ]
                }
            )
        )
    })
    it('object.array[JSON] all', () => {
        let data = {
            list: [
                {
                    name: 'nimo',
                    age: '12'
                },
                {
                    name: 'nico',
                    age: '23'
                },
                {
                    name: 'nimo',
                    age: '12'
                }
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.set('list[{name: "nimo"}]', {a:1}, data))
        ).to.eql(
            JSON.stringify(
                {
                    "list": [
                        {"name":"nimo","age":"12","a":1},
                        {"name":"nico","age":"23"},
                        {"name":"nimo","age":"12","a":1}
                    ]
                }
            )
        )
        expect(
            JSON.stringify(
                jsonModif.set('list[{name: "nimo"}]', {a:1}, data, {all:false}))
        ).to.eql(
            JSON.stringify(
                {
                    "list": [
                        {"name":"nimo","age":"12","a":1},
                        {"name":"nico","age":"23"},
                        {"name":"nimo","age":"12"}
                    ]
                }
            )
        )
    })

})
