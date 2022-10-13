const express = require('express')
const leaderboardRouter = express.Router()

require('dotenv').config()
leaderboardRouter.use(express.json())


//mongoDB Leaderboard model
const User = require('./../models/User')

leaderboardRouter.get('/getLeaderboard', (req, res) => {

    User.find()
        .then(data => {
            if (data.length) {
                let arr = []
                for (const key in data) {
                    let s = {
                        'username': data[key].username,
                        'highscore': data[key].highscore
                    }

                    arr.push(s)
                }
                res.json({
                    status: "SUCCESS",
                    message: "got leaderboard list",
                    data: JSON.stringify(arr)
                })
            } else {
                res.json({
                    status: "FAILED",
                    message: "No data found",
                    data: JSON.stringify([])
                })
            }

        })
        .catch(e => {
            res.json({
                status: "FAILED",
                message: e.toString()
            })
        })
})

leaderboardRouter.post('/submitScore', (req, res) => { //add auth eventually
    const { username, score } = req.body

    User.findOne({ 'username': username }, (err, foundObject) => {
        if (err) {
            console.error(err)
            res.json({
                status: "FAILED",
                message: "Error finding user"
            })
        } else {
            if (!foundObject) {
                res.json({
                    status: "FAILED",
                    message: "User not found"
                })
            } else {
                if (req.body.username) {
                    let highscore = JSON.parse(foundObject.highscore)
                    if (score > highscore) {
                        foundObject.highscore = score;
                        foundObject.save((err, updatedObject) => {
                            if (err) {
                                res.json({
                                    status: "FAILED",
                                    message: "Error=1"
                                })
                            } else {
                                res.json({
                                    status: "SUCCESS",
                                    message: "Edited highscore",
                                    updatedObject: { username: updatedObject.username, highscore: updatedObject.highscore }
                                })
                            }
                        })
                    } else {
                        res.json({
                            status: "FAILED",
                            message: `Your previous score of ${highscore} was better`
                        })
                    }


                } else {
                    res.json({
                        status: "FAILED",
                        message: "Error=2"
                    })
                }
            }
        }
    })
})

module.exports = leaderboardRouter