Final Project Proposal: Raccoon-it 

Application Using Glitch: https://racoonit.glitch.me/
Youtube Video: https://youtu.be/aPL3spn2Ngg

Code on Glitch: https://glitch.com/edit/#!/racoonit?path=views%2Fmeme_maker.html%3A1%3A0
( I am sharing the code on glitch because we forgot to pull request our final project on the last day of the term. Since we are on break, I forgot my laptop at home when I went on vacation and I've been using a non-cs person's laptop (lol) that doesn't have vsc.. or git... and I'm having trouble pushing code bc of how git was downloaded... so the easiest way I thought to show our code was just manually copying and pasting it in the repo... sorry.... that this happened. 

## Description
For our project, we made a reddit inspired raccoon meme page that allows users to generate raccoon memers with edit, comment, and rate functionalities. Our app provides users with a fun and entertaining outlet to interact with popular raccoon memes found across the internet currently. Users are able to create their own raccoon meme by uploading an image and adding a caption. Users are able to change the font size, type and location. Users can also rate memes using an upvote or downvote rating system, and the cumulative rating for that meme will be shown. Instead of using MongoDB for the database, we created our own. When users login to the site, their previous rating will be shown on the corresponding memes.

The purpose of our web app is to rate and comment on raccoon memes created by users. Memes are an integral aspect of our global community, as it aids in the culture and communication exchange in our modern world. The point of the app is to bring a community of raccoon memes together. It is a safe space that engenders the creativity of its users. Memes bring together users of all genders, races and backgrounds, and unite us. Our website is an ethical platform that does not sell the souls of its users (cough cough, Facebook). Not only can our app be used by anyone (any time, any place) but it also updates in real-time. You can also edit and delete your raccoon memes as you see fit or just keep creating more!

## Login 

Before using the application, users must already have an account made or make a new one. Once an account is made, users will not have to make a new account as their login information is stored in our database.

## Technologies Used

To create the application, we used 5 Express middleware packages: Body-Parser, Passport, Express-Session, Serve-favicon, and Timeout. Body-Parser was used to read JSON objects. Passport was used as an authentication tool to facilitate the login process and find the login info for users that already have accounts. Express-session was used to allow the server to keep track of the user’s state. Serve=favicon was used to give our site an icon when the user has the tab open, so they know which tab is our application. Timeout ensures that a response is sent to the client on a timeout event. 

## Challenges

We faced challenges with storing the voting values even after the site had been refreshed, as well as marking the voting change for each image. We also struggled with changing small aspects of the UI design, such as centering text in a button. The raccoon memes also slowed our ability to focus and debug as we were too busy laughing at them. 

## Responsibilities

Jackie and Ananya worked on implementing the downvote/upvote feature of the application. Jack implement the meme generator ability, and Neha did the UI for the site. Tia worked on whatever was needed and also wrote the ReadME.

## Project Video
(p.s. check out the assets sections for some fun raccoon memes made with our meme generator :)
