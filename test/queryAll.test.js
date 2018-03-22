import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
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
})
