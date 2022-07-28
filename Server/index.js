require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const { SERVER_PORT } = process.env

const { seed, getLeaderboard, postLeaderboard } = require('./controller.js')

// Endpoints
app.post('/seed', seed)

app.get('/leaderboard', getLeaderboard)
app.post('/leaderboard', postLeaderboard)

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))