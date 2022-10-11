// authorization
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.params.authToken
    const token = authHeader //&& authHeader.split(' ')[1]
    if (token == null) {
        console.log('token == null')
        return res.json({
            status: "FAILED",
            message: "accessToken == null"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.json({
                status: "FAILED",
                message: "Error verifying accessToken"
            })
        }
        req.user = user
        next()
    })
}

module.exports = auth