import { expect } from 'chai';
import jsonModif from "../lib/index"
describe('delete', () => {
    it('object', () => {
        var data = {
            user: 'nimo',
            age: 24
        }
        expect(
            jsonModif.del('user', data)
        ).to.eql(
            {
                age: 24
            }
        )
        expect(
            JSON.stringify(
                jsonModif.del('user.name', {user:{name:'nimo',age: 23}, title: 'some'})
            )
        ).to.eql(
            JSON.stringify(
                {
                    user: {age: 23},
                    title: 'some'
                }
            )
        )
    })
    it('array', () => {
        expect(
            JSON.stringify(
                jsonModif.delete(
                    'list',
                    {
                        list: [
                            1,2
                        ],
                        age: 1
                    }
                )
            )
        ).to.eql(
            '{"age":1}'
        )

        expect(
            JSON.stringify(
                jsonModif.delete(
                    'list[2]',
                    {
                        list: [
                            1,2,3,4
                        ]
                    }
                )
            )
        ).to.eql(
            JSON.stringify(
                {
                    list: [
                        1,2,4
                    ]
                }
            )
        )
        expect(
            JSON.stringify(
                jsonModif.delete(
                    'list[1][3]',
                    {
                        list: [
                            1,
                            [
                                1,2,3,4
                            ],
                            2
                        ]
                    }
                )
            )
        ).to.eql(
            JSON.stringify(
                {"list":[1,[1,2,3],2]}
            )
        )
        expect(
            JSON.stringify(
                jsonModif.delete(
                    'list[1][3][1]',
                    {
                        list: [
                            1,
                            [
                                1,2,3,[1,2,3]
                            ],
                            2
                        ]
                    }
                )
            )
        ).to.eql(
            JSON.stringify(
                {"list":[1,[1,2,3,[1,3]],2]}
            )
        )
    })
    it('list[JSON]', function (){
        expect(
            JSON.stringify(jsonModif.delete(
                'list[{name: "game"}]',
                {
                    list: [
                        {
                            name: 'game'
                        },
                        {
                            name: 'name'
                        },
                        {
                            name: 'game'
                        }
                    ]
                }
            ))
        ).to.eql(
            JSON.stringify(
                {
                    list: [
                        {
                            name: 'name'
                        }
                    ]
                }
            )
        )
    })
})
