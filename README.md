# GoataShop
Member: Eri Kim, Trang Pham, Arman Saduakas, Samara Holmes and Vishnu Priya Dendukuri

Link:https://goatashop.herokuapp.com/

Video Demo: https://youtu.be/-8LICM-Hiwo 
 
&emsp; We created GoataShop to be a WPI-accessible shopping web application that can be used as a marketplace to sell or buy products.
The user will be first welcomed with a login page. We are using Outlook Authentication so that it is exclusive to the WPI community so you need a WPI email to log in. Once logged in, you will be brought to our home page where you are welcomed with the cutest goat gif. From this page, you can navigate to “Shop”, ”My Listings” and “Contact Us”. 

&emsp; In our “Shop”, you can find all the products that everyone posted. Here you can see the name and the price of the product. Once you click on the specific item, you can see the description. There is also an “Email me if interested!” in the popup which would help you send a direct email to the person who listed the product you are interested in.  

&emsp; In “My listings”, you would find all the listings that you posted. You can add a product using the “Add Product” button. Once you click on a specific listing, you can edit or delete the listing. 

&emsp; In “Contact Us”, you would find our teammates and the link to our GitHub.
You can log out using the logout button on the top right corner of the app.

&emsp; There will also be a complete list of items being sold. After showing interest in items stored in your cart, you will be connected with the seller via email to settle a price and or meeting spot. Once the item has been sold, it will be removed from the complete database of items along with other people's databases.

We used the following technologies:
* Client-side programming using React
* Server-side programming using Node.js (Express)
* Bootstrap for CSS Framework
* MongoDB
  * A Products Table
  * A User table
* OAuth and passport.js for authentication (Outlook)
* Heroku for hosting

## Challenges
* Setting up React/snowpack
* Originally didn’t use snowpack so we had to go back and refactor the code to be compatible
* We are all new to React so this were definitely learning curve throughout this project especially at the beginning
* Use State
  * We learned and utilized state to save different states and objects in the app. It took a bit of learning in the beginning but it definitely helped a lot on the client side to determine objects and pop up windows.
* Passing data to Pop-up windows
  * This was more challenging than we expected due to our unfamiliarity with React. It took us quite a lot of time until we figured out the state in React to pass data to the pop-up window.
* Upload/Saving Image/Compression
  * The biggest challenge we had with images was saving them. After many trial and errors, we compressed the image and saved its URL in MongoDb for the next fetch.
* Passport-outlook setup

## Designing / Developing 
* Eri Kim 
  * Outlook authentication using passport-outlook
  * React/node.js (server) setup
  * Implemented Client and Server for Shop Listing (get all products) and personal Listing 
  * Styling and UI for the app
  * Designed the Logo
  * Implemented Upload Image with compression and sending to MongoDB
  * Helped Arman implement effective popups
  * Helped Vishnu implement send email feature
  * Helped Trang implement add/delet product features
  * Redirect/navigate depending on user’s authentication state
  
* Trang Pham
  * Create Pop-ups in the listing for Add Product and Edit Product
  * Implement Client and server side for Add/Edit/Delete Product in listing
  * Help Eri to remember her contribution
  * Help initial styling with listings page and pop-up window.

* Arman Saduakas
  * Helped transferring to React and using Snowpack package control.
  * Set up the hosting on Heroku.
  * Helped implement logging-in with the Outlook feature.
  * Implemented effective popups on the website with Eri.
  * Helped with the server setup.
  * Researched creating a live chat.

* Samara Holmes
  * Created initial skeleton website including navbar, footer, pages, etc.
  * Worked on some UI tasks
    * Hiding navbar for login page
    * App styling

* Vishnu Priya Dendukuri
  * Contact emails 
  * Helped implement logging in with the Outlook feature
  * README
 

