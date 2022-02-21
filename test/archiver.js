let chai = require("chai")
let chaiHttp = require("chai-http")
let app;

// Assertion style
chai.should()
chai.use(chaiHttp)

before(async() => {
    app = await require('../src/index')
})


describe('Website archives API', () => { 
    describe("GET /archive/:url", () => {
        it(`should todo`, (done) => {
            chai.request(app)
                .get(`/archive/:url`)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.text.should.be.eq("TODO")
                    done(error)
                })
        })
    })

    describe("GET /view/:timestamp/:url", () => {
        it(`should todo`, (done) => {
            chai.request(app)
                .get(`/view/:timestamp/:url`)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.text.should.be.eq("TODO")
                    done(error)
                })
        })
    })
})
