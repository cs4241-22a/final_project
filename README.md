# Emoji Place 🌍
Welcome to Emoji Place! Similar to r/place, but rather than putting a colored square on a grid, the user can put an emoji. r/place was a project by reddit that allowed users to draw on a 1000 by 1000 pixel canvas. Each user was able to place one pixel every 5 minutes. Our project is targeted towards an audience similar to Reddit's for the purpose of artistic creativity.


[Original r/place](https://www.reddit.com/r/place/cx=1256&cy=1781&px=214&ts=1649112460185)

When first connnected to the project, the user is brought into the login page. Upon clicking the login button, the user will be prompted to authorize their login with Github. After logging in, the user can use the Emoji picker on the bottom left corner to pick an emoji, then pick a place on the canvas to put the emoji. To place an emoji, click the **add emoji** button on the bottom. The user can also zoom in and out of the canvas and logout using the top right button. For this version of our application, there is no time out for placing an emoji.


## Link to Project on Digital Ocean
[Emoji Place](http://157.230.2.81:3000/login)

## Link to Video Explanation
[Emoji Place Video](https://drive.google.com/file/d/1UvAO8q8GtukD80_0buDFhUUwEAlXt-fz/view?usp=sharing)


## Group Member Contributions

### All Members
We all contributed to the overall design and planning process for how the architecture of our web app would work. We also worked together to make an mockup for how the UI should be laid out.

### Qui
I developed the entirety of the Canvas page and all of its interactions, such as placing the emojis and the React component rendering architecture. I also helped with the express.js routing and handling client-side routing.

### Cameron
I primarily developed the express server and its interaction with the client. I developed the caching solution that stored the emoji grid on the server’s memory.I set up the hosting for the server on a DigitalOcean droplet and debugged some relevant routing issues that resulted from the move.

### Michael
I primarily developed the persistent data storage system that utilized the mongoose JS library and MongoDB Atlas. This required developing schema for both each individual square (or cell) in the canvas grid and the user. I also wrote the necessary middleware to update and insert data into the MongoDB collections.

### Mary
I used MUI to format the login page as well as helped with UI problems that developed during implementation of the canvas page with converting Emoji Unicode to HTML. 


## Technical Achievements:
- **React framework**: Used client-side routing to handle switching between the login and canvas page. We did this because our application is cross-origin.
- **Single page application (SPA)**: Our application is a SPA through the use of React and React Router.
- **Express Router**: Use of express.js to handle user authentication and routing. Users cannot access /canvas without being authenticated (will reroute to /login).
- **OAuthentication**: Uses passport.js with the GitHub Strategy for authentication and integrated with a cross orgin platform (React and express.js).
- **Digital Ocean**: Website is hosted on a Digitalocean Ubuntu droplet.
- **Typescript**: Used Typescript to write the front and back end of the web app to ensure semantic bugs could be caught at compile-time.
- **dotenv**: Used the `dotenv` library to securely load database and authentication credentials into the server.
- **Use of external middleware**
    - ```cors```: Handling for CORS policy.
    - ```express-session```: Storing session data.
    - ```passport```: OAuth.
    - ```passport-github2```: OAuth method.
- **Use of custom middleware**
    - ```checkAuthenication```: Checks if the current user is authenticated on GitHub.


## Design Achievements:
- **CSS Framework:** We used Material UI for our CSS framework to create the bulk of our design. This helped speed up the development process as we initially designed our application to follow the Material UI design schema.
- **Customized Color Scheme:** We used a customized color scheme that can be seen on our Figma: https://www.figma.com/team_invite/redeem/GcZo9RJ1MTxAC9ysCwj09P
- **Use of React Components**
    - ```react-emoji-picker```: Used to select emoji.
    - ```react-router-dom```: Used for client-side routing.
    - ```@pronestor/react-zoom-pan-pinch```: Used for panning and zooming of canvas.

## Challenges
- **Canvas Rerendering**: With the canvas page, we used an external library to handle our zooming and panning features. It works by using CSS translate to do the movements; however, this caused a reload on the Canvas.tsx component and made the canvas rerender all of the emojis. To fix this, we memoized the Grid component into a separate component and abstracted out the Pixel. Additionally, to initially load Canvas.tsx and its emojis, we had to disable the canvas completely until our ```useEffect``` side effect ran after the initial render. From there, we did a ```fetch``` to get the grid array and then assigned it to a state using ```useState```. We then did a force rerender using the ```[render, rerender]``` hack, which causes the component to render with the emoji data.
- **Transition to Typescript**: Several of the libraries we used did not have perfect integration with Typescript. This resulted in several compiler errors that traced back to code outside of our project.
- **Switching to React-Router**: ```react-router-dom``` worked completely differently from express-router. React-router handles routing completely locally, so we had to re-write our routing code on the server-side.
- **Emoji Unicode**: Rendering the emojis was difficult because they are written in unicode. Unfortunately, there is no great method to converting unicode to HTML code, especially with the introduction of the more advanced emojis. To combat this problem, we took the DOM-compiled Emoji component and manipulated how it was displaying post-processing from React. The component is transformed into an image that had a URL to the emoji it was displaying. We took this and altered the URL with the correct unicode. To make sure that we synced with the server, we still made a request to the server to update the data.
- **Websockets**: Getting real-time updates to the canvas using websockets was largely separate from normal fetch requests made to the server. Ensuring that an active Websocket connection didn't bypass any of the OAuth protocols was a challenge. We had to ensure that a websocket connection was never established in an unauthenticated user.
- **Array Ordering**: Pulling a large amount of data from a database is typically not a problem because the order the data returned is irrelevant as long as all of the data is provided. However, for our application, the cells needed to be ordered for the cached array to reduce the overall number of database calls. Additionally, the array also needed to be properly ordered on client side so they are displayed correctly. The process of discovering this particular bug was long and painful as the emojis were not updated correctly as the index value was essentially random everytime they were updated. We eventually used a sort method to ensure the data was ordered on arrival to the client and server. 
