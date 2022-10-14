# Song Finder
https://song-finder.glitch.me

This is a social music-based app where people can post about the kind of music they want to hear and others can respond with song suggestions. 

Users can:
 - See the total number of song suggestions they have made
 - View other users' responses to a post
 - Create posts telling users what kind of music they are looking for
 - Respond to posts with song suggestions, raising their total number of responses.

To use the app you must enter a username and password, and either log in with an existing account (press log in), or register for a new account (press register).

After responding to a post, click the "Refresh Everything" button to see your total response number go up and your response appear under the post.

## Technologies
 - React.js: This was used to dynamically update content on the main page as it changed. It was also used for switching between the login and main page.
 - MongoDB: This was used for storing all data related to account info, request posts, and song suggestions.
 - Express.js: This was used to serve files from our source folder and simplify the data sending and retrieval process

## Challenges
React has quite a steep learning curve and figuring out how to do tasks that would have been easier to do with basic javascript took a lot of time. But, after understanding the concepts and development flow of react, it became very useful and ultimately simplified complex and costly tasks.

Handling data on the main page was difficult because updating state variables would cause re-rendering loops and lead to endless fetch requests. Also, when setting state variables, their values would not immediately be updated, which made workarounds necessary.

Correctly switching between pages was comlicated and routing in React required lots of debugging until it worked correctly.

## Contributions
What each group member was responsible for designing / developing.
- Theo Coppola: Set up the structure of the application (login page + main page) and routing between pages. Created the server and implemented fetch/get requests and the database strucure with Marie. Created the readme. Implemented all jsx files and created methods, state variables, and event handlers.
- Marie Tessier: Worked mainly on the server side of the code and mongoDB with Theo. I helped implement the database structure and the fetch/get requests and posts. I also helped on the front end css, finding and implementing a template by Creative Tim (https://www.creative-tim.com). Note: Griffin sent me some that he had coded css because he was having trouble with his computer so the Git commits do not fully represent his contribution. 
- Griffin Atchue: Worked on front end designing html pages that were eventually left out and implemented formatting through css with assistance due to technical issues.
- Jack McEvoy: Worked on front end designing html pages and overall layout that were eventually left out and implemented spotify integration.

## Walkthrough
[Tutorial Video](https://github.com/tjcoppola234/Final_Project/blob/main/video3389648567.mp4)
