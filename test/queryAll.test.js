import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
var flatten = require('array-flatten')
var data = {
    class: {
        user: {
            title: 'nimo'
        },
        queue: [
            {
                title: 'tim'
            },
            {
                title: 'nico'
            },
            [
                {
                    title: 'sam'
                }
            ]
        ],
        list: [
            {
                id: 'egu8y23hgf3wef',
                name: 'abc',
                data: {
                    array: [
                        {
                            id: 'ashfuewgfwef',
                            name: 'Jack1',
                            age: 1
                        }
                    ]
                }
            },
            {
                id: 'werg3rbherbhre',
                name: 'abc',
                data: {
                    array: [
                        {
                            id: 'evgwegeg',
                            name: 'Jack2'
                        },
                        {
                            id: 'egvwegvwegewg',
                            name: 'Jack3',
                            age: 1
                        }
                    ]
                }
            },
            {
                id: 'bh4ebrbvdsdqw',
                name: 'nimo',
                age: 24
            },
            {
                id: 'b4wg4w3g3g434g',
                name: 'nimo'
            },
            {
                id: 'nrtbhergrgr',
                name: 'tim'
            }
        ]
    }
}
describe('query', () => {
    it('query all', () => {
        expect(
            JSON.stringify(
                jsonModif.queryAll('class.list[{name:"nimo"}]', data)
            )
        ).to.eql(
            JSON.stringify(
                [{"id":"bh4ebrbvdsdqw","name":"nimo","age":24},{"id":"b4wg4w3g3g434g","name":"nimo"}]
            )
        )
    })
    it('query all complete', () => {
        expect(
            JSON.stringify(
                jsonModif.queryAll('class.list[{name:"nimo"}]', data, {
                    complete: true
                })
            )
        ).to.eql(
            JSON.stringify(
                [
                    {
                        location: [
                            "class",
                            "list[2]"
                        ],
                        value: {
                            "id": "bh4ebrbvdsdqw",
                            "name": "nimo",
                            "age": 24
                        }
                    },
                    {
                        location: [
                            "class",
                            "list[3]"
                        ],
                        value: {
                            "id": "b4wg4w3g3g434g",
                            "name": "nimo"
                        }
                    }
                ]
            )
        )
    })
    // it('query all empy', () => {
    //
    // })
    it('query all multi [JSON]', () => {
        var data = {
            list: [
                {
                    type: 'read',
                    comment: [
                        {
                            name: 'anonymity',
                            skills: [
                                {
                                    id: '1-1-1',
                                    html: true,
                                    css: false
                                },
                                {
                                    id: '1-1-2',
                                    html: false,
                                    css: true
                                },
                                {
                                    id: '1-1-3',
                                    html: true,
                                    css: false
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'unread'
                },
                {
                    type: 'read'
                },
                {
                    type: 'read',
                    comment: [
                        {
                            name: 'anonymity',
                            skills: [
                                {

                                },
                                {
                                    id: '3-1-1',
                                    html: false,
                                    css: false
                                },
                                {
                                    id: '3-1-2',
                                    html: true,
                                    css: true
                                },
                                {
                                    id: '3-1-3',
                                    html: false,
                                    css: false
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
})
