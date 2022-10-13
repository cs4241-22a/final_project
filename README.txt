https://bondah-li-luu-cs4241.herokuapp.com/

1. Our Team created a dating/mingling app for GitHub users to meet people, socialize, find work partners and even potential life partners. When a user launches the website they will be greeted with a login page that features a GitHub Auth0 login to actually make sure only GitHub authorized users are accessing the website. After login, the User is transferred to the main page where they can create their profile. Some essential profile elements include name, profile picture, projects,age, age interest when it comes to getting matched with people. 
After a successful profile creation, a User can access the matching page from the menu, which displays profiles that match the age gap chosen by the User. After getting your matches you can click on their profile to learn more about them, and their projects.


2. The login page should be fairly straight forward. There is only one single button that allows you to log in with your github account. Any person with an existing Github account would be able to enter the website. After you have successfully authorized and logged in for the first time, you would be prompted to enter your information and profile. There are some key information on the page that would determine the user experience. The first is the status of your profile. If you select “mingle”, you would only be able to match with other users that also want to mingle, and the same goes for “date”. The second being the age preferences. You will only be matched with users whose age matches your preferences AND your age matches their preference. So if your matching page shows no users to match with, try increasing the age preferences and/or changing the status. We have included 20 fake users so at least one or two should show on your page.


3. The technologies that we used included
   1. Design: HTML,CSS, JavaScript, and BootStrap
      1. HTML, CSS, JavaScript and Bootstrap were used to design the different screens such as the profile creation, the profile view, the matching section and the actual login using the GitHub Authentication. With these major design elements and technologies, we were able to create a fluid website where it is pretty simple and does not take too much space on the screen in terms of text.
   2. Hosting Server: Heroku
      1. Heroku was used to host the server for external usage beyond running localhost.
   3. Backend : NodeJS, MongoDB
      1. NodeJS and MongoDB were used to store data that we had each user input when profile creation was successful. NodeJS allowed for us to run the server locally when needing to debug certain branches, whilst keeping our server smooth and clean/
   4. Authentication: GitHub 
4. The first challenge that we faced creating this application is determining the project idea. We ultimately decided to work on this idea after some discussion and elimination. The next challenge faced was figuring out the form of login and authentication for this project. We ended up only allowing users to log in with GitHub since this will only be for GitHub users and we will fetch some requests from their respective GitHub profiles. We also faced some challenges with styling of the pages and the aesthetics. We used Bootstrap as the framework.
5. Othniel Bondah - Used features of BootStrap and CSS to style and create layouts.
Nicholas Li - Designing and implementing the server, mongo database, and client side javascript.
Ryan Luu - Designing and implementing the client, used features of BootStrap, JavaScript, HTML, CSS and some backend with MongoDB.