# Final Project

*Jacob Chlebowski - jachlebowski@wpi.edu, Miles Gregg - mgregg@wpi.edu, Zaq Humphrey - zihumphrey@wpi.edu*

Heroku --> link
YouTube--> link


<img src="https://github.com/MilesGregg/final_project/blob/main/login.png?raw=true" data-canonical-src="(https://github.com/MilesGregg/final_project/blob/main/login.png?raw=true" height="400" width="600"/>

We created a blog that will allow users to post various topics of their choosing and interact with other users. This static web page will be easy to navigate and feature seamless transitions with various content that users post. Overall, this project is technically open to whoever wants to voice their opinions/statements to the world.

Javascript will be utilized for the connection of our database to our server. When users want to add data, the metadata will be inserted as a new document to mongodb. Javascript will dynamically gather the metadata from the database to post/remove any information based on the users preference. We will also utilize Node.js for the server-side programming as we’ve done in `Assignment 3`. In order for users to have their own posts, we will allow them to sign in with Two Factor Authentication.

Node.js will be used to connect to the javascript requests, and will be implemented using express. The database that will be used in this project is Mongodb. Any new posts will be saved as a new record in Mongodb, and the comments will be saved under that record. In regards to authentication, we will use the Two Factor Authentication.

Some of the technologies we took advantage of included MongoDB and Cloudinary. MongoDB was helpful for our posts for users while the Cloudinary was necessary for posting images/photos to our blogger. Cloudinary was the most challenging part of the project since we have to understand how to make use of the key and ID (many tutorials were outdated). In the end, we were successful with the implementation

## Group members and tasks:<br>
Miles- Server implementation and two factor authentication<br>
Zaq-   Back end and front end development<br>
Jacob- Cloudinary Cloud Storage, MongoDB database, and README<br>


## Technical Achievements
- **Two Factor Authentication**: This allows for users to have a secure login when signing into the Blogger page. A code is sent to the user's respective email upon attempting to sign in.


<img src="https://github.com/MilesGregg/final_project/blob/main/verification.png" data-canonical-src="(https://github.com/MilesGregg/final_project/blob/main/verification.png" width="500" height="300" />


- **Heroku Implementation**: Website is successfully upload to [Heroku](https://www.heroku.com/) and can be accessed via the link above.
