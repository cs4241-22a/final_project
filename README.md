# CS4241 Final Project - The Diary Group
Yueting Zhu, Vanessa Wang, Enoch Zhao

Site Link: http://alexzyt.com
Video Link: https://youtu.be/yk4dQ-oF_Fg

## Project Description
Our group created a website called “The Diary Group” that lets prospective users log in with accounts created via our site, or through third party account authentication methods (GitHub,  Google etc).  The main purpose of the website is for users to create their day-to-day schedules via a timetable like design, while also allowing them to view schedules created by other users they have added as friends.

We also implemented a “chatting system” that ideally only allows logged in users to chat with each other inside of a chatroom. Users can exchange messages with each other that anyone with a logged in account on the website can see. Chat history at this moment remains persistent.


## Operating Notices (points to look out for)

- Message exchanges happen via an input form with a submit button, submitted messages then appear above the input form with the corresponding member of origin

## Technologies Used

- Express
- Node.js
- E.js
- OAuth Implementation
- MongoDB
- DigitalOcean Front-end Hosting
- Godaddy DNS

## Challenges Faced

- Structure of friend system: Handling friend requests and sending friend requests to users
- Real time chat: We learned and impletmented Websocket for building our real time chat page.
- Keep track of time: In javascript, there is a build in Date object, and we convert the time to ISO format (standard format) before we store them into the database by using a library called "moment". Our website also tracks the time and display it in realtime on almost every page.
- Data structure in MongoDB: we discussed and figured out a data structure that would be efficient to serve our webpage.

## Group Members

Yueting Zhu - Front-end JS, Back-end JS, configuration, and continual maintenance of MongoDB, DigitalOcean, and GoDaddy Domain

Vanessa Wang - Front-end JS, initialisation and continual maintenance to Node.js, E.js, and Front-End HTML/CSS Elements

Enoch Zhao - Page designs, maintenance and adjustments to Front-End HTML/CSS Elements, Project Report, and Project Video

## Footnote

Thank you for taking the time to check out our project. We hope you found using our site to be somewhat interesting. We designed this website with functionality in mind, but also while trying out best to inplement features and functions learned throughout Assignments 1 to 4. While assignments 1 and 2 were mostly locally functioning websites with little to no server functionality, assignments 3 and 4 helped us the most in realising a lot of our goals, as we gained a lot of the necessary experience needed to make a server-to-multiclient experience through our social scheduling website. We would additionally like to clarify that we did need to do a lot of self-learning, especially with Node.js and CSS formatting.

We believe our project deserves 100% not only because of the extensive amount of time we put in to accomplish our goals, but also because we were able to  successfully create a functioning schedule maker, in addition to the ability for other users to view those created schedules (provided they are friends with the schedule owner) and even chat about their schedules all through our website. This level of functionality was especially challenging to implement, especially from the back-end server perspective in terms of the information it relays to each user.
