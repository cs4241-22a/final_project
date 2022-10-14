## React Recipebook
Group members: Gabriel Buonomano, May Dong, Patrick Salisbury, and Grace Yue.

https://recipe-page-final-project.glitch.me/

https://youtu.be/UTyCIOlQeNs

The goal of this application is to allow users to view recipes posted by other users, as well as publish their own recipes. All recipes are viewable in the feed/homepage, where they can be sorted by recency, prep time, servings, and alphabet order. You can search for keywords in the title as well as filter by author, key words in the description or ingredient list, prep time, and servings (for example: `eggs ingredient:milk servings:3`); quotes allow search terms with spaces, and any number of terms can be used at once. Recipes can be viewed by any user, but in order to edit existing recipes or add new ones, you must register or login. Once logged in, you will be able to edit and delete your own recipes, but not the recipes of others. Recipe search and viewing URLs update to represent the page's state and can be shared with others.

The first four recipes are under `username: patrick` and `password: 123`.

This application is built using the MERN stack -- MongoDB, Express, React, and Node.js. The frontend is designed using React class components and styled using React Bootstrap. The backend is an Express web server and a MongoDB database (which consists of two collections, one for Users and one for Recipes). In addition, the Express server uses Mongoose schemas to interact with the MongoDB database. Finally, the entire project runs in a Node.js development environment.

Technical challenges encountered during the project include:

- using Mongoose with MongoDB, which posed challenges with the schema design and modified queries
- several group members had never used React before, making this a new development experience
- we used React class components, where the group's only prior experience with React was with hooks/functional components
- along with the React class components, we also made use of lifecycle methods, including componentDidMount, instead of just trying to fetch data in the last line of the constructor. This is a better, more React-y way of doing things, but it did require us to read through the docs and fully understand the component lifecycle.
- ensuring that recipes could always be edited by their owner, but never edited by anyone else. This involved comparing usernames and checking for login at several points during requests.
- using search queries in the URL for viewing/editing recipes. This proved to be an effective way to communicate which recipe the view/edit pages needed to display, but added complexity to ensure that a user could not use this to force edit recipes that were not their own
- parsing search tokens was a long and multi-step process, especially dealing with quotes, special filters, and differing behavior for different filters (partial substring matching for most fields, exact matching for the username, and treating the prep time and servings as a maximum and a minimum respectively)
 
Group member responsibilities:
- May: Majority of header (including which buttons to render if a user is logged in or not), login and registration page+backend
- Gabriel: Searching and sorting, bugtesting and bugfixing across the whole application, visual planning for the different pages, error handling and recovery
- Patrick: Created add recipe, view recipe, and edit recipe pages. Created clientside routes for adding, modifying, deleting, and viewing recipes and modified those routes on the server side. Set up MongoDB authentication and environment variables.
- Grace: TODO
