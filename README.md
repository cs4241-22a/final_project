# Final Project - Pet the .jpeg
*Due before the start of class, October 13th (final day of the term)*

# Group
<li>Alex Bolduc
<li>Lena Dias
<li>Sean O'Connor
<li>Jonathan Metcalf
<li>Darian Tavana

# Details
1. A brief description of what you created, and a link to the project itself

https://pet-the-jpeg.glitch.me/

<b>Please run the page only in Firefox.</b>

Pet the .jpeg is an interactive web application where users raise their own pet. Users level up their pet by repeatedly clicking it. As the pet’s level increases, it becomes more challenging to continue to level up by requiring more clicks to do so. By leveling up, the pet unlocks new attributes that can be customized to change its visual appearance. Customizations include hats, colors, and different pet species. The progress of users is saved on a database, so they can continue their progress the next time they log in. There are two main pages: the log-in page and the pet interaction page.

2. Any additional instructions that might be needed to fully use your project (login information etc.)

To log into the project, a Github account is required as it is supported by GitHub OAuth and thus requires access to a valid GitHub account. 

3. An outline of the technologies you used and how you used them.

Technologies and libraries that are used include Express, MongoDB, React, Passport, and Tailwind. Express is used for middleware and to handle server requests, MongoDB is used to store user authentication data along with user pet data, React is used to manage client-side functionality, Passport for Github user authentication, and Tailwind is used for CSS across pages.

4. What challenges you faced in completing the project.

One challenge we faced was coloring the SVGs dynamically based on what color the user selected. Using external SVG files through the svg <use> tag allows access to the underlying svg source in Firefox which allows us to dynamically change a CSS rule through javascript to change the color of parts of the SVG. Unfortunately, there were some issues with it working on all browsers we tested. Interestingly, it worked on Firefox, but not Edge or Chrome. We were unable to resolve this issue, largely due to the inaccessibility of elements within browser-inserted shadow DOMs. Users in a browser other than Firefox will be alerted to use the correct browser.

Another challenge we came across was connecting our React frontend with our Express backend. Specifically, designing our backend to support storing and serving all the content necessary on the frontend proved to be a challenge. As a result, our group spent significant time brainstorming how our backend should be structured. 

5. What each group member was responsible for designing / developing.

- Alex Bolduc 
  - Front-end React functionality.
    - Pet clicking
    - Adding customizations to the pet
    - Getting unlocked customizations into sidebar
  - Connection between front and back end state management
  - Laying out page HTML and CSS
  - Small backend tweaks to work better with frontend

- Lena Dias 
  - Creation of pixel art assets
  - Bug testing and research
  - Implemented Glitch.me compatibility  

- Sean O'Connor 
  - Concept designs of application using Figma
  - Designed and created the original login and main page frontend HTML and CSS
  
- Jonathan Metcalf 
  - Implemented Github OAuth
  - Set up default pet creation
  - Added custom middleware for checking database connection and whether the user is logged in

- Darian Tavana 
  - Created the skeleton for the Express backend
  - Implemented database functionality with Mongoose schemas
  - Implemented /api routes 

6. A link to your project video.

https://youtu.be/lVR4lealp8o

