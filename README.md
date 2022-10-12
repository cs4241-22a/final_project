Cole Manning, Mason Powell, Ben Sakac, Greg Klimov
http://gompei-clicker-final-project.glitch.me

Video: https://www.youtube.com/watch?v=mUVeiCJihdE

**A brief description:**

Our project is a “Cookie Clicker”-esque game, but with Gompei as the object to be clicked. As you click Gompei you will gain “goat bucks” for each click. You can purchase ‘upgrades’ to automate or improve your clicking. You can login via Github OAuth and your upgrades and scores will be saved either once every minute or manually. 

There is a global top-10 scoreboard for all players to see who is the best Gompei Clicker out there. The game also features a playlist soundtrack and Favicon tab icon.

**Additional instructions:**

Users can log in with GitHub OAuth. The home page is a fullscreen button that when clicked initiates the login with Github. Saving and Leaderboard updating occurs once every minute and when the user clicks the corresponding button.

**Technologies:**
  MonogoDB - used to save user’s score and upgrades 
  Express - used to host server backend and to process get and push requests
  GitHub OAuth - used for login
  React - used for main page UI, particularly for Leaderboard and Upgrades
  Snowpack - used for project organization and jsx builds
  Bootstrap - used for styling 
  Favicon - used for tab icon 
  Glitch - used for hosting the project 
 
**Challenges:**
One challenge we faced on the project was getting the music to play
When trying to parse json input from server, sometimes getting the data simply didn't work for reasons unknown
Exporting the project to Glitch proved challenging because Glitch did not recognize Mime as existing
 
**What each group member was responsible for designing / developing.**
Cole
  GitHub OAuth implementation
  Worked on Music with Mason
  Work on styling app with Mason
Mason
  Styled app page with Cole 
  Implemented basic app functions clicking and buying upgrades
  Worked on music with Cole
Ben
  Setup the DB on cloud.mongodb
  Created routes on the server to send or receive data to the DB
  Game data loading and saving Leaderboard
  Created giant button for login page
Greg
  Added React and snowpack to project
  Converted existing UI to React
  Created and hooked up React Upgrade Buttons
  Created and hooked up Leaderboard
  Added Favicon
  
**Project video:**

