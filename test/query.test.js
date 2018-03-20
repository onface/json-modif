import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "extend"
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
                            name: 'Jack'
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
    it('object', () => {
        expect(
            jsonModif.query('class.user.title', data)
        ).to.eql(
            'nimo'
        )
    })
    it('object.array.object', () => {
        expect(
            jsonModif.query('class.queue[1].title', data)
        ).to.eql(
            'nico'
        )
        expect(
            jsonModif.query('class.queue[2][0].title', data)
        ).to.eql(
            'sam'
        )
    })
    it('object.array[query].object', () => {
        expect(
            jsonModif.query('class.list[{id:"bh4ebrbvdsdqw"}].name', data)
        ).to.eql(
            'nimo'
        )
    })
    it('object.array[query].object.array[query].object', () => {
        expect(
            jsonModif.query('class.list[{id:"egu8y23hgf3wef"}].data.array[{id:"ashfuewgfwef"}].name', data)
        ).to.eql(
            'Jack'
        )
        expect(
            jsonModif.query('class.list[{name:"nimo", age: 24}].id', data)
        ).to.eql(
            'bh4ebrbvdsdqw'
        )
    })


})
