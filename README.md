# Final Project

*Jacob Chlebowski - jachlebowski@wpi.edu, Miles Gregg - mgregg@wpi.edu, Zaq Humphrey - zihumphrey@wpi.edu*

Heroku -->


![**Login Page**](https://github.com/MilesGregg/final_project/blob/main/login.png?raw=true)

We created a blog that will allow users to post various topics of their choosing and interact with other users. This static web page will be easy to navigate and feature seamless transitions with various content that users post. Overall, this project is technically open to whoever wants to voice their opinions/statements to the world.

Javascript will be utilized for the connection of our database to our server. When users want to add data, the metadata will be inserted as a new document to mongodb. Javascript will dynamically gather the metadata from the database to post/remove any information based on the users preference. We will also utilize Node.js for the server-side programming as we’ve done in `Assignment 3`. In order for users to have their own posts, we will allow them to sign in with Two Factor Authentication.

Node.js will be used to connect to the javascript requests, and will be implemented using express. The database that will be used in this project is Mongodb. Any new posts will be saved as a new record in Mongodb, and the comments will be saved under that record. In regards to authentication, we will use the Two Factor Authentication.


## Technical Achievements
- **Two Factor Authentication**: This allows for users to have a secure login when signing into the Blogger page. A code is sent to the user's respective email upon attempting to sign in.

![**Verification Page**](https://github.com/MilesGregg/final_project/blob/main/verification.png?raw=true)


- **Heroku Implementation**: Website is successfully upload to [Heroku](https://www.heroku.com/) and can be accessed via the link above.
