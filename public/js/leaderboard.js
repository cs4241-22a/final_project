

window.onload = async () => {
    const response = await fetch('/leaderboard/getLeaderboard')
    const responseJSON = await response.json()
    console.log(JSON.parse(responseJSON.data))

    let playersData = JSON.parse(responseJSON.data);

    let table = document.getElementById("scoretable");

    playersData.sort((a,b) => a.highscore < b.highscore  ? 1 : -1 );

    for(let i=0; i< playersData.length; i++) {
        
        let eachPlayer = playersData[i];
        let row = table.insertRow(i+1);

        let rankCell = row.insertCell(0);
        let nameCell = row.insertCell(1);
        let scoreCell = row.insertCell(2);

        rankCell.innerHTML =  i+1;
        nameCell.innerHTML  = eachPlayer.username;
        scoreCell.innerHTML = eachPlayer.highscore;

    }
}