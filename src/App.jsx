
import React from "react";
import "./global.css";
import { Navigate } from "react-router-dom";

class App extends React.Component {
  constructor( props ) {
    super( props )
    // initialize our state
    this.state = { 
      loggedin: true, 
      currUser:"", 
      posts: [],
      displayMakePost: false,
      displayMakeResponse: [],
      displayViewResponses: [] }
    this.loginStatus();
    this.load();
  }

  load() {
    fetch( '/collDocs', { 
      method:'post', 
      'no-cors': true, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"name": "posts"}) 
    })
    .then( response => response.json() )
    .then( json => {
      console.log(json);
        this.setState({ posts:json }) 
    })
  }

  loginStatus() {
    fetch('/loginStatus', {
      method: 'get',
      'no-cors': true,
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      this.setState({ loggedin: json.login, currUser: json.user }) 
    })
  }

  makePost(e) {
    e.preventDefault();
    fetch('/addPost', {
      method:'post', 
      'no-cors': true, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user: this.state.currUser, comment: document.getElementById("makePostComment").value, responses: []}) 
    })
    this.setState({displayMakePost: false});
    this.load();
  }

  showMakePost() {
    if(this.state.displayMakePost) {
      return (
        <form id="makePost">
          <label for="makePostComment">What would you like to hear?</label>
          <input id="makePostComment" type="text" />
          <button type="submit" onClick={e => this.makePost(e)}>Submit</button>
          <button type="button" onClick={() => this.setState({displayMakePost: false})}>Cancel</button>
        </form>
      );
    }
  }

  displayPost(post, i) {
    return (
      <li>
        Comment: {post.comment}
        <button type="button" onClick={() => {
            let arr = this.state.displayMakeResponse;
            arr[i] = true;
            this.setState({displayMakeResponse: arr})
          }}>Respond</button>
        <input type="button" value={this.state.displayViewResponses[i] === true ? "Hide Responses" : "View Responses"} onClick={(e) => {
            let arr = this.state.displayViewResponses;
            if(arr[i] === true) {
              arr[i] = false;
              this.setState({displayViewResponses: arr})
            } else {
              arr[i] = true;
              this.setState({displayViewResponses: arr})
            }
          }}></input>
        {this.showViewResponses(i)}
        {this.showMakeResponse(i)}
      </li>
    );
  }

  makeResponse(e, i) {
    e.preventDefault();

    fetch('/addResp', {
      method:'post', 
      'no-cors': true, 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: this.state.currUser, 
        song: document.getElementById("makeResponseSong").value,
        artist: document.getElementById("makeResponseArtist").value,
        comment: document.getElementById("makeResponseComment").value}) 
    })
    .then(response => response.json())
    .then(json => {
      fetch('/updatePostNewResponse', {
        method:'post',
        'no-cors': true, 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_id: this.state.posts[i]._id, responseid: json.insertedId})
      });
    })

    let arr = this.state.displayMakeResponse;
    arr[i] = false;
    this.setState({displayMakeResponse: arr})
    this.load();
  }

  showMakeResponse(i) {
    if(this.state.displayMakeResponse[i]) {
      return (
        <form id="makeResponse">
          <label for="makeResponseSong">Song: </label>
          <input id="makeResponseSong" type="text" />
          <label for="makeResponseArtist">Artist: </label>
          <input id="makeResponseArtist" type="text" />
          <label for="makeResponseComment">Comment: </label>
          <input id="makeResponseComment" type="text" />
          <button type="submit" onClick={e => this.makeResponse(e, i)}>Submit</button>
          <button type="button" onClick={() => {
              let arr = this.state.displayMakeResponse;
              arr[i] = false;
              this.setState({displayMakeResponse: arr})
            }}>Cancel</button>
        </form>
      );
    }
  }
  
  showViewResponses(i) {
    if(this.state.displayViewResponses[i]) {
      return (
        <ul>
          {this.state.posts[i].responses.map((entry) => {if(entry !== null && Object.keys(entry).length !== 0)return <li>{entry /* Show the actual content of the entry (response id) */}</li>})}
        </ul>
      )
    }
  }

  render() {
    if(this.state.loggedin == false) {
      return (
        <Navigate replace to="/login"/>
      );
    } else {
      return (
        <>
        <h1>
            Hello {this.state.currUser}
        </h1>
        <div id="displayPosts">
          <button type="button" onClick={() => this.setState({displayMakePost: true})}>Make Post</button>
          {this.showMakePost()}
          <ul>
            {this.state.posts.map((post, i) => this.displayPost(post, i))}
          </ul>
        </div>
        </>
      );
    }
  }
}

export default App;
