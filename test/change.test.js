import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('change', () => {
    it('object', () => {
        let data = {
            user: {

            }
        }
        expect(
            JSON.stringify(
                jsonModif.change('user', {
                    tag: 'man',
                    name: 'nimo'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {
                    user: {
                        tag: 'man',
                        name: 'nimo'
                    }
                }
            )
        )
    })
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
                jsonModif.change('class.user', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"name":"nimo","tag":"man"}}}
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
                jsonModif.change('list[{name:"nimo"}]', function (data, index) {
                    return {
                        age: data.age  + '-' + index
                    }
                }, data)
            )
        ).to.eql(
            JSON.stringify(
                {
                    "list":[
                        {"name":"nimo","age":"12-0"},
                        {"name":"nico"},
                        {"name":"nimo","age":"23-2"}
                    ]
                }
            )
        )
    })
    it('object[JSON]', () => {
        let data = {
            list: [
                {
                    name: 'nimo',
                    age: 1
                },
                {
                    name: 'nico',
                    age: 2
                },
                {
                    name: 'nimo',
                    age: 3
                }
            ]
        }
        expect(
            JSON.stringify(
                jsonModif.change('list[{name: "nimo"}]', {demo: '1'}, data)
            )
        ).to.eql(
            '{"list":[{"name":"nimo","age":1,"demo":"1"},{"name":"nico","age":2},{"name":"nimo","age":3,"demo":"1"}]}'
        )
        expect(
            JSON.stringify(
                jsonModif.change('list[{name: "nimo"}]', {demo: '1'}, data, {all: false})
            )
        ).to.eql(
            '{"list":[{"name":"nimo","age":1,"demo":"1"},{"name":"nico","age":2},{"name":"nimo","age":3}]}'
        )
    })
    it('object.array[0]', () => {
        let data = {
            class: {
                user: {
                    name: 'nimo',
                    list: [
                        {
                            a:'1'
                        }
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.change('class.user.list[0]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            '{"class":{"user":{"name":"nimo","list":[{"a":"1","tag":"man"}]}}}'
        )
    })
    it('object.array[id].object', () => {
        let data = {
            class: {
                user: {
                    name: 'nimo',
                    list: [
                        'anc',
                        {
                            id: 'dwgvwgvwef',
                            a:'1'
                        }
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.change('class.user.list[{id: "dwgvwgvwef"}]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            '{"class":{"user":{"name":"nimo","list":["anc",{"id":"dwgvwgvwef","a":"1","tag":"man"}]}}}'
        )
    })
    it('object.array[id].object.array[0]', () => {
        let data = {
            class: {
                user: {
                    name: 'nimo',
                    list: [
                        'anc',
                        {
                            id: 'dwgvwgvwef',
                            a:'1',
                            list: [
                                {
                                    id: 'asdasd'
                                }
                            ]
                        }
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.change('class.user.list[{id: "dwgvwgvwef"}].list[0]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            '{"class":{"user":{"name":"nimo","list":["anc",{"id":"dwgvwgvwef","a":"1","list":[{"id":"asdasd","tag":"man"}]}]}}}'
        )
    })
    it('object.array[id].object.array[id]', () => {
        let data = {
            class: {
                user: {
                    name: 'nimo',
                    list: [
                        'anc',
                        {
                            id: 'dwgvwgvwef',
                            a:'1',
                            list: [
                                {
                                    id: 'asdasd'
                                }
                            ]
                        }
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.change('class.user.list[{id: "dwgvwgvwef"}].list[{id: "asdasd"}]', {
                    tag: 'man'
                }, data)
            )
        ).to.eql(
            '{"class":{"user":{"name":"nimo","list":["anc",{"id":"dwgvwgvwef","a":"1","list":[{"id":"asdasd","tag":"man"}]}]}}}'
        )
    })
})
