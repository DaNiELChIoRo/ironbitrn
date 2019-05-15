const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.json())
const ACCESS_TOKEN = 'f70f3e7bc1e89d80041e2022f26dd56c8b05f228'

app.post('/token', (req, res) => {
	if (!req.body.username) { return res.status(422).json({ error: 'Missing username param'}) }
	if (!req.body.password) { return res.status(422).json({ error: 'Missing password param'}) }

	if (req.body.username !== 'galactus') { return res.status(403).json({ error: 'Invalid username or password'}) }
	if (req.body.password !== 'marvel') { return res.status(403).json({ error: 'Invalid username or password'}) }

	res.json({
		accessToken: ACCESS_TOKEN,
		type: 'Bearer'
	})
})

app.listen('3000', () => {
	console.log('server running')
})
