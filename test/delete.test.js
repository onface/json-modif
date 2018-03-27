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

        )
    })
})
