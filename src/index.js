const express = require('express')
const app = express()
const port = 8080

const converter = require('./converter')

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.get('/fromRoman/:numeral', (req, res) => {
    const numeral = req.params.numeral;

    try {
        res.send(converter.fromRoman(numeral).toString())
    } catch(error) {
        res.status(422).send(error.message)
    }
})

app.get('/romanMap', (req, res) => {
    let roman_map = {}
    for(let i = 1; i < 4000; i++){
        roman_map[converter.toRoman(i)] = i;
    }
    return res.json(roman_map)
})

app.get('/toRoman/:integer', (req, res) => {
    const integer = req.params.integer;

    try {
        res.send(converter.toRoman(Number(integer)).toString())
    } catch(error) {
        res.status(422).send(error.message)
    }
})

module.exports = app.listen(port, () => {
    console.log(`[nodemon] App running on port ${port}`)
})
