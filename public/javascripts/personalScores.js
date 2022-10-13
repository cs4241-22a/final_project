const cpsBtnPersonal = document.getElementById("pcpsBoardBtn");
const reactionBtnPersonal = document.getElementById("preactionBoardBtn");
const accuracyBtnPersonal = document.getElementById("paccuracyBoardBtn");
const aimBtnPersonal = document.getElementById("paimBoardBtn");
const tablePersonal = document.getElementById("personal-leaderboard-table");

cpsBtnPersonal.addEventListener('click', function () {
    if(user !== null)
    {
        var body = JSON.stringify({owner_id: user});
        fetch('/getPersonalCPSScores',{
            method: "POST",
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body
        })
        .then( function (response ) {
            return response.json();
        })
        .then( function (response){
            while(tablePersonal.rows.length !== 0)
            {
                tablePersonal.deleteRow(0);
            }
            
            var row = tablePersonal.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Date";
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Number Clicks";
            scoreCell.style = "scope=\"col\"; font-weight=bold";


            for(let i = 0; i < response.length; i++)
            {
                var row = tablePersonal.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);

                userCell.innerHTML = response[i].time;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
        })
}
})

reactionBtnPersonal.addEventListener('click', function () {
    if(user !== null)
    {
        var body = JSON.stringify({owner_id: user});
        fetch('/GetPersonalReactionScores',{
            method: "POST",
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body
        })
        .then( function (response ) {
            return response.json();
        })
        .then( function (response){
            while(tablePersonal.rows.length !== 0)
            {
                tablePersonal.deleteRow(0);
            }
            
            var row = tablePersonal.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Date";
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML =  "Time";
            scoreCell.style = "scope=\"col\"; font-weight=bold";

            for(let i = 0; i < response.length; i++)
            {
                var row = tablePersonal.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);

                userCell.innerHTML = response[i].time;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
    })
}
})

accuracyBtnPersonal.addEventListener('click', function () {
    if(user !== null)
    {
        var body = JSON.stringify({owner_id: user});
        fetch('/GetPersonalAccuracyScores',{
            method: "POST",
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body
        })
        .then( function (response ) {
            return response.json();
        })
        .then( function (response){
            while(tablePersonal.rows.length !== 0)
            {
                tablePersonal.deleteRow(0);
            }
            
            var row = tablePersonal.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Date";
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Average Time";
            scoreCell.style = "scope=\"col\"; font-weight=bold";


            for(let i = 0; i < response.length; i++)
            {
                var row = tablePersonal.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);
                
                userCell.innerHTML = response[i].time;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
    })
}   
})

aimBtnPersonal.addEventListener('click', function () {
    if(user !== null)
    {
        var body = JSON.stringify({owner_id: user});
        fetch('/GetPersonalAimScores',{
            method: "POST",
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body
        })
        .then( function (response ) {
            return response.json();
        })
        .then( function (response){
            while(tablePersonal.rows.length !== 0)
            {
                tablePersonal.deleteRow(0);
            }
            
            var row = tablePersonal.insertRow(0);
            var userCell = row.insertCell(0);
            var scoreCell = row.insertCell(1);
            
            userCell.innerHTML = "Date";
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Total Time";
            scoreCell.style = "scope=\"col\"; font-weight=bold";


            for(let i = 0; i < response.length; i++)
            {
                var row = tablePersonal.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);
                
                userCell.innerHTML = response[i].time;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
    })
}
})
