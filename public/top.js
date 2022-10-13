
// fill the page: Rap (Test; doesn't work yet)
const rbTable = document.getElementById('R&BTable'),
      popTable = document.getElementById('popTable'),
      rockTable = document.getElementById('rockTable'),
      countryTable = document.getElementById('countryTable'),
      Raptable = document.getElementById('rapTable'),
      logout = document.getElementById('logout'),
      addBtn = document.getElementById('addSong');

//document.body.appendChild(document.createElement('p').innerHTML=req.cookies['user'])

//const test = function(){
//  fetch("userCookie", {method:"POST"})
//  .then(response => response.json()) // parse the JSON from the server
//  .then(user => {console.log(user)})
///}
//test();

const appendNewSong = function(song,type) {
  const newListItem = document.createElement('li');
  if(song.vote == undefined)
    song.vote = 0;
  newListItem.innerHTML = song.title + " " + song.artist //+   '    &#x2191 ' + song.vote; //+ '  &#x2191' + '   &#x2193';
  if(song.vote > 0)
    newListItem.innerHTML += '    &#x2191 ' + song.vote;
  if(song.vote < 0)
    newListItem.innerHTML += '    &#x2193 ' + song.vote;
  type.appendChild(newListItem);
}





fetch("/get", {
    method: "POST",
  })
  .then(response => response.json()) // parse the JSON from the server
  .then(songs => {
    
  
    // remove the loading text
    
    //rapList.firstElementChild.remove();
    //rbList.firstElementChild.remove();
    //popList.firstElementChild.remove();
    //rockList.firstElementChild.remove();
    //countryList.firstElementChild.remove();
  
    songs.forEach(element => {
      switch(element.genre){
        case("Rap"):
          //appendNewSong(element,rapList);
          appendNewSongTable(element,Raptable);
          break;
        case("R&B"):
          //appendNewSong(element,rbList);
          appendNewSongTable(element,rbTable);
          break;
        case("Pop"):
          //appendNewSong(element,popList);
          appendNewSongTable(element,popTable);
          break;
        case("Rock"):
          //appendNewSong(element,rockList);
          appendNewSongTable(element,rockTable);
          break;
        case("Country"):
          //appendNewSong(element,countryList);
          appendNewSongTable(element,countryTable);
          break;
        default:
          break;
          
      }
      console.log(element);
      

    })
  })

const appendNewSongTable = function(song,type) {
        const row = type.insertRow(1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        cell1.innerHTML = song.title;
        cell2.innerHTML = song.artist;
        if(song.vote > 0){
          cell3.innerHTML = song.vote + '  &#x2191  ';
        } else if(song.vote < 0){
          cell3.innerHTML = Math.abs(song.vote) + '  &#x2193  ';
        } else {
          cell3.innerHTML = song.vote;
        }
        cell4.innerHTML = "   &#x2191   ";
        cell5.innerHTML = "   &#x2193   ";
        cell4.addEventListener("click", function () {
          upVote(song); //remove item
        });
        cell5.addEventListener("click", function () {
          downVote(song); //remove item
        });
}

const upVote = function(song){
  console.log("upvote");
  song.vote += 1;
  fetch("/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  })
  window.location.reload();
}

const downVote = function(song){
  console.log("downvote");
  song.vote -= 1;
  
  if(song.vote <= -10){
    fetch("/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    })
  } else {
    fetch("/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    })
  }
  window.location.reload();
}

//{genre: genre.value, title: title.value, artist: artist.value, vote: 1 }

/*

<th>Song</th>
              <th>artist</th>
              <th>Rank</th>
              <th>Up Vote</th>
              <th>Down Vote</th>


//get the table
const table = document.getElementById("results");

//delete all elements (i used for reload)

const rows = table.rows.length;
  for (let i = rows - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  
  

//add a row ( i used element.forEach((item) => {
        const row = table.insertRow(1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        cell1.innerHTML = item.dest;
        cell2.innerHTML = item.miles;
        cell3.innerHTML = item.avg;
        cell4.innerHTML = item.time;
        cell5.innerHTML = "   ^   ";
        cell6.innerHTML = "   V   ";
        cell5.addEventListener("click", function () {
          del(item); //remove item
        });
        cell6.addEventListener("click", function () {
          modify(item); //remove item
        });
*/


addBtn.onclick = () => {
  window.location.href = 'create.html';
  return false;
}

logout.onclick = () => {
  window.location.href = 'index.html';
  return false;
}
