

window.onload = async () => {
    const response = await fetch('/leaderboard/getLeaderboard')
    const responseJSON = await response.json()
    console.log(JSON.parse(responseJSON.data))
}