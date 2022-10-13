window.onload = function() {
    const cpsBtn = document.getElementById("cpsBoardBtn");
    const reactionBtn = document.getElementById("reactionBoardBtn");
    const accuracyBtn = document.getElementById("accuracyBoardBtn");
    const aimBtn = document.getElementById("aimBoardBtn");
    const table = document.getElementById("leaderboard-table");

    cpsBtn.addEventListener('click', function () {
        fetch('/getCPSScores',{
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
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Number Clicks";
            scoreCell.style = "scope=\"col\"; font-weight=bold";


            for(let i = 0; i < response.length; i++)
            {
                var row = table.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);

                userCell.innerHTML = response[i].owner_id;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
            fetch('/GetUsers',{
                method: 'GET'
              })
              .then( function (res ) {
                return res.json();
              })
              .then( function (res){
                console.log(res);
                for(let i = 1; i < table.rows.length; i++)
                {
                    var username = "";
                    for(let j = 0; j < res.length; j++)
                    {
                        if(res[j].id === table.rows[i].cells[0].innerHTML)
                        {
                            username = res[j].username;
                        }
                    }
                    table.rows[i].cells[0].innerHTML = username;
                }
            })
    })
    })

    reactionBtn.addEventListener('click', function () {
        fetch('/GetReactionScores',{
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
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Average Time";
            scoreCell.style = "scope=\"col\"; font-weight=bold";

            for(let i = 0; i < response.length; i++)
            {
                var row = table.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);

                userCell.innerHTML = response[i].owner_id;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
            fetch('/GetUsers',{
                method: 'GET'
              })
              .then( function (res ) {
                return res.json();
              })
              .then( function (res){
                console.log(res);
                for(let i = 1; i < table.rows.length; i++)
                {
                    var username = "";
                    for(let j = 0; j < res.length; j++)
                    {
                        if(res[j].id === table.rows[i].cells[0].innerHTML)
                        {
                            username = res[j].username;
                        }
                    }
                    table.rows[i].cells[0].innerHTML = username;
                }
            })
    })
    })

    accuracyBtn.addEventListener('click', function () {
        fetch('/GetAccuracyScores',{
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
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Average Time";
            scoreCell.style = "scope=\"col\"; font-weight=bold";


            for(let i = 0; i < response.length; i++)
            {
                var row = table.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);
                
                userCell.innerHTML = response[i].owner_id;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
            fetch('/GetUsers',{
                method: 'GET'
              })
              .then( function (res ) {
                return res.json();
              })
              .then( function (res){
                console.log(res);
                for(let i = 1; i < table.rows.length; i++)
                {
                    var username = "";
                    for(let j = 0; j < res.length; j++)
                    {
                        if(res[j].id === table.rows[i].cells[0].innerHTML)
                        {
                            username = res[j].username;
                        }
                    }
                    table.rows[i].cells[0].innerHTML = username;
                }
            })
    })
    })

    aimBtn.addEventListener('click', function () {
        fetch('/GetAimScores',{
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
            userCell.style = "scope=\"col\"; font-weight=bold";
            scoreCell.innerHTML = "Total Time";
            scoreCell.style = "scope=\"col\"; font-weight=bold";


            for(let i = 0; i < response.length; i++)
            {
                var row = table.insertRow(i+1);
                var userCell = row.insertCell(0);
                var scoreCell = row.insertCell(1);
                
                userCell.innerHTML = response[i].owner_id;
                userCell.style = "scope=\"row\"";
                scoreCell.innerHTML = response[i].score;
                scoreCell.style = "scope=\"row\"";
            }
            fetch('/GetUsers',{
                method: 'GET'
              })
              .then( function (res ) {
                return res.json();
              })
              .then( function (res){
                console.log(res);
                for(let i = 1; i < table.rows.length; i++)
                {
                    var username = "";
                    for(let j = 0; j < res.length; j++)
                    {
                        if(res[j].id === table.rows[i].cells[0].innerHTML)
                        {
                            username = res[j].username;
                        }
                    }
                    table.rows[i].cells[0].innerHTML = username;
                }
            })
    })
    })
}