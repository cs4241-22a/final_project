<!--create/submit playlists page -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Submit</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>

  <body class="bg-light">
    <h1 class="text-primary ms-1">Submit a Song</h1>
    <p>
      Enter the song's genre ('Rap', 'Pop', 'R&B', 'Rock', or 'Country'), along
      with the song's title and artist
    </p>
    <form>
      <!--<input type="text" id="genre" value="enter a valid genre" />
      <select id="genre" name="genre" size="3">
        <option value="Rap">Rap</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
'Pop', 'R&B', 'Rock', or 'Country
        <option value="audi">Audi</option>
      </select>-->
      <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="genre">
        <option selected>Genre</option>
        <option value="Rap">Rap</option>
        <option value="R&B">R&B</option>
        <option value="Rock">Rock</option>
        <option value="Pop">Pop</option>
        <option value="Country">Country</option>
      </select>
      <br>
      <input type="text" id="title" value="enter song title" />
       <br>
      <input type="text" id="artist" value="enter song artist" />
       <br>
      <button>Submit Song</button>
    </form>
    <form>
      <button type="backToTop" id="backToTop">
        Back to Top Songs Playlists
      </button>
    </form>
    
  </body>
</html>

<script>
  
  const backBtn = document.getElementById('backToTop');
  
  const submit = function (e) {
    e.preventDefault();

    const genre = document.getElementById("genre"),
      title = document.getElementById("title"),
      artist = document.getElementById("artist")
      //json = { genre: genre.value, title: title.value, artist: artist.value },
      //body = JSON.stringify(json);
      //console.log(body)
    if(genre.value != 'Genre'){
      fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({genre: genre.value, title: title.value, artist: artist.value, vote: 1 }),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json);
      });

      window.location.href = 'top.html';
    }
    return false;
  };
  
  backBtn.onclick = () => {
  window.location.href = 'top.html';
  return false;
}

  window.onload = function () {
    const button = document.querySelector("button");
    button.onclick = submit;
  };
</script>
