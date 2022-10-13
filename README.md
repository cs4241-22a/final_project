# Final Project #

Group Members: Megan Letendre, Tobias Mack, Joe Dobbelear, Kseniia Romanova, and Dillon McCarthy

## Project Description ##

As outlined in our proposal, creating group grocery lists can be a challenge when wanting to include input from every member of a household. Go Grocery hopes to solve some of these challenges by allowing users to create a group grocery list by making a group account. To use the application, users must login to their group account. From there, they are able to add items to their list and categorize them based on common grocery store sections (i.e., bakery, produce, etc.). 

When a user goes grocery shopping, they are able to see an organized and comprehensive list of items that all members of their household have had a say in. As they shop items can be crossed off and removed from the list as they are added to their cart. Once the trip is over, the list is empty (since all of the items have been added to the user's cart and removed) and ready for users to add items for the next shopping trip. Overall, this application will create a more enjoyable, comprehensive, and convenient grocery shopping experience for all members in the household. 

Project Link: https://dmccarthy-final-project.herokuapp.com/ 

## Additional Instructions ##

Login to the application using the following credentials:
Username: abc@gmail.com
Password: abc@123
OR
Sign up by pressing the ‘Sign Up’ button and filling email and password fields.
Log out by pressing the ‘Logout’ button on the top bar of the home page.
Add item by entering item name and item type and pressing ‘Add to List’ button.
Delete item by pressing X button next to it.
Change cart code by entering a different code and pressing ‘Change Cart’.

## Technologies Used ##

- [Visual Studio Code](https://code.visualstudio.com/): Used by all group members for code editing.
- [Github](https://github.com/): Used for code collaboration and assigning aspects of the project to different group members:
- [Figma](https://figma.com/): Used to develop mockups of screens and application flow and execute pre-development user testing. (Mockups can be found here: https://www.figma.com/file/nrsNSM695xM1bokVVs0UCT/GoGrocery-Mock-Up?node-id=0%3A1)
- [Google Fonts](https://fonts.google.com/): Used to select and import fonts used throughout the application)
- [Material.io Color](https://material.io/inline-tools/color/): Used to create a color scheme that was accessible to all users and aesthetically pleasing. 
- [MongoDB Cloud](https://www.mongodb.com/cloud): Used to manage our database.
- [Express.js](https://expressjs.com/): Used for building our web server.
- [React](https://reactjs.org/): Used for building our web client.
- [Bootstrap CSS](https://getbootstrap.com/): Used as the main styling for our application. Some customizations were made but were used as minimally as possible to ensure the integrity of the template.
- [Jest](https://jestjs.io/): Used for testing our React application.
- [Heroku](https://www.heroku.com/): Used as the host of our web application.

## Challenges ## 

- Challenge #1: Completing a design process in a short period of time.
We wanted to ensure that the design of our application had a good user experience and also wanted to align our project up with the goals of our team members. Completing the design process for this application was difficult as we had such a short period of time to complete it. We had to decide what aspects were really important, what aspects could be sped through/shortened, and what aspects could be skipped all together. A lot of time had to be spent on this and the development of designs and analysis of user feedback had to be completed in a very short period of time to ensure ample time for development. The resources and hints from the W3C to make the site accessible and the CRAP principles were implemented in the design as well. A link to the results of our user testing can be found here: https://docs.google.com/spreadsheets/d/1Nv7-e54FCDSGOckiHn3bFO3UxN-GXC7TsganlLqk0Zs/edit?usp=sharing 

- Challenge #2: Gatling Load Tests
To get an idea of how performant our web application is, we made some test scenarios, with which we can test our application after each new iteration. The difficult part was to figure out how to avoid caching and using dynamic data, so that it's simulating real world usage. Also the adding of the session cookie had to be made manually. But thanks to the good scala and gatling documentation it was possible to implement the .csv feeder and JSON builder in a simple human readable form.

- Challenge #3: Hosting Service
The web application is hosted on Heroku rather than Glitch. Class demonstrations and previous projects used Glitch, so an additional challenge for the project was to use a different hosting service. Heroku is a more streamlined hosting service with automatic pipelining from GitHub to Heroku. Automatic deployment can be set up so that any commit to the project on GitHub will automatically update and redeploy in real time on the Heroku application. Unlike Glitch, however, Heroku is purely a hosting service and does not offer a code-editor, so GitHub integration is required.
Challenge #4: Cookie Login
The web application uses cookies to verify user sign-in sessions. To keep login secure, users are only able to access the database if they’ve logged in, and they are given access only to their own user entry in the database. Session codes are generated randomly on sign-in, stored in a map in the server’s memory, and tied to a user’s ID. That user can then only use Go Grocery if they have a valid session code. The logout button deletes the current session code from the server’s memory and redirects the user to the login page.

- Challenge #4: Password Hashing
So that passwords are not stored in plaintext, we use bcrypt to hash passwords. When a password is submitted on user creation, it’s turned into an unreadable string. When a user tries to login, we ask bcrypt if the password is correct and respond accordingly. Our database does not have any readable passwords.

## Member Contributions ##

[Megan Letendre](https://github.com/meganletendre7): I worked very heavily on design aspects of this project. I completed a very shortened version of the user experience design process for the application. I am very interested in and have good experience in UI/UX design so I wanted to gain more experience and felt this was one of the greatest strengths I brought to the team. I completed some research/developed the application concept, selected a color scheme, developed the Figma mockups and user/application flows, user testing (both pre and post development), and analysis of the feedback. On top of this, in terms of design, I ensured that our application was accessible according to the resources and hints from the W3C as well as the CRAP principles. In terms of development, I worked to develop the login page. 

[Tobias Mack](https://github.com/tobias-mack): At the beginning of the project I created the MongoDb cluster. After that I worked on a form validation for the signup page. I created regular expressions that test the input and added a feedback mechanism to the user. After the application was done I wrote Gatling load tests in Scala to check the performance of the application. For the tests I generated a random dataset with java, since we want to use dynamic data so that all users don't play the same and we end up with a behavior completely different from the live system (caching, JIT...).

[Joe Dobbelear](https://github.com/r2pen2): I contributed a lot to both the front-end and back-end of this project. First, I created a React project, an Express server, made the Express server host the React build files, and pushed that to a repository for the rest of the team to work on. On the front-end, I created the react components used in the Homepage (TopBar, Sections, Section-Deploy-Buttons). This involved pulling cart data from the database, allowing the user to change their current cart, displaying a user’s home cart, creating the inputs for new food name and new food category, the add food button, showing/hiding lists in categories, and all associated CSS. On the back-end, I wrote the GET and POST routes (GET /cart-data, GET /home-cart, POST /add-item, POST /remove-item, POST /login, POST /logout, POST /register, and POST /create-cart), wrote the code that handles user sign-in/out with cookies, made all of these routes validate that a user has a valid session cookie, the DB models for carts and users, and the code to add a cart/user to the database. Also for sign-in, I made the server hash passwords with bcrypt so that we aren’t storing plaintext passphrases in our database. Finally, I implemented a message on the login page that tells the user if their email or password is incorrect and put a login button in the TopBar that removes a session cookie from the server’s memory. 

[Kseniia Romanova](https://github.com/kr0man0va): This project was a big learning curve for me since I didn’t use React in my previous assignments. I did a lot of research on how to connect passport.js to our application, however, we ended up not using it. I also made a Sign Up page and made sure that both Sign Up and Log In look like the mock-ups; this included working with .jsx and .css files. In addition, I connected the MongoDB database to our application. Since MongoDB is more flexible (no schema required), I used the MongoDB node.js driver.

[Dillon McCarthy](https://github.com/dmccarthy11): For this project I worked on the application scripting to implement communication between the application and the server on the home page. This included collaborative work with the server and ensuring the proper json objects were passed back and forth with fetch calls. Additionally, I attempted to carry out user authentication using passport.js for the application. With no prior experience and a significant time spent struggling with the authentication middleware, the group decided to use cookies to login. I also uploaded and hosted the web application on Heroku.
Project Video

## Video ##
Link to Project Video: https://drive.google.com/file/d/1IawhBmWE7PqX01mxGeZDEomHiSIEgla_/view?usp=sharing 
