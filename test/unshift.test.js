import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('unshift', () => {
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
                jsonModif.unshift('class.user.list', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[{"tag":"man"}, "a"]}}}
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
                jsonModif.unshift('class.user.list[0]', data, {
                    tag: 'man'
                })
            )
        ).to.eql(
            JSON.stringify(
                {"class":{"user":{"list":[[{"tag":"man"}, "a"]]}}}
            )
        )
    })
})
