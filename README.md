# youFree?

Frank McShan, Serena Mower, Kaelin Panneton, Molly Sunray, and Cindy Trac

## 1. Description
Our initial goal was to make an improved when2meet, a popular tool used at WPI for scheduling meetings and other activities. The user starts out on a login page in which they can input a username and password. They are then taken to a home page that lists any events they have created and any events they have been invited to. The user can view any of their events to edit their availability. The user can also create new events for a generic week with just the names of days or a custom week with specific dates. They can also decide the number of days they want to display on the calendar, such as 7 for a full week or 5 for a work week.

The user who creates an event will have access to inviting other users to provide their availability. This event creator also has access to the list of times when all invited users are available. In addition, users can delete events from the home page so that irrelevant and past events can be removed from view.

Project Link: https://you-free.glitch.me/

## 2. Instructions
A user can create an account by simply inputting a username and password combination that has not been used before. If the user is a new user, they are informed that an account has been created for them. If the user already has an account and inputs the wrong password for their username, the login fails.

## 3. Technologies Used
The technologies we used in our project were: HTML, Bootstrap, JavaScript, React, Express, Node.js, and MongoDB. We used HTML to structure parts of our application and Bootstrap to style our application. We used JavaScript to provide functionality for user interactions and React to structure the main parts of our application into reusable components. We used Express and Node.js to implement the server. MongoDB was used to store data about users and events. Lastly, we used the react-scheduler-selector package for the calendar display that is shown when creating and editing a youFree event.

## 4. Project Challenges
We faced a lot of challenges when creating our project, especially with implementing the main functionality of the calendar and being able to create an event. Our initial plan was to use interface.js to be able to select various times in the calendar array, but we ultimately decided to use react-scheduler-selector to be able to make it more interactive and improve the design. Additionally, figuring out the best way to store our data in MongoDB was a challenge. We decided to use two different collections: one for users and one for youFree events. Users in the user collection hold objects that contain the event ID and their availability for those youFree events for both the events they created and the events they were invited to. The youFree collection contains the creator of the youFree along with the list of invited users. We also had to figure out the best way to handle user interaction for events based on whether a user was a creator or had been invited to the event. In addition, we originally planned to utilize Microsoft Authentication for users to be able to connect their Outlook calendar to upload into their event availability. This proved to be more difficult than we originally expected and we decided to scrap this in order to focus on completing the main functionality of our app. We also found our original plan to send email notifications to invite users to events and modify the display from react-scheduler-selector to handle multiple responses (yes, no, maybe) to be challenging and chose not to implement it.

## 5. Work Breakdown
Serena and Kaelin were responsible for the implementation of the calendar page, such as being able to adjust the different settings for the youFree, and the act of a user being able to create a youFree event. Additionally, Serena was responsible for the functionality of determining the available times for youFrees, along with assisting in other aspects of the project when help was needed. Frank was responsible for the design and overall layout of the login page and the home page that displays all of the events for a user. Aside from contributing to the design of the other pages, Frank implemented the login functionality and the associated UI alerts shown to users. Molly was responsible for creating the home page, implementing the ability to delete events, implementing the ability to invite users, helping with the login page, and contributing to the overall design and layout of different pages. Cindy was in charge of the act of creating a user that is able to access various events and the permissions of owners vs. users.

## 6. Project Video
[youFree? Video Link](https://youtu.be/I25TkdYtDjw)
