# CS4241 Final Project - The Diary Group
Alex Zhu, Vanessa Wang, Enoch Zhao

Site Link: http://alexzyt.com

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
- Godaddy DNS Hosting

## Challenges Faced

- Figuring out how to get multiple clients connected to the same socket because we initially didn’t implement broadcast capability

## Group Members

Alex Zhu - Initialisation, configuration, and continual maintenance of Express, Node.js, E.js, MongoDB, DigitalOcean, and GoDaddy Domain

Vanessa Wang - Initialisation and continual maintenance to Node.js, E.js, and Front-End HTML/CSS Elements

Enoch Zhao - Maintenance and adjustments to Front-End HTML/CSS Elements, Project Report, and Project Video

## Footnote

Thank you for taking the time to check out our project. We hope you found using our site to be somewhat interesting. We designed this website with functionality in mind, but also while trying out best to inplement features and functions learned throughout Assignments 1 to 4. While assignments 1 and 2 were mostly locally functioning websites with little to no server functionality, assignments 3 and 4 helped us the most in realising a lot of our goals, as we gained a lot of the necessary experience needed to make a server-to-multiclient experience through our social scheduling website. We would additionally like to clarify that we did need to do a lot of self-learning, especially with Node.js and CSS formatting.

We believe our project deserves 100% not only because of the extensive amount of time we put in to accomplish our goals, but also because we were able to  successfully create a functioning schedule maker, in addition to the ability for other users to view those created schedules (provided they are friends with the schedule owner) and even chat about their schedules all through our website. This level of functionality was especially challenging to implement, especially from the back-end server perspective in terms of the information it relays to each user.

## Report Requirements (REMEMBER TO DELETE)

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
2. Any additional instructions that might be needed to fully use your project (login information etc.)
3. An outline of the technologies you used and how you used them.
4. What challenges you faced in completing the project.
5. What each group member was responsible for designing / developing.
6. A link to your project video.

Think of 1,3, and 4 in particular in a similar vein to the design / tech achievements for A1—A4… make a case for why what you did was challenging and why your implementation deserves a grade of 100%.
