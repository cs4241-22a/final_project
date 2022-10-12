const express = require('express')
const authRouter = express.Router()
// INIT
require('dotenv').config()
authRouter.use(express.json())
// authorization
const jwt = require('jsonwebtoken')
const auth = require('../middleware/Authorization')


// Ideally stored in a database
let refreshTokens = []

authRouter.get('/game/:authToken', auth, (req, res, next) => {
    if (req.user) {
        res.redirect('/game')
        next()
    } else {
        res.redirect('/login')
    }
})

authRouter.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

authRouter.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) { return res.status.sendStatus(401) }
    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})
authRouter.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

module.exports = authRouter; 