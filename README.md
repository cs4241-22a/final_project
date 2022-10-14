#WebChess: https://webware.craftsteamg.com/

WebChess was created by Cooper Dean, Harrison Rubin, Zachary Sarrett and Henry Yoder.

1. WebChess is a chess website where a user can play chess against both StockFish and Komodo, two chess engines. Webchess allows the user to decide which bot they want to play against, what difficulty level they want the computer to be, and which color they want to play as. The user can look at the stats page to see their stats, including total games played, which engine they have played against most, their wins, draws and losses against each engine, and the average difficulty of each bot they play against.
In the game history tab, the user can see every game they have previously played, and look through them move by move.
2. In order to login, you must login through Github.
3. We used React, React-Bootstrap, Express, Node, MongoDB, PGN parsers, and chess engines. We used React-Bootstrap for designing the interface and the website in general. We used PGN (Portable Game Notation) Parsers to parse through the chess moves. The chess engines we implemented were StockFish and Komodo.
4. 
We had trouble getting the stats page to sync up with the user's games.
The game history was difficult to implement with the way we wrote the board.

5. 
- Cooper: Cooper connected the endpoints to the server and client side, and did helped get the stats page synced and the game history page working.
- Harry: Harry did the majority of the backend work, as well as a good chunk of the front end.
- Zach: Zach worked on some of the client side logic, including the logic for getting a result/finishing a game (win, draw, loss), as well as writing the about page, and helping Cooper with the endpoints.
- Henry: Henry did a lot of interface work on the front end, making the website look good.

6. Link to the video: https://www.youtube.com/watch?v=BY2wCf78UjA&ab_channel=henryyoder
