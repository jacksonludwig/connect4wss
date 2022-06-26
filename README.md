## Connection flow

1. Player one connects to socket
2. Player one sends CreateGame message
3. Server creates game and responds with id of game and player 1 (player 1 must use these)
4. Player two connects to socket
5. Player two sends game id message
6. Server adds player to game and responds with player 2 id (player 2 must use this)
7. Player one sends message with turn
8. Server updates corresponding game state
9. Player two sends message
10. Server updates corresponding game state

Every time the server updates the game state, it will broadcast the new game state to each client.
The client should constantly render the new board state at all times.
