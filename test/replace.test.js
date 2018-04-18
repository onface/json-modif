import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('replace', () => {
    it('object', () => {
        let data = {
            class: {
                user: {
                    name: 'nimo'
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.replace('class.user', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"tag":"man"}}}
            )
        )
    })
    it('object.array[0]', () => {
        let data = {
            class: {
                user: {
                    name: 'nimo',
                    list: [
                        {
                            demo: 'a'
                        }
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.replace('class.user.list[0]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"name":"nimo","list":[{"tag":"man"}]}}}
            )
        )
    })
    it('object.array[{id}]', () => {
        let data = {
            list: [
                {
                    id: 'a',
                    some: 'abc'
                },
                {
                    id: 'asdasd',
                    some: 'wrgvwef'
                }
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.replace('list[{id:"a"}]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"tag":"man"},{"id":"asdasd","some":"wrgvwef"}]}
            )
        )
    })
    it('function', () => {
        let data = {
            list: [
                {name:'nimo', age:12},
                {name:'nico'},
                {name:'nimo',age:23}
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.replace('list[{name:"nimo"}]', function (data, index) {
                    return {
                        age: data.age  + '-' + index
                    }
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {
                    "list":[
                        {"age":"12-0"},
                        {"name":"nico"},
                        {"age":"23-2"}
                    ]
                }
            )
        )
    })
    it('object.array[{id}] all', () => {
        let data = {
            list: [
                {
                    id: 'a',
                    some: 'abc'
                },
                {
                    id: 'asdasd',
                    some: 'wrgvwef'
                },
                {
                    id: 'a',
                    some: 'abc'
                },
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.replace('list[{id:"a"}]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"tag":"man"},{"id":"asdasd","some":"wrgvwef"}, {"tag":"man"}]}
            )
        )
        expect(
            JSON.stringify(
                jsonModif.replace('list[{id:"a"}]', {
                    tag: 'man'
                }, data, {all: false})
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"tag":"man"},{"id":"asdasd","some":"wrgvwef"}, {
                    id: 'a',
                    some: 'abc'
                }]}
            )
        )
    })
    it('query&replace object.array[{id}]', () => {
        let data = {
            list: [
                {
                    id: 'a',
                    some: 'abc'
                },
                {
                    id: 'asdasd',
                    some: 'wrgvwef'
                }
            ]
        }
        let query = 'list[{id:"a"}]'
        let target = jsonModif.query(query, data)
        target.demo = 'abc'
        expect(
            JSON.stringify(
                jsonModif.replace(query, target, data)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"id":"a","some":"abc","demo":"abc"},{"id":"asdasd","some":"wrgvwef"}]}
            )
        )
    })
})
