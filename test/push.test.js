import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "extend"
describe('push', () => {
    it('array', () => {
        let data = {
            class: {
                user: {
                    list: [
                        'a'
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.push('class.user.list', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":["a",{"tag":"man"}]}}}
            )
        )
    })
    it('array[0]', () => {
        let data = {
            class: {
                user: {
                    list: [
                        [
                            'a'
                        ]
                    ]
                }
            }
        }
        expect(
            JSON.stringify(
                jsonModif.push('class.user.list[0]', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[["a",{"tag":"man"}]]}}}
            )
        )
    })
})
