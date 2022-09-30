//Task for AIDAN: Research authentication

const api = {
    'GET': [
        {
            '/': 'home.html',
            desc: 'serves home page to user, this page will have login/signup buttons'
        },
        {
            '/signup': 'signup.html',
            desc: 'serves signup page'
        },
        {
            '/signin': 'signin.html',
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
            '/updateLeaderboard': { req: { username: username, authentication: authentication, score: score } },
            desc: 'Finds username, finds max score of that user, if this is higher, set user max score and replace users high score with this high score, resort list and send to mongo'
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