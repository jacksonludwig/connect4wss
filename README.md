## Connection flow

1. Player one connects to socket
2. Player one sends game id message
3. Server saves game id
4. Player two connects to socket
5. Player two sends game id message
6. Player one sends message with turn
7. Server updates corresponding game state
8. Player two sends message
9. Server updates corresponding game state

Every time the server updates the game state, it will broadcast the new game state to each client.
The client should constantly render the new board state at all times.
