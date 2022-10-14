
# CS 4241 Final Project


## Links 
- LINK TO VIDEO: https://youtu.be/KZjsq5b9ePE
- LINK TO WEBSITE: https://cs4241-finalproject.glitch.me/

## Description 
Our application is a scheduling tool which allows users to create tasks/events in both a list view and calendar view.
Each task users create will have several fields associated with it such as a title, description, start date and end date.  
Users will also be able to modify any of their preexisting tasks, as well as delete any tasks that they have already completed. 


Users can login into our app with their GitHub account via GitHub OAuth2 verification. 
After being verified, users will see all of the events associated with their account (events related to other users will not be provided). 


## Technologies used 

- Utilized **CSS** and **HTML** to create our calendar view, task view, and authentication page.
- Utilized **Node JS** to create our server and send data from the client to the MongoDB database.
- Utilized **Express** to manage our server and routes.
- Utilized **MongoDB** to store every user's task data. 
	- Data is separated using each user's username (GitHub username).
- Implemented **GitHub Oauth Authorization** to allow users to create and log into their account.
	- Utilized **Axios** client to make HTTP post requests to GitHub in order to receive the user's access token.
	- Utilized **OctoKit** library and **core.js** plugin to obtain the GitHub user's username after they have logged in ( using the user's unique access token).
- Utilized **uuid** package to create a random ID for each task.

- Utilized **dotenv** middleware library to load all your environment variables.
- Utilized **body-parser** middleware to process data sent in an HTTP request body.
- Utilized **Pico.css** middleware CSS Framework for styling our login pages.


## Challenges that we faced while doing the project
- Displaying events on the calendar and task views.
	- Solution: Get event information from the server and use dynamic html elements to display each event, along with edit and remove options
- Obtaining the GitHub username from GitHub Oauth Authorization
	- Solution: Using the Oauth access token we receive after our post request is fulfilled and the OctoKit and core.js to obtain the GitHub user's username
- Making sure that events are associated with the correct dates
	- Solution: Use JavaScript Date objects to store information about start and end dates (specifically store valueOf() the Date to allow it to work consistently) 
- Date and Time both had separate input fields in standard html forms
  - Solution: Combine the date and time into a JavaScript Date object using valueAsNumber field
- Database event array was populated with standard index values rather than tags
  - Solution: Add each event as a JavaScript object with built in tags
- Dynamically allocated html elements were not displaying the correct data
  - Solution: Reconfigure the way information was stored on the client in a more easily modifiable manner


## How we implemented what we have learned in CS4241
In this project, we put forth a lot of effort, and displayed many of the core concepts that were learned throughout the class.
For example, in addition to setting up a webserver using express, we also implemented GitHub authorization using Oauth, allowing users to login from a third party application.
We applied our knowledge of CSS frameworks and the 4 basic principles of design by implementing our chosen style, and modified the stylesheet to better format our calendar.
The amount of data that is stored, retrieved, modified and displayed is much more than was required in any previous project, and the formatting for said data was much more complex.
Additionally, we made use of different datatypes, such as dates and times that had not been explored in the class, taking the technical side of this project to the next level. 
We also optimized our application achieve at least 94% on the `Performance`, `Best Practices`, `Accessibility`, and `SEO` tests (screenshots of the Lighthouse reports for each page is in the "CS 4241 Final Project Images").

## What each group member was responsible for designing /developing.
### Everyone
- setting up CSS and HTML for calendar
- debugging the markup, client and server sides of the application
### Caleb Talley
- setting up GitHub Oauth authorization and receiving the GitHub name
- setting up CSS framework, custom CSS and HTML for login pages
- server logic for data
- assignment 3 code used as base for the Task client logic
  - add, delete buttons
- wrote ReadMe file
- optimized our application achieve at least 94% on the `Performance`, `Best Practices`, `Accessibility`, and `SEO` tests
### Noah Goodman
- setting up MongoDB database
- server logic for data
- client logic for events/tasks
- CSS for calendar and list
- retrofitting add and delete functions
### Ryan Darcey
- setting up CSS and HTML for Calendar
- client logic for events/tasks
  - adding / editing / removing events
- checked website validation
- optimized our application achieve at least 94% on the `Performance`, `Best Practices`, `Accessibility`, and `SEO` tests
### Jake Matthews
- server logic for events data
- getting GitHub username from 
- receiving the GitHub Name
- client logic for events/tasks
  - database formatting and interfacing
