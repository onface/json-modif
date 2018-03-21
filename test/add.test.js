import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "extend"
describe('add', () => {
    it('object.array', () => {
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
        // expect(
        //     JSON.stringify(
        //         jsonModif.add('class.user.list', data, {
        //             b: 'c'
        //         })
        //     )
        // ).to.eql(
        //
        // )
    })
})
