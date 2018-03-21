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
                jsonModif.replace('class.user', data, {
                    tag: 'man'
                })
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
                jsonModif.replace('class.user.list[0]', data, {
                    tag: 'man'
                })
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
                jsonModif.replace('list[{id:"a"}]', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"tag":"man"},{"id":"asdasd","some":"wrgvwef"}]}
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
                jsonModif.replace(query, data, target)
            )
        ).to.eql(
            JSON.stringify(
                {"list":[{"id":"a","some":"abc","demo":"abc"},{"id":"asdasd","some":"wrgvwef"}]}
            )
        )
    })
})
