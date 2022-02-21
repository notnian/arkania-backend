const { expect } = require("chai")
let chai = require("chai")
let chaiHttp = require("chai-http")
let app

// Assertion style
chai.should()
chai.use(chaiHttp)

before(async() => {
	app = await require("../src/index")
})

describe("Website archives API", () => {
	let savedTimestamp
	describe("GET /archive/:url", () => {
		it("should todo", (done) => {
			const timestamp = parseInt((new Date().getTime() / 1000).toFixed(0))
			chai.request(app)
				.get("/archive/http%3A%2F%2Fvitalik.ca")
				.end((error, response) => {
					response.should.have.status(200)
					response.should.greaterThanOrEqual
					expect(Number(response.text)).to.be.greaterThanOrEqual(timestamp)
					savedTimestamp = response.text
					done(error)
				})
		})
	})

	describe("GET /view/:timestamp/:url", () => {
		it("should todo", (done) => {
			chai.request(app)
				.get(`/view/${savedTimestamp}/http%3A%2F%2Fvitalik.ca`)
				.end((error, response) => {
					response.should.have.status(200)
					response.text.should.contain("Endgame")
					response.text.should.contain("On Collusion")
					response.text.should.contain("Quadratic Arithmetic Programs: from Zero to Hero")
					response.text.should.not.contain("<script")
					done(error)
				})
		})
	})
})
