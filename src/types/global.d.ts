declare enum ClientActions {
  CreateGame = 'CreateGame',
  JoinGame = 'JoinGame',
}

declare namespace ClientMessage {
  interface Message {
    name: string;
    gameId: string;
  }

  /**
   * Represents the request to start a game with the given id.
   */
  interface CreateGame extends Message {
    name: 'CreateGame';
  }

  /**
   * Represents the request to join a game with the given id.
   */
  interface JoinGame extends Message {
    name: 'JoinGame';
  }
}
