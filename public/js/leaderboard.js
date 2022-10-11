

window.onload = async () => {
    const response = await fetch('/leaderboard/getLeaderboard')
    const responseJSON = await response.json()
    console.log(JSON.parse(responseJSON.data))

    let playersData = JSON.parse(responseJSON.data);

    let table = document.getElementById("scoretable");

    for(let i=0; i< playersData.length; i++) {
        
        let eachPlayer = playersData[i];
        let row = table.insertRow(i+1);

        let nameCell = row.insertCell(0);
        let scoreCell = row.insertCell(1);

        nameCell.innerHTML  = eachPlayer.username;
        scoreCell.innerHTML = eachPlayer.highscore;

    }
}