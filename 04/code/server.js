const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.json())
const ACCESS_TOKEN = '4a2fd3e5bce43395c5bf3b8180836f05'

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
