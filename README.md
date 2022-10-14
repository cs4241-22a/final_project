<<<<<<< HEAD
# Final Project
*Due October 13th (final day of the term)*
=======
Final Project - Race Timer
===
>>>>>>> cabda61 (Initial commit.)

timer.axpdsp.org

# Background

I have created a timer that stores the best times of each user, and displays a
leaderboard of the best times among all users. To ease the use of the timer, on
a phone which has support for accelerometers (and a compatible web browser), the
timer can be activated by detecting a tap on or near the phone using the
accelerometer. This increases the accuracy of timing in tasks that are completed
quickly and require both hands. In addition to showing the best times of users on the website 

# Login

<<<<<<< HEAD
### Deliverables

#### Form Team (due 9/25)
Students are will work in teams of 3-5 students for the project; teams of two can be approved with the permission of the instructor. Working in teams should help enable you to build a good project in a limited amount of time.  Use the `#project-logistics` channel in Discord to pitch ideas for final projects and/or find fellow team members as needed.

Teams must be in place by end of day on Sunday, September 25th. If you have not identified a team at this point, you will be assigned a team. You will be given some class time on Monday to work on your proposal, but please plan on reserving additional time outside of class as needed.

#### Proposal (due 9/27) 
Provide an outline of your project direction and the names of associated team members. 
The outline should have enough detail so that staff can determine if it meets the minimum expectations, or if it goes too far to be reasonable by the deadline. Please include a general description of a project, and list of key technologies/libraries you plan on using (e.g. React, Three.js, Svelte, TypeScript etc.). Two to four paragraps should provide enough level of detail. Name the file proposal.md and submit a pull request by Tuesday, September 27th at 11:59 PM (end of day). Only one pull request is required per team.
=======
The app will register a new user for any username it has not seen before upon
first login, so you should be able to log in with any username. If there are any
issues with the login system, there is an additional user specifically for
testing with the username "username" and the password "password".

# Demo

The app is fairly simple to use on desktop systems, so no demo of desktop usage
is given. A demo video of the accelerometer functionality is included in the git
repository.

# Technologies Used
>>>>>>> cabda61 (Initial commit.)

The application uses React for client-side rendering,
MongoDB for data persistence, Express.js for the server API, and Grommet.io as a
pre-built React component library. Furthermore, the application is deployed using Docker to a Docker Swarm environment, which functions similarly to Kubernetes. The application also makes use of newer Web Sensor APIs to access accelerometer data.

<<<<<<< HEAD
#### Turning in Your Project
Submit a second PR on the final project repo to turn in your app and code. Again, only one pull request per team.
=======
# Challenges
>>>>>>> cabda61 (Initial commit.)

Given that I have a reasonable amount of experience in web development using
ClojureScript and Fulcro, I focused less on producing the most intricate
website, and more on exposing myself to as many new technologies as possible. I
had no significant prior experience with any of the technologies in the stack
used to create this application before taking this class. I expecially enjoyed
working with the React Hooks API, as someone used to functional interfaces from
ClojureScript.

Furthermore, the usage of the accelerometer to precisely measure time presented
a number of challenges. The app was calibrated to respond to the correct amount
of force on a variety of surfaces mostly by trial and error. This calibration is
important, as if I had tested the application exclusively on a firm surface,
such as a concrete floor, the app would not respond correctly when used on a
less firm surface, such as a small wooden table.

Finally, ensuring that the app was responsive enough to process many
accelerometer event updates per second presented a number of engineering
challenges. If too few updates are processed due to blockage of the main thread,
the application could fail to register a sharp tap, resulting in measurement
inaccuracy.
