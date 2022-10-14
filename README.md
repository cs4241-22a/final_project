# When3Meet
[https://when3meet.glitch.me](https://when3meet.glitch.me)

Our project is aimed at improving upon When2Meet's usability. 

With this site a user can create an account, add their availability, create private and public events, and join events. From their account page
users can set their availability, access events they own or have joined, and create new events. Users click and drag to change their availability.
From an event page, the user can view the combined availability of all users in the event, as well as join and leave events. If the user is the event organizer, they can schedule
an event from the event page and the event will automatically be removed from all the users participating in the event.

We aimed to fix some of the frustrations that we had with When2Meet. Our website allows for a cross site account so the user no longer has to input their
availability repeatedly on different when2meet forms. Additionally, when an event is scheduled, it is removed from the user's availability so that the availability changes in other events
that user is participating in across the site. We also wanted all the events that a user was participating in to be reachable from one place instead of having to go back
through emails or Slack messages to find their groups' availability.

Feel free to use Username: admin Password: admin to explore the site. Click the calendar on the account page to change the availability, checkout the events and owned events on the 
account and try to schedule a meeting.

We used an Express server, Node.js, and MongoDB on the back end to provide the API and persistent memory.
The front end uses React and Bootstrap to drive the user interface. 

Initially, we found it difficult to start because there were a lot of different components that interacted in multiple ways. 
We also found it difficult to serve the React pages. Initially we tried to use vite, but found it conflicted with Express.
We eventually moved to only using Express for simplicity. It was also difficult when we were all working on the website at the same time
since things would constantly be changing andc riat was hard to tell if you or someone else broke it5. What each group member was responsible for designing / developing.
  - Abby - leave event button, account page HTML, event data debugging, CSS formatting
  - Cole - page routing, event data debugging, create event form and privacy toggle, conditional page rendering 
  - Nick - Express backend, setting up backend API fulfillment, DB integration
  - Ted - Calendar implementation, user interaction, express request development, react development, styling 
  - Yasmine - login page implementation, logout event button, event data debugging, schedule event form

[https://youtu.be/N_Y6w3jQszU](https://youtu.be/N_Y6w3jQszU)