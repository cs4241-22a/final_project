## React Recipebook
https://recipe-page-final-project.glitch.me/

https://youtu.be/UTyCIOlQeNs

The goal of this application is to allow users to view recipes posted by other users, as well as publish their own recipes. All recipes are viewable in the feed/homepage, and you can search for keywords in the title as well as filter by author, key words in the description or ingredient list, prep time, and servings. In order to edit or add new recipes, you must register or login--once logged in, you will be able to edit and delete your own recipes but not the recipes of others'.

The first four recipes are under `username: patrick` and `password: 123`.

This application is built using the MERN stack -- MongoDB, Express, React, and Node.js. The frontend is designed using React class components and styled using React Bootstrap. The backend is an Express web server and a MongoDB database (which consists of two collections, one for Users and one for Recipes). In addition, the Express server uses Mongoose schemas to interact with the MongoDB database. Finally, the entire project runs in a Node.js development environment.

Technical challenges encountered during the project include:

- using Mongoose with MongoDB, which posed challenges with the schema design and modified queries
- several group members had never used React before, making this a new development experience
- we used React class components, where the group's only prior experience with React was with hooks/functional components
- along with the React class components, we also made use of lifecycle methods, including componentDidMount, instead of just trying to fetch data in the last line of the constructor. This is a better, more React-y way of doing things, but it did require us to read through the docs and fully understand the component lifecycle.

Group member responsibilities:
- Patrick: created add recipe, view recipe, and delete recipe pages. Created clientside routes for adding, modifying, and deleting  recipes and modified those routes on the server side. Set up MongoDB authentication and environment variables.
- May: created majority of header (including which buttons to render if a user is logged in or not), login and registration page + backend
