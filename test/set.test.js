import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "safe-extend"
describe('set', () => {
    it('string', () => {
        let data = {
            one: 'abc'
        }
        expect(
            JSON.stringify(
                jsonModif.set('one', data, '123')
            )
        ).to.eql(
            JSON.stringify(
                {one: '123'}
            )
        )
    })
    it('object', () => {
        let data = {
            one: {
                name: 'nimo'
            }
        }
        expect(
            JSON.stringify(
                jsonModif.set('one', data, {a:1})
            )
        ).to.eql(
            JSON.stringify(
                {one: {name: 'nimo', a:1}}
            )
        )
    })

})
