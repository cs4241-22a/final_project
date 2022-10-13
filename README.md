# Final Project
*Due October 13th (final day of the term)*

## Turning in Your Project
Submit a second PR on the final project repo to turn in your app and code. Again, only one pull request per team.

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service; it is critical that the application functions correctly wherever you post it.

The README for your second pull request doesn’t need to be a formal report, but it should contain:

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
2. Any additional instructions that might be needed to fully use your project (login information etc.)
3. An outline of the technologies you used and how you used them.
4. What challenges you faced in completing the project.
5. What each group member was responsible for designing / developing.
6. A link to your project video.



### The project of: 

## Andrei Ignatiev
alignatiev@wpi.edu
Glitch link:  https://glitch.com/~finalproject-alignatiev

I created a webpage similar to the one from A3. In fact, website navigation logic, a lot of the express framework, and CSS style sheets all carry over from that assignment. Thematically, this project acts as a portal for teachers working at a hypothetical high school. An educator with established credentials can log on to the site and use a dropdown menu to select the classes they wish to teach for the upcoming school year. Other functionalities include, the ability to alter core account data like the name and password, and viewing a color-coded mock schedule based on selected classes. To keep things simple, I have confined the user-base to teachers within the math department. It is also assumed that the teachers have had accounts created for them at an earlier date. Therefore, graders will need the account of a teacher to access the site:

email: crey@k12.ma.us (Mr. Colby King)
password: changeMe

email: jlentino@k12.ma.us
password: bcRox1

For the schedule, I drew inspiration from my high school's somewhat complex yet interesting class structure. At this high school, a student's, or in this case a teacher's, courseload consists of seven classes. Each class is assigned to a block (A through G). On any particular full day of school, students attend five of the seven classes in letter order, an example would be d-e-f-g-a. To construct the schedule for the following day, one needs to simply drop the final two blocks from the preceding day, shift the surviving blocks forward, and add the two blocks that were absent from the schedule into the front of the day, so b-c-d-e-f. A new 'day' is proclaimed until the rotation returns to the first five day ordering. Thus, there are seven unique 'days' of school, with Day 1 being the five-class order that begins with block A.  Finally, when constructing a schedule, please note that teachers are allowed to have two of the seven blocks off. These are referred to as 'prep blocks' by the webpage. 

In terms of my body of work on the assignment, most of my choices boil down to the fact that I am doing this project individualy. Although I tried to make my product as complex and unique as possible, constraints that naturally arise from not having partners forced me to simplify several aspects of my project.

Technoligies used: \
-MongoDB \
-Express\
-HTML/CSS/JS\
*svelte/react to sharpen UI elements would be something I would have looked into if I had an extra day or two*

One challenge involved handling the interplay between the dropdown menus and the server. Every time a user selects a new class, the server must fetch and/or alter the necessary fields inside of mongoDB. That, in tandem with conventional server-client interactions made for a lot of work. Another challenge was producing the visual representation of the schedule. The realization of the convuluted seven block, five class scheme added some algorithmic flair to my code that I'm fairly proud of. 


## FAQs

- **Can I use XYZ framework?** You can use any web-based frameworks or tools available, but for your server programming you need to use Node.js. Your client-side scripting language should be either JavaScript or TypeScript.
