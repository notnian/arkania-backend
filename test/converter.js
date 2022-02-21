let chai = require("chai")
let chaiHttp = require("chai-http")
let app

// Select random entries to test (change entries from 1 to 3999)
const entries = 10
const fullTable = require("./fullRomanTable")
const shuffled = Object.entries(fullTable).sort(() => 0.5 - Math.random())
const data = shuffled.slice(0, entries)

// Assertion style
chai.should()
chai.use(chaiHttp)

before(async() => {
	app = await require("../src/index")
})

// To test my API quickly
describe("GET /ping", () => {
	it("should return pong", (done) => {
		chai.request(app)
			.get("/ping")
			.end((error, response) => {
				response.should.have.status(200)
				response.text.should.be.eq("pong")
				done(error)
			})
	})
})

describe("Roman numerals convert API", () => { 
	describe("GET /fromRoman", () => {
		data.forEach(([roman, integer]) => {
			it(`should return right integer (${integer}) from roman numeral ${roman}`, (done) => {
				chai.request(app)
					.get(`/fromRoman/${roman}`)
					.end((error, response) => {
						response.should.have.status(200)
						response.text.should.be.eq(integer.toString())
						done(error)
					})
			})
		})
	})

	describe("GET /toRoman", () => {
		data.forEach(([roman, integer]) => {
			it(`should return right roman numeral (${roman}) from integer ${integer}`, (done) => {
				chai.request(app)
					.get(`/toRoman/${integer}`)
					.end((error, response) => {
						response.should.have.status(200)
						response.text.should.be.eq(roman)
						done(error)
					})
			})
		})
	})

	describe("GET /fromRoman must fail", () => {
		const bad_roman_data = [
			"abcdef",
			0,
			"XS",
			"CCCCCCCC",
			"MMMCMXCIXI",
			"04398",
			true,
			false,
			{value: "XI"},
		]
    
		bad_roman_data.forEach((entry) => {
			it(`should return an error for bad parameter (${entry})`, (done) => {
				chai.request(app)
					.get(`/fromRoman/${entry}`)
					.end((error, response) => {
						response.should.have.status(422)
						response.text.should.be.eq("Requires valid roman numeral string")
						done(error)
					})
			})
		})
	})

	describe("GET /toRoman must fail", () => {
		const bad_integer_data = [
			"abcdef",
			0,
			"CC",
			true,
			false,
			4000,
			"0",
			{value: 12},
			[42, 34]
		]

		bad_integer_data.forEach((entry) => {
			it(`should return an error for bad parameter (${entry})`, (done) => {
				chai.request(app)
					.get(`/toRoman/${entry}`)
					.end((error, response) => {
						response.should.have.status(422)
						response.text.should.be.eq("Requires an unsigned integer with a max value less than 4000")
						done(error)
					})
			})
		})
	})
})
