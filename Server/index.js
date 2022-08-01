require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/', express.static(path.join(__dirname, '../Public')))
app.use('/audio', express.static(path.join(__dirname, '../audio')))
app.use('/img', express.static(path.join(__dirname, '../img')))

const SERVER_PORT = process.env.PORT || 5500

const { seed, getLeaderboard, postLeaderboard } = require('./controller.js')

// Endpoints
app.post('/seed', seed)

app.get('/leaderboard', getLeaderboard)
app.post('/leaderboard', postLeaderboard)

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))