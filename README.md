# Final Project: WEBWORM: A web safety teaching tool!

Owen Pfannenstiehl Natalie McClain, Charlie Snow, Sophia Strano

## Webworm Teaches You Web Safety!

https://webworm.glitch.me/

https://youtu.be/jViNrUPsGEo

Webworm is an important tool to help people understand how to be safe on the internet. This website walks you through informative graphics, texts, and a brief quiz
to help ensure that people do not fall for scams or get viruses.
We hope to attract users hoping to learn more about web safety to help reduce our overall vulnerability to cyber attacks and increase our technical literacy.

Users are encouraged to navigate through our static informative content on the resources tab of the webworm site before proceeding to their quiz on web safety.
The user can log in and store view their scores on the quiz so far. They can choose to utilize their skills in the user-safe "bad website" section.

## Navigating our application

Please create a new account for webworm by visiting this link: https://webworm.glitch.me/create-user before logging in.

You should be redirected to this page if you are not logged in.
If you are unable to proceed after creating an account it likely means your username and password are already taken,
and that you will need to select a different username and password. Kindly navigate between our introduction, resource,
and quiz tabs to explore all features of our application. After taking the quiz, you can visit the large link on the bottom of the page to examine your previous quiz results.

## Technologies and Design

Our website displays dynamic behavior by:

Using the server, after logging in, users can view their old quiz results.

Server-side programming using Node.js. Typically this will take the form of some sort of persistent data
(database), authentication, and possibly server-side computation.

Technologies we used include Node.js, mongoDB, cookies-session, express middleware (including handlebars and session), and bootstrap.

## Challenges and Achievements

One challenge we faced while completing our application was ensuring accessibility through our color scheme, as some adjustments to the level of contrast had to be made for this to reflect in our lighthouse scores.
Another challenge we faced was incosistencies with Glitch and other services on multiple machines.

We achieved lighthouse scores of 100 for all tests on desktop and above 90 on mobile.

We also featured music on our website, and used sound effects to enhance the quiz taking experience.

We utilized the CRAP principles by:

Contrast - for color scheme to be readable, as well as the selected tab being a contrasting color to the unselected tabs.

Repetition - same format for each question of quiz and format of tabs

Alignment - In the resources tab, we have two columns, one of links to other resources and one with an example on the page.

Proximity - tabs have the same level of information and are all next to each other to indicate that.

## Contributions and Final Comments

Sophie focused on the persistent data aspects of our application, mainly the create-user, login, and score display functionality, as well as the routing and login enforcement. 
Natalie focused on the examples on the resources page, some of the quiz questions, and details of the design (including the favicon).
Charlie focused on the format of the website with bootstrap. He added the tab strip, columns, and footer, and the backend of the quiz. He also wrote some of the email spiel on the resources page.
Owen focused on making the website engaging, both visually and in terms of the content of the resources and quiz. Owen also added in all of the audio elements.

