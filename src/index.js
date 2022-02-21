const run = async () => {
    // Load env file
    require('dotenv').config()

    const app = require('express')()
    const port = process.env.PORT || process.env.EXPRESS_PORT

    const mongoose = require('mongoose')

    const mongodbUser = process.env.MONGODB_USER
    const mongodbPassword = process.env.MONGODB_PASSWORD
    const mongodbURL = `mongodb+srv://${mongodbUser}:${mongodbPassword}@clusterarkania.a11rw.mongodb.net/arkania?retryWrites=true&w=majority`

    const converter = require('./converter')

    const archiver = require('./archiver')

    // Function used for my tests
    app.get('/ping', (req, res) => {
        res.send('pong')
    })

    // Question 1: Convert roman numerals

    app.get('/fromRoman/:numeral', (req, res) => {
        const numeral = req.params.numeral;

        try {
            res.send(converter.fromRoman(numeral).toString())
        } catch(error) {
            res.status(422).send(error.message)
        }
    })

    app.get('/toRoman/:integer', (req, res) => {
        const integer = req.params.integer;

        try {
            res.send(converter.toRoman(Number(integer)).toString())
        } catch(error) {
            res.status(422).send(error.message)
        }
    })

    // Generate a complete map of 3999 Roman numerals
    app.get('/romanMap', (req, res) => {
        let roman_map = {}
        for(let i = 1; i < 4000; i++){
            roman_map[converter.toRoman(i)] = i;
        }
        return res.json(roman_map)
    })

    // Question 2: Archive a website

    app.get('/archive/:url', async (req, res) => {
        try {
            let page = await archiver.saveWebsite({url: req.params.url})
            res.send(page.timestamp.toString())
        } catch(error) {
            res.status(422).send(error.message)
        }
    })

    app.get('/view/:timestamp/:url', async (req, res) => {
        try {
            let page = await archiver.getWebsite({timestamp: req.params.timestamp, url: req.params.url})
            res.send(page.body)
        } catch(error) {
            res.status(422).send(error.message)
        }
    })

    const mongoosePromise = mongoose.connect(mongodbURL)
    const db = mongoose.connection
    await mongoosePromise

    db.once('open', () => {
      // Doesn't get here before the connection is established.
      console.log("Connected to mongo")
    });

    const server = app.listen(port, () => {
        console.log(`[nodemon] App running on port ${port}`)
    })
  
    return server;
  };
  
module.exports = run();