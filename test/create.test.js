import { expect } from 'chai';
import jsonModif from "../lib/index"
import extend from "extend"
describe('create', () => {
    it('object', () => {
        expect(
            jsonModif.create('class.user.title', 'nimo')
        ).to.eql(
            { class: { user: { title: 'nimo' } } }
        )
    })
    it('object.array.object', () => {
        expect(
            JSON.stringify(jsonModif.create('class.user[0].title', 'nimo'))
        ).to.eql(
            JSON.stringify(
                {"class":{"user":[{"title":"nimo"}]}}
            )
        )
        expect(
            JSON.stringify(jsonModif.create('class.user[1].title', 'nimo'))
        ).to.eql(
            JSON.stringify(
                {"class":{"user":[undefined, {"title":"nimo"}]}}
            )
        )
        expect(
            JSON.stringify(jsonModif.create('class.user[1][4].title', 'nimo'))
        ).to.eql(
            JSON.stringify(
                {"class":{"user":[undefined,[undefined,undefined,undefined,undefined,{"title":"nimo"}]]}}
            )
        )
    })
})
