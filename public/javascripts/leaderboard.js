window.onload = function() {
    const cpsBtn = document.getElementById("cpsBoardBtn");
    const reactionBtn = document.getElementById("reactionBoardBtn");
    const accuracyBtn = document.getElementById("accuracyBoardBtn");
    const table = document.getElementById("leaderboard-table");

    cpsBtn.addEventListener('click', function () {
        fetch('/cpsScores',{
            method: 'GET'
          })
          .then( function (response ) {
            return response.json();
          })
          .then( function (response){
            while(table.rows.length !== 0)
            {
                table.deleteRow(0);
            }
            
            var row = table.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Username";
            userCell.style = "padding-left: 30px;padding-right: 40px;font-weight: bold;";
            scoreCell.innerHTML = "Clicks Per Second";
            scoreCell.style = "padding-left: 30px;padding-right: 40px;font-weight: bold;";
    })
    })

    reactionBtn.addEventListener('click', function () {
        fetch('/reactionScores',{
            method: 'GET'
          })
          .then( function (response ) {
            return response.json();
          })
          .then( function (response){
            while(table.rows.length !== 0)
            {
                table.deleteRow(0);
            }
            
            var row = table.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Username";
            userCell.style = "padding-left: 30px;padding-right: 40px;font-weight: bold;";
            scoreCell.innerHTML = "Average Time";
            scoreCell.style = "padding-left: 30px;padding-right: 40px;font-weight: bold;";
    })
    })

    accuracyBtn.addEventListener('click', function () {
        fetch('/accuracyScores',{
            method: 'GET'
          })
          .then( function (response ) {
            return response.json();
          })
          .then( function (response){
            while(table.rows.length !== 0)
            {
                table.deleteRow(0);
            }
            
            var row = table.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Username";
            userCell.style = "padding-left: 30px;padding-right: 40px;font-weight: bold;";
            scoreCell.innerHTML = "Time";
            scoreCell.style = "padding-left: 30px;padding-right: 40px;font-weight: bold;";
    })
    })
}