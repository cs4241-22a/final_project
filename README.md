# final_project:
Authors:
- Cather Zhang
- Jordan Wecler
- Mark Renzi

1. [Project link](https://pushbox.glitch.me/)  
The project is called PushBox. It is a game where the player can login with their github account, and play. The purpose of the game is to remove all pairs of blocks of the same color by pushing them together. A player can control the character with the arrow keys or on screen buttons to move around and push blocks by moving into them.  

    Once the player starts moving, there is a timer to keep track of how long it takes to solve the puzzle. The number of moves used to solve the board is also tracked. Once the puzzle is solved, the player can click "submit" to submit their scores to the leaderboard, where only their best times and fewest number of moves is saved. 

2. The player can log in with their GitHub account, and any instructions required to play are on the navigation bar at the top of the screen.
3. The game GUI was created on HTML canvas using React. The login is through passport.js using the oauth2 github strategy, and scoreboard data is stored in MongoDB. The conversion from React JSX files to JS is done using Babel CLI.
4. The biggest challenges of this project stemmed from converting our React App to regular JavaScript, as there was a learning curve to defining scripts in our package.JSON file that would run in the terminal inside of Glitch.
5. Cather was responsible for making the game with react app. Mark was responsible for the MongoDB scoreboard implementation, Babel JSX to JS setup on Glitch, GitHub login, and UI using Bulma. Jordan was responsible for making new levels and implementing UI changes.
6. [Presentation video](https://www.youtube.com/watch?v=VZ5HhVQbso8)
