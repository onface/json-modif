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
})
