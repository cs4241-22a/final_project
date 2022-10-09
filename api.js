

const api = {
    'GET': [
        {
            '/': 'home.html',
            desc: 'serves home page to user, this page will have login/signup buttons'
        },
        {
            '/home': 'home.html',
            desc: 'serves home page to user, this page will have login/signup buttons'
        },
        {
            '/signup': 'signup.html',
            desc: 'serves signup page'
        },
        {
            '/login': 'signin.html',
            desc: 'serves signin page'
        },
        {
            '/leaderboard': 'leaderboard.html',
            desc: 'serves leaderboard page'
        },
        {
            '/profile/:user': 'profile.html',
            desc: 'shows user profile, username, high score, option to change password'
        },
        {
            '/game': 'game.html',
            desc: 'serves game page'
        },
        {
            '/getLeaderboard': { res: "array of scores" },
            desc: 'gets leaderboard info from mongoDB'
        }

    ],
    'POST': [
        {
            '/user/signin': {
                req: {
                    body: {
                        username: String,
                        password: String
                    }
                },
                res: {
                    status: "SUCCESS / FAILED",
                    message: String,
                    username: String, // on success
                    data: String, // on success
                    accessToken: String // on success
                }
            },
            desc: 'used for logging in, authenticates user and creates an auth token'
        },
        {
            '/user/signup': {
                req: {
                    body: {
                        username: String,
                        password: String,
                        userdata: String
                    }
                },
                res: {
                    body: {
                        status: "SUCCESS / FAILED",
                        message: String,
                        data: String // on success
                    }
                },
            },
            desc: 'used for logging in, authenticates user and creates an auth token'
        },
        {
            '/auth/login': {
                req: {
                    body: {
                        username: String
                    }
                },
                res: {
                    body: {
                        accessToken: String,
                        refreshToken: String
                    }
                }
            }
        },
        {
            '/auth/token': {
                req: {
                    body: {
                        token: String
                    }
                },
                res: {
                    body: {
                        accessToken: String
                    }
                }
            }
        }
    ],
    'DELETE': [
        {
            '/auth/logout': {
                req: {
                    body: {
                        token: String
                    }
                },
                res: {
                    status: "SUCCESS/FAILED"
                }
            }
        }
    ]
}

//MONGODB Models
const User = {
    username: String,
    password: String,
    highscore: int
}
const Leaderboard = {
    leaderboard: String, // where String is array [{username: String, score: Int}, {username: String, score: Int}]
}