import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('change', () => {
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
                jsonModif.change('class.user', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"name":"nimo","tag":"man"}}}
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
                            a:'1'
                        }
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.change('class.user.list[0]', data, {
                    tag: 'man'
                })
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
                jsonModif.change('class.user.list[{id: "dwgvwgvwef"}]', data, {
                    tag: 'man'
                })
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
                jsonModif.change('class.user.list[{id: "dwgvwgvwef"}].list[0]', data, {
                    tag: 'man'
                })
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
                jsonModif.change('class.user.list[{id: "dwgvwgvwef"}].list[{id: "asdasd"}]', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            '{"class":{"user":{"name":"nimo","list":["anc",{"id":"dwgvwgvwef","a":"1","list":[{"id":"asdasd","tag":"man"}]}]}}}'
        )
    })
})
