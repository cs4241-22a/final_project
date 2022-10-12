window.onload = function() {
    const cpsBtn = document.getElementById("cpsBoardBtn");
    const reactionBtn = document.getElementById("reactionBoardBtn");
    const accuracyBtn = document.getElementById("accuracyBoardBtn");
    const aimBtn = document.getElementById("aimBoardBtn");
    const table = document.getElementById("leaderboard-table");

    cpsBtn.addEventListener('click', function () {
        if(user !== null)
        {
            var body = JSON.stringify(user);
            fetch('/getPersonalCPSScores',{
                method: 'GET',
                body
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
                
                userCell.innerHTML = "Date";
                userCell.style = "scope=\"col\"; font-weight=bold";
                scoreCell.innerHTML = "Number Clicks";
                scoreCell.style = "scope=\"col\"; font-weight=bold";


                for(let i = 0; i < response.length; i++)
                {
                    var row = table.insertRow(i+1);
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

    reactionBtn.addEventListener('click', function () {
        if(user !== null)
        {
            var body = JSON.stringify(user);
            fetch('/GetPersonalReactionScores',{
                method: 'GET',
                body
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
                
                userCell.innerHTML = "Date";
                userCell.style = "scope=\"col\"; font-weight=bold";
                scoreCell.innerHTML = "Average Time";
                scoreCell.style = "scope=\"col\"; font-weight=bold";

                for(let i = 0; i < response.length; i++)
                {
                    var row = table.insertRow(i+1);
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

    accuracyBtn.addEventListener('click', function () {
        if(user !== null)
        {
            var body = JSON.stringify(user);
            fetch('/GetPersonalAccuracyScores',{
                method: 'GET',
                body
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
                
                userCell.innerHTML = "Date";
                userCell.style = "scope=\"col\"; font-weight=bold";
                scoreCell.innerHTML = "Average Time";
                scoreCell.style = "scope=\"col\"; font-weight=bold";


                for(let i = 0; i < response.length; i++)
                {
                    var row = table.insertRow(i+1);
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

    aimBtn.addEventListener('click', function () {
        if(user !== null)
        {
            var body = JSON.stringify(user);
            fetch('/GetPersonalAimScores',{
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
                
                userCell.innerHTML = "Date";
                userCell.style = "scope=\"col\"; font-weight=bold";
                scoreCell.innerHTML = "Total Time";
                scoreCell.style = "scope=\"col\"; font-weight=bold";


                for(let i = 0; i < response.length; i++)
                {
                    var row = table.insertRow(i+1);
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
}