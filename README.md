# Final Project

Shane Stevens (smstevens@wpi.edu), Reagan Brunelle (rmbrunelle2@wpi.edu), Siddhartha Pradhan (sppradhan@wpi.edu)
Website link (Quick Notes): https://quick-notes.glitch.me/

## Description
We created a sticky notes web app, taking inspiration from Microsoft's Sticky notes (https://apps.microsoft.com/store/detail/microsoft-sticky-notes/9NBLGGH4QGHW). Users are given the ability to create virtual sticky notes and organize them with the choice of 5 colors. These notes features a title and content section that users dynamically add,modify, and delete. Users can also create multiple boards aiding in the organization of their sticky notes. Each sticky note is saved to its board for feature use. Users have the option of creating a username and password or through authenticating with their github account.

### Design
- **Color Palette**: Utilized dark color palette generated from using color.adobe.com to add more flair to the website.
- **Used the Inter from Google Fonts**: Used Inter as the font for the primary text in my site, using sans-serif as a backup.
- **UI review and redesign**: Asked friends/users to test the UI and provide feedback. UI changes were made based on feedback.

### Technical
- **Used multiple layouts**: Used various layouts such as flex and grid to align items
- **Login**: Implement OAuth authentication via Github strategy as well as a custom login method that utilizes salts and hashes, which itegrates seamlessly using a Mongoose User model. 
- **Used React**: Used React to create webpage, in which we created multiple components that made up the webpage
- **Single Page webapp**: The page displays app data of server from launch, and updates it accordingly to user input (after getting response from server), all in a single page

## Additional Instructions
The Login and Register page are straight foreward. After registering, the user is redirected to login screen. There are 2 test accounts ready (user: "user1", pass: "test123") and (user: "user2", pass: "test123") From here we hope it is self explanatory, just in case let's walk through it.
The bottom of the screen features 5 different color sticky note icons that when pressed will create a new note on the screen. The user must enter a title for the note and click the save icon for the note to be saved.  On the left side bar, the user can also click "add board" to create and switch to a new board.

## Technologies used
### Frontend
- React: To create an interactive UI
- Tailwind: For styling and ease of development
- snowpack: Build tool to create static pages from src
- postcss: Automate tailwind builds (creates the css file to use in production/development)
### Backend
- node: To create server
- express: To create server and for using middlewares, and ease of development for server
- passport (including passport-github2): To authenticate and register users and to implement OAuth for github, used custom middleware/strategy for local login
- express-session: To manage sessions for logged in users (users are still logged in after refreshing)
- mongoDB: To manage any app data (Users, notes)
- mongoose: To create schemas for Users and notes in MongoDB, and used to connect to MongoDB
- dotenv: To load .env variables

## Challenges
- We faced a lot of difficulty with setting up the initial project using React and Snowpack. We likely spent around 3 hours fixing all the configs and routes before we could even really start on the project. We ended up using create-snowpack-app which eased our troubles a little.
- We also experienced difficulty when implementing the Login page with cookies. We ended up redoing our server in order to help fix some of the issues we had routing and saving the cookies.
- The side bar was also surprisingly challenging. We initially used a react-burger-menu to have a slidng out sidebar but we ended up abandoning this because it was a css nightmare.
- Dynamically sizing the notes was also somewhat of a challenge. We ended up making the note a flexbox  and using a react TextareaAutosize component to help autosize the note when they got too long

## Responsibilities
 ### Reagan Brunelle
 - UI Design
 - Frontend React development: Sidebar and boards
 - Lots of frontend troublshooting
 - Certified CSS gurus
 ### Shane Stevens
 - UI Design and Mock ups
 - Frontend React development: Notes and Add notes
 - Lots of backend troubleshooting
 - Certified CSS gurus
 ### Siddhartha Pradhan
 - Implemented backend logic (setting up endpoints, mongoDB, mongoose etc). Completed setup that is required for OAuth.
 - Created Login and register page for frontend
 - Frontend React development: Home, App, and ProtectComponent (Component wrapper to ensure user is logged in)
 - Integrated the frontend with backend


## Video link
 - [LINK HERE](https://drive.google.com/file/d/1TQntNjzdRehwDDR57ibnhaV1K5ki0vjo/view?usp=sharing)

