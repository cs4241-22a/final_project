# Final Project

*Jacob Chlebowski - jachlebowski@wpi.edu, Miles Gregg - mgregg@wpi.edu, Zaq Humphrey - zihumphrey@wpi.edu*


We will create a blog that will allow users to post various topics of their choosing and interact with other users. Users will be able to comment under posts that others have already uploaded to the webpage. This static web page will be easy to navigate and feature seamless transitions with various content that users post. Overall, this project is technically open to whoever wants to voice their opinions/statements to the world.

Javascript will be utilized for the connection of our database to our server. When users want to add data, the metadata will be inserted as a new document to mongodb. Javascript will dynamically gather the metadata from the database to post/remove any information based on the users preference. We will also utilize Node.js for the server-side programming as we’ve done in `Assignment 3`. In order for users to have their own posts, we will allow them to sign in with OAuthentication (github).

Node.js will be used to connect to the javascript requests, and will be implemented using express. The database that will be used in this project is Mongodb. Any new posts will be saved as a new record in Mongodb, and the comments will be saved under that record. In regards to authentication, we will use the github OAuth.