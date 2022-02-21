const createDOMPurify = require("dompurify")
const { JSDOM } = require("jsdom")


const axios = require("axios")
const Page = require("../models/page")

// REGEX from https://stackoverflow.com/a/15855457
const isValidHttpUrl = function(value) {
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
}

const getTimestamp = function() {
	return parseInt((new Date().getTime() / 1000).toFixed(0))
}

const saveWebsite = function({url}) {
	return new Promise(async (resolve, reject) => {
	    try {
			if(!isValidHttpUrl(url)){
				throw new Error("Invalid url")
			}

			// Send request to get html page
			let response = await axios.get(url)

			const window = new JSDOM("").window
			const DOMPurify = createDOMPurify(window)

			// Create model
			const page = new Page({
				timestamp: getTimestamp(),
				url,
				body: DOMPurify.sanitize(response.data, {USE_PROFILES: {html: true}})
			})

			// Save it to mongodb
			resolve(await page.save())
		} catch(error) {
			reject(error)
		}
	}) 
}

const getWebsite = async function({timestamp, url}) {
	return new Promise(async (resolve, reject) => {
		try {
			if(!isValidHttpUrl(url)){
				throw new Error("Invalid url")
			}

			if(!((new Date(Number(timestamp))).getTime() > 0)){
				throw new Error("Invalid timestamp")
			}

			// Get it from mongodb
			const page = await Page.findOne({ "timestamp": timestamp, "url":url })

			if(page === null) {
				throw new Error("Website save not found for " + JSON.stringify({ timestamp, url }))
			}

			resolve(page)
		} catch(error) {
			reject(error)
		}
	}) 
}

module.exports = {
	isValidHttpUrl,
	saveWebsite,
	getWebsite
}